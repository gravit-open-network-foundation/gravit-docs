---
title: "Receipts and the public log"
description: "Check a decision offline and prove nothing was removed."
---

## Every answer has a receipt

The receipt names the decision, the hashes of your request and of the result, the time and the previous receipt of your account. It is signed with the service's Ed25519 key. Because each receipt includes the hash of the one before, deleting or changing any entry breaks the chain.

```python
from gravit_verifier_client import verify_response, verify_export
verify_response(res, key, artifact)     # this answer is authentic and unchanged
verify_export(gv.export(), key)         # the whole history is complete
```

## The public log

Every night the receipts of **all** customers are sealed together: an RFC 9162 Merkle tree over their hashes, signed by the service and timestamped by three independent authorities (DigiCert, Sectigo, GlobalSign). The time counts as a Verified Fact when at least two agree.

- Today's seal: [gravitverifier.space/log/latest.json](https://gravitverifier.space/log/latest.json)
- Proof for one receipt: `GET /v1/log/proof/{entry_hash}`, checked offline with `verify_log_proof` (Python) or `verifyLogInclusion` (TypeScript).

So we cannot quietly remove or change a receipt we issued: every later seal would show it.
