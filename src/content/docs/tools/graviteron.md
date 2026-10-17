---
title: "Graviteron"
description: "How strongly the evidence supports a claim."
---

Next to each decision the API returns a **Graviteron**: `expected`, a number from 0 to 1 for how strongly the counted evidence supports the claim, and `uncertainty`, how much evidence stands behind it. It combines operators so that dependent sources do not count twice, and it can weigh each operator by its measured reliability.

The hosted service currently trusts every operator equally, so its calibration there is not established; the decision itself does not depend on it.

Method, benchmarks and real-data studies (euro stablecoin venues, Swiss franc stablecoin flows): [graviteron](https://github.com/gravit-open-network-foundation/graviteron).
