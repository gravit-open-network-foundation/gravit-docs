---
title: "History Keeper"
description: "The history of claims, append only, anchored in independently verified time."
---

A timestamp tells you that a document existed at a moment. **History Keeper keeps the history of a claim**: when it was verified and by whom, when it was contradicted or degraded, whether it held up when checked again, and which earlier entries were corrected. Nothing is erased. A correction is a new entry that names the one it corrects, and both stay readable.

## How it works

1. **Journal.** Every event is an entry in a journal. Entries are chained and form a Merkle tree hashed as in [RFC 9162](https://www.rfc-editor.org/rfc/rfc9162) (Certificate Transparency). For any entry you can get an inclusion proof.
2. **Signed tree head.** A signed tree head commits to the whole journal. Changing any past entry changes the root, so the change is detected.
3. **Independent time.** The tree head is time stamped by [RFC 3161](https://www.rfc-editor.org/rfc/rfc3161) authorities of different companies (DigiCert, Sectigo, GlobalSign). The time counts as a Verified Fact only if at least two independent authorities confirm it. The established time is the **second earliest**, so one authority that backdates cannot make the journal look older. Tokens are checked at their own time, so they stay checkable after certificates expire.
4. **Durability.** For each claim History Keeper counts checks passed and contradictions not later corrected, and how long the claim has stood. Evidence that is not renewed loses weight over time (half life).

## Where it is used

- The **public receipt log** of the hosted verifier: every receipt from the API goes into a daily journal whose root is stamped by three authorities. See [Receipts](/verifier/receipts/).
- The first public journal, **EURAU at par**: 70 entries over 30 days of real market data, venue by venue, anchored on 13 October 2026.

## Repository layout

[github.com/gravit-open-network-foundation/history-keeper](https://github.com/gravit-open-network-foundation/history-keeper)

| Path | What is there |
|---|---|
| `src/history_keeper/journal.py` | the append only journal and corrections |
| `src/history_keeper/merkle.py` | RFC 9162 Merkle tree, tree heads, inclusion proofs |
| `src/history_keeper/anchors.py` | RFC 3161 time stamps from several authorities, the "second earliest" rule |
| `src/history_keeper/durability.py` | durability of claims over time, half life |
| `journals/eurau-2026-10/` | the first real journal: entries, tree head, anchors, source data with checksums |
| `tools/verify.py` | checks a journal end to end |
| `docs/scitt.md` | how History Keeper maps onto IETF SCITT |
| `tests/` | the test suite run in CI |

## Check a journal yourself

```bash
git clone https://github.com/gravit-open-network-foundation/history-keeper
cd history-keeper && pip install -e .
python tools/verify.py journals/eurau-2026-10   # chain, tree head, time authorities, durability
```

## Honest status

- Version 0.1, JSON encoding. COSE encoding for SCITT is not done yet. OpenTimestamps (Bitcoin) is planned as a further independent anchor.
- The journal key was generated on the operator's machine and is not yet under the Foundation's root key ceremony.
- Entry times are claimed by the writer; anchors prove only that the journal existed no later than the anchored time.
