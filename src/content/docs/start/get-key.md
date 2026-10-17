---
title: "Get a free API key"
description: "Enter your email, confirm it, and the key arrives by email."
---

1. Open [gravitverifier.space/#start](https://gravitverifier.space/#start) and enter your email.
2. Confirm your address with one click in the email we send.
3. Your key arrives right after, from `api@gravitverifier.space`. It starts with `gv_`.

The free plan has **1,000 checks per month**. Only a hash of the key is stored, so we cannot show it again; if you lose it, reply to the email and we issue a new one.

Already confirmed earlier but no key? Request it on the [API page](https://gravitverifier.space/docs/#key); it goes only to your confirmed inbox.

Check your plan and usage at any time:

```bash
curl -s https://gravitverifier.space/api/v1/usage -H "Authorization: Bearer $GRAVIT_KEY"
```
