# Coding Standards

## General

- optimize for clarity over novelty
- keep subsystem boundaries explicit
- write as if the code will be audited

## TypeScript

- strict mode only
- model domain concepts explicitly
- avoid ambiguous helper names
- keep imports and workspace references stable

## Documentation

- prefer precise, calm language
- mark planned systems as planned
- document trust assumptions and failure modes when defining architecture

## Smart contracts and backend services

When those modules are implemented, contributors should follow these defaults:

- explicit authorization paths
- deterministic state transitions
- stable events and error codes
- minimal trusted surface area
