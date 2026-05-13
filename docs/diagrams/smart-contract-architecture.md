# Smart Contract Architecture Diagram

```mermaid
flowchart LR
    Asset[Asset Engine]
    Compliance[Compliance Engine]
    Settlement[Settlement Engine]
    Shared[Shared Primitives]
    Events[Normalized Events]
    Stellar[Stellar Settlement Layer]

    Asset --> Compliance
    Asset --> Shared
    Compliance --> Shared
    Settlement --> Shared
    Compliance --> Settlement
    Settlement --> Stellar
    Asset --> Events
    Compliance --> Events
    Settlement --> Events
```
