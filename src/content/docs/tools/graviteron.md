---
title: "Graviteron"
description: "How strongly the evidence supports a claim, and how much evidence stands behind it."
---

The verifier decides **what a claim may be called** (Verified Fact, Probabilistic Assessment, Speculative Claim). Graviteron adds **how strongly** the counted evidence supports the claim.

## What the API returns

Next to each decision the API returns a Graviteron:

| Field | Meaning |
|---|---|
| `expected` | a number from 0 to 1: how strongly the counted evidence supports the claim |
| `uncertainty` | how much evidence stands behind it: high when there are few independent verdicts |

```python
from graviteron.evidence import graviteron
g = graviteron([("operator-a", True), ("operator-b", True), ("operator-c", None)])
g.expected, g.u      # 0.75 on two independent verdicts, with uncertainty 0.5
```

## How it works

- It is computed from the **signed evidence records** of the verifier, with Subjective Logic (belief, disbelief, uncertainty).
- Operators are combined so that **dependent sources do not count twice**: all keys of one operator count as one.
- Each operator can be weighed by its **measured reliability**, learned from data (Dawid and Skene).
- It is checked for **calibration**: a score of 0.9 should be right about 90 % of the time.

In a reproducible benchmark with a Sybil operator using 1, 10 or 50 keys, counting keys accepts every false claim once the Sybil has 10 keys; Graviteron v0.2 accepts about 8 %, whatever the number of keys.

## Where to find it

[github.com/gravit-open-network-foundation/graviteron](https://github.com/gravit-open-network-foundation/graviteron)

| Path | What is there |
|---|---|
| `docs/evidence-measure.md` | the method, all benchmark results and limits |
| `benchmarks/evidence_benchmark.py` | the Sybil and calibration benchmark |
| `benchmarks/real_eurau/`, `benchmarks/real_chfau/` | studies on real stablecoin market data |
| `tests/` | unit and integration tests |

## Honest status

The hosted service currently trusts every operator equally, so calibration there is not yet established; the decision itself does not depend on the Graviteron. Older statements in the repository (the θ critical value 0.731, the Trust Tensor) are corrected at the top of its README and are not the basis of the current measure.
