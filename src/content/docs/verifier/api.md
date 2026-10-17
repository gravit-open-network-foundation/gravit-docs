---
title: "API reference"
description: "Endpoints of the hosted Gravit Verifier."
---

Base URL: `https://gravitverifier.space/api`. Authenticate with `Authorization: Bearer gv_...`. The full description is machine-readable: [openapi.json](https://gravitverifier.space/api/v1/openapi.json).

| Endpoint | What it does | Key |
|---|---|---|
| `POST /v1/verify` | Decide an artifact; returns result, receipt, signature, entry_hash | yes |
| `POST /v1/gate` | [Capability Gate](/agents/capability-gate/) for one action | yes |
| `GET /v1/decisions` | Your history (`limit`, `before_seq`) | yes |
| `GET /v1/decisions/{decision_id}` | One decision with its receipt | yes |
| `GET /v1/export` | All your receipts, signed and chained, for your auditor | yes |
| `GET /v1/log/proof/{entry_hash}` | Proof that a receipt is in the public log | yes |
| `GET /v1/usage` | Plan and use this month | yes |
| `GET /v1/plans` | Plans and prices | no |
| `POST /v1/billing/checkout` | Create a Bitcoin invoice for a paid plan | yes |
| `GET /v1/service-key` | The service's Ed25519 public key | no |
| `GET /v1/status` | Health and component versions | no |

**Limits:** request body up to 1 MiB; monthly calls by plan (Free 1,000, Pro 100,000, Enterprise 10,000,000). Over the limit, the API answers `429`.

**Errors** come as `{"error": "..."}` with the HTTP status: `400` bad body, `401` key missing or invalid, `404` not found, `413` too large, `422` artifact or policy rejected, `429` limit reached.
