# Security Policy

## Supported versions

Veritas Layer is in pre-release development. Support is currently provided for
the default branch only.

| Version            | Supported |
| ------------------ | --------- |
| `main`             | Yes       |
| release branches   | No        |
| historical commits | No        |

## Scope

This policy applies to security issues involving:

- future Soroban contracts under `contracts/`
- future backend services under `services/`
- authentication and authorization flows
- compliance validation logic
- settlement orchestration
- repository tooling that could impact production integrity

## Reporting a vulnerability

Please report vulnerabilities privately to `security@veritaslayer.xyz`.

Do not open public GitHub issues for suspected vulnerabilities.

If the security mailbox is unavailable, contact the maintainers privately
through GitHub and mark the report as security-sensitive.

Include, where possible:

- a description of the issue
- affected component or file paths
- reproduction steps or a proof of concept
- impact assessment
- any suggested mitigations

## Disclosure policy

Veritas Layer follows coordinated disclosure:

- reports are handled privately
- maintainers validate and triage before public discussion
- fixes should be prepared before broad publication of exploit details
- public write-ups should wait until the affected version is patched or the
  maintainers approve disclosure

## Response targets

| Stage            | Target timeline                |
| ---------------- | ------------------------------ |
| Acknowledgement  | Within 48 hours                |
| Initial triage   | Within 5 business days         |
| Status update    | Within 7 business days         |
| Remediation plan | As soon as scope is understood |

These timelines are targets, not guarantees, but maintainers should communicate
if a report requires additional investigation.

## Security principles

- Compliance enforcement must occur at the protocol level, not the frontend
  layer.
- Off-chain services are not trusted to override on-chain policy outcomes.
- Sensitive identity data must remain off-chain unless a documented exception
  exists.
- Authentication, authorization, and proof verification logic must fail closed.

## Safe harbor

If you act in good faith, avoid privacy violations and service disruption, and
do not exploit a vulnerability beyond what is reasonably necessary to document
it, Veritas Layer will treat your research as authorized.

## Out of scope

Unless a maintainer states otherwise, the following are generally out of scope:

- social engineering attacks against contributors
- denial-of-service reports without a concrete protocol or code weakness
- theoretical findings with no plausible exploitation path
- issues in third-party services not controlled by the project
