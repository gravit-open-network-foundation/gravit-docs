---
title: "How the verifier decides"
description: "Rules, states and what makes a Verified Fact."
---

The verifier never trusts a single source. It decides what a claim **may be called**:

| State | Meaning |
|---|---|
| **Verified Fact** | at least two independent operators signed fresh, matching evidence |
| **Probabilistic Assessment** | evidence exists, but not enough for a fact |
| **Speculative Claim** | no sufficient evidence |

A claim is never promoted beyond its evidence. If it asks for more, the decision is `DEGRADED`, with the reason written down.

## The rules

Each rule is a published, versioned binding; every decision lists the rules it applied.

- **No aggregation laundering (CANON-NAL-001).** Many weak or dependent records never add up to a fact.
- **Independence (CANON-IND-004, SIG-011).** Records count only if signed by registered keys that have not been revoked. All keys of one operator count as one source.
- **Registry signed 3 of 5.** The registry of operators is accepted only if at least 3 of 5 root keys signed it.
- **Freshness (CANON-FRS-005).** Under a declared policy, stale, future or malformed timestamps demote the result.
- **The signed verdict counts (CANON-RES-012).** A record signed "check failed" blocks a Verified Fact; "no verdict" is not support.
- **Reproducible record.** The `decision_id` is a SHA3-256 hash of the canonical record: identical inputs give the identical decision, in Python and in Rust, on any machine.

## Run it yourself

```bash
pip install "git+https://github.com/gravit-open-network-foundation/verifier@v0.6.0"
```

Source, the 47 golden vectors and the Rust port: [github.com/gravit-open-network-foundation/verifier](https://github.com/gravit-open-network-foundation/verifier). You can also run it [in your browser](https://gravitverifier.space/sandbox/).
