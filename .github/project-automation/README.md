# Project Automation Blueprint

This directory captures the GitHub-side operating model for Phase 4. The files here are intended to support manual setup in the GitHub UI, since the live board, labels, issues, and Discussions categories are not created from inside the repository.

## Board structure

Recommended columns:

- Backlog
- Planned
- In Progress
- Review
- Completed
- Blocked
- Security Review
- Research

Recommended milestone groupings:

- MVP Contracts
- zk Identity
- Dashboard
- SDK
- Infrastructure

## Automation rules

Configure the GitHub project board to:

- move issues to `In Progress` when linked PRs are opened
- move items to `Review` when PRs request review
- move items to `Completed` when PRs merge
- apply status labels when automation changes column state
- surface `blocked` items separately from normal backlog work

## Discussions categories

Create these categories in GitHub Discussions:

- Announcements
- Architecture
- Ideas
- Q&A
- Governance
- Security

## Supporting repository files

The repository-side inputs for this workflow already live in:

- `.github/labels.yml`
- `.github/ISSUE_TEMPLATE/`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/CODEOWNERS`
- `docs/contributors/curated-issues.md`
