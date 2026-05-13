import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const repoRoot = process.cwd();
const ignoredDirectories = new Set([
  '.git',
  '.next',
  '.turbo',
  'contracts/target',
  'node_modules',
]);

async function collectMarkdownFiles(directory, bucket = []) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.relative(repoRoot, absolutePath);

    if (entry.isDirectory()) {
      if (ignoredDirectories.has(relativePath) || ignoredDirectories.has(entry.name)) {
        continue;
      }

      await collectMarkdownFiles(absolutePath, bucket);
      continue;
    }

    if (entry.isFile() && path.extname(entry.name) === '.md') {
      bucket.push(absolutePath);
    }
  }

  return bucket;
}

function stripCodeBlocks(source) {
  return source.replace(/```[\s\S]*?```/g, '');
}

function normalizeTarget(target) {
  return target.trim().replace(/^<|>$/g, '');
}

function isExternalTarget(target) {
  return /^(https?:|mailto:|tel:)/.test(target);
}

async function pathExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function validateLink(sourceFile, rawTarget) {
  const target = normalizeTarget(rawTarget);

  if (!target || target.startsWith('#') || isExternalTarget(target)) {
    return null;
  }

  const [pathname] = target.split('#');

  if (!pathname) {
    return null;
  }

  const resolvedPath = path.resolve(path.dirname(sourceFile), pathname);

  if (await pathExists(resolvedPath)) {
    return null;
  }

  if (!path.extname(resolvedPath) && (await pathExists(`${resolvedPath}.md`))) {
    return null;
  }

  if (await pathExists(path.join(resolvedPath, 'README.md'))) {
    return null;
  }

  return {
    source: path.relative(repoRoot, sourceFile),
    target,
  };
}

async function main() {
  const markdownFiles = await collectMarkdownFiles(repoRoot);
  const brokenLinks = [];
  const markdownLinkPattern = /!?\[[^\]]*]\(([^)]+)\)/g;

  for (const file of markdownFiles) {
    const content = stripCodeBlocks(await readFile(file, 'utf8'));
    const matches = content.matchAll(markdownLinkPattern);

    for (const match of matches) {
      if (match[0].startsWith('!')) {
        continue;
      }

      const result = await validateLink(file, match[1]);

      if (result) {
        brokenLinks.push(result);
      }
    }
  }

  if (brokenLinks.length === 0) {
    console.log(`Verified markdown links across ${markdownFiles.length} files.`);
    return;
  }

  console.error('Broken markdown links detected:');

  for (const link of brokenLinks) {
    console.error(`- ${link.source} -> ${link.target}`);
  }

  process.exitCode = 1;
}

await main();
