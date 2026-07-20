```markdown
## High-Level Architecture Diagram
```mermaid
flowchart LR
    subgraph dmz ["DMZ"]
        partner["Partner System(s)"]
        apiGw["API Gateway"]
    end

    subgraph trustedZone ["Trusted Zone"]
        integrationLayer["Integration Layer"]
        enrollmentSvc["EnrollmentService"]
        authSvc["AuthService"]
    end

    subgraph restrictedZone ["Restricted / PCI Zone"]
        db[(PostgreSQL)]
        vault[("Vault<br/>AES-256 at rest")]
        logs[("Audit Logs<br/>Masked")]
    end

    partner -- "HTTPS (mTLS)" --> apiGw
    apiGw -- "HTTPS (mTLS)" --> integrationLayer
    integrationLayer -- "HTTPS (mTLS)" --> enrollmentSvc
    integrationLayer -- "HTTPS (mTLS)" --> authSvc
    enrollmentSvc -- "SQL" --> db
    enrollmentSvc -- "Field-level enc" --> vault
    enrollmentSvc -- "[Audit-Event]" --> logs
```

## Sequence Diagrams
### Enrollment / Onboarding
```mermaid
sequenceDiagram
    participant partner as Partner System
    participant apiGw as API Gateway
    participant integrationLayer as Integration Layer
    participant enrollmentSvc as EnrollmentService
    participant db as PostgreSQL
    participant vault as Vault

    partner ->> apiGw: POST /card/enroll
    apiGw ->> integrationLayer: POST /card/enroll
    integrationLayer ->> enrollmentSvc: enrollCard(payload)
    enrollmentSvc ->> db: SELECT customerId
    alt Customer exists
        enrollmentSvc ->> db: INSERT cardDetails
    else Customer does not exist
        enrollmentSvc ->> db: INSERT customer + cardDetails
    end
    enrollmentSvc ->> vault: Store sensitive card data
    enrollmentSvc -->> integrationLayer: Response (traceId, status)
    integrationLayer -->> apiGw: Response (traceId, status)
    apiGw -->> partner: Response (traceId, status)
    Note over enrollmentSvc,db: Data consistency ensured
```

## Data Flow Diagram (DFD)
```mermaid
flowchart TD
    subgraph untrustedZone ["Untrusted Zone"]
        partner["Partner System(s)"]
    end

    subgraph dmz ["DMZ"]
        apiGw["API Gateway"]
    end

    subgraph trustedZone ["Trusted Zone"]
        integrationLayer["Integration Layer"]
        enrollmentSvc["EnrollmentService"]
        authSvc["AuthService"]
    end

    subgraph restrictedZone ["Restricted / PCI Zone"]
        db[(PostgreSQL)]
        vault[("Vault<br/>AES-256 at rest")]
        logs[("Audit Logs<br/>Masked")]
    end

    partner -- "[PII, AuthN-Token; TLS1.3]" --> apiGw
    apiGw -- "[PII, AuthN-Token; mTLS]" --> integrationLayer
    integrationLayer -- "[PII; mTLS]" --> enrollmentSvc
    enrollmentSvc -- "[PII; SQL]" --> db
    enrollmentSvc -- "[PAN; Field-level enc]" --> vault
    enrollmentSvc -- "[Audit-Event]" --> logs
```