---
title: "Capability Gate for AI agents"
description: "Fail-closed permissions: allow, require proof, or block."
---

You list three kinds of capabilities. Anything not listed is **unknown and blocked**.

| List | Meaning |
|---|---|
| `allowed` | the agent may act |
| `frontier` | the agent may act on one exact action, only with a Verified Fact about it |
| `forbidden` | blocked; can be reopened to the frontier only by a quorum of distinct authorities |

```python
policy = {"revision": "r1", "allowed": ["read"], "frontier": ["pay"], "forbidden": ["wipe"]}
g = gv.gate("pay", policy, action={"to": "acct_42", "amount": 250})
h = g["result"]["gate"]["action_hash"]          # use as artifact_id when you verify the evidence
res = gv.verify({"artifact_id": h, "claimed_state": "Verified Fact", "evidence": [...]})
g = gv.gate("pay", policy, action={"to": "acct_42", "amount": 250},
            decision_id=res["receipt"]["decision_id"])
g["result"]["gate"]["permitted"]                # True only for a Verified Fact about this exact action
```

The same decision for another amount is not accepted: evidence is bound to the action hash. Every gate call gets a receipt in the same signed chain.

Specification and tests: [capability-gate](https://github.com/gravit-open-network-foundation/capability-gate).
