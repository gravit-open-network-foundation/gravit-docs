---
title: "History Keeper"
description: "Journals sealed with independent time."
---

History Keeper records events in a journal that cannot be rewritten: an RFC 9162 Merkle tree with signed tree heads. A time counts as a Verified Fact only when at least two independent RFC 3161 authorities confirm it; the established time is the second earliest, so one authority that backdates cannot make the journal look older.

Corrections are added, never erased. The public receipt log of the verifier service uses the same code.

Source and tests: [history-keeper](https://github.com/gravit-open-network-foundation/history-keeper).
