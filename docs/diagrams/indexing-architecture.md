# Indexing Architecture Diagram

```mermaid
flowchart LR
    Soroban[Soroban Events]
    Stellar[Stellar Events]
    Indexer[Indexer]
    Postgres[(PostgreSQL)]
    APIs[REST and GraphQL APIs]
    Analytics[Analytics and Dashboards]

    Soroban --> Indexer
    Stellar --> Indexer
    Indexer --> Postgres
    Postgres --> APIs
    Postgres --> Analytics
```
