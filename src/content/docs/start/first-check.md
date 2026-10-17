---
title: "Your first check in 5 minutes"
description: "Send evidence to the hosted verifier and get a decision with a signed receipt."
---

You need a free API key ([get one](/start/get-key/)) and either `curl` or Python.

## 1. Send an artifact

An **artifact** is a claim plus its evidence. This one claims a *Verified Fact* backed by two signed records from two independent operators. It is a public test vector, so the signatures are real and the expected answer is known.

```bash
curl -s https://gravitverifier.space/api/v1/verify \
  -H "Authorization: Bearer $GRAVIT_KEY" -H "Content-Type: application/json" \
  -d @committed_two_strong.json
```

[Download committed_two_strong.json](/examples/committed_two_strong.json)

## 2. Read the decision

```json
{
  "result": {
    "decision": { "final_epistemic_state": "Verified Fact", "status": "SUCCESS", "...": "..." },
    "explanation": { "...": "..." },
    "graviteron": { "expected": 0.75, "uncertainty": 0.5, "...": "..." }
  },
  "receipt": { "format": "gravit-verifier-receipt-1", "seq": 1, "...": "..." },
  "signature": "...",
  "entry_hash": "..."
}
```

- **final_epistemic_state:** what the claim may be called: `Verified Fact`, `Probabilistic Assessment` or `Speculative Claim`.
- **status:** `SUCCESS` if the evidence justifies what was claimed, `DEGRADED` if it only supports something weaker, `REJECTED` if nothing is justified.
- **receipt** and **signature:** proof of this exact answer, chained to your earlier receipts. See [Receipts](/verifier/receipts/).

## 3. See a failure on purpose

In [result_false_contradicts.json](/examples/result_false_contradicts.json) one operator signed `"result": false`: its check failed. A signed "check failed" blocks a Verified Fact, so the answer is `Probabilistic Assessment` with status `DEGRADED`.

Editing any field of a signed record yourself, including `result`, breaks its signature, and the record is not counted at all.

## The same in Python

```bash
pip install gravit-verifier-client
```

```python
import json
from gravit_verifier_client import Client, verify_response

gv = Client("gv_...")
body = json.load(open("committed_two_strong.json"))
res = gv.verify(body["artifact"], use_test_registry=True)
print(res["result"]["decision"]["final_epistemic_state"])   # Verified Fact
print(verify_response(res, gv.service_key(), body["artifact"]))
```

:::note
The hosted service uses public **test keys** for its built-in registry. For real use, send your own registry of operators and their keys.
:::
