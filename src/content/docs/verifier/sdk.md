---
title: "SDKs"
description: "Python and TypeScript clients, with offline checks."
---

## Python

```bash
pip install gravit-verifier-client
```

```python
from gravit_verifier_client import Client, verify_response, verify_export, verify_log_proof

gv = Client("gv_...")
res = gv.verify(artifact)                       # decide
key = gv.service_key()                          # pin this once and keep it
verify_response(res, key, artifact)             # signature, result hash, request hash
verify_export(gv.export(), key)                 # every receipt signed, chain unbroken
verify_log_proof(gv.log_proof(res["entry_hash"]), key)   # in the public log
gv.gate("pay", policy, action={...})            # Capability Gate
```

[PyPI](https://pypi.org/project/gravit-verifier-client/)

## TypeScript

```bash
npm install gravit-verifier-client
```

```ts
import { Client, verifyLogInclusion } from "gravit-verifier-client";
const gv = new Client("gv_...");
const res = await gv.verify(artifact);
const proof = await gv.logProof(res.entry_hash);
console.log(await verifyLogInclusion(proof));
```

[npm](https://www.npmjs.com/package/gravit-verifier-client) · source: [gravit-verifier-service/sdk](https://github.com/gravit-open-network-foundation/gravit-verifier-service/tree/main/sdk)
