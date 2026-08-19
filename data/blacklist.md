# Company Blacklist

Your own do-not-apply list (user layer, opt-in). The system never populates it for you, and no update ever touches it.

While this file exists:

- `scan.mjs` skips postings from listed companies (matched case- and punctuation-insensitively) and reports the count in the run summary — `--include-blacklisted` bypasses the filter for auditing.
- The `auto-pipeline`, `oferta`, and `apply` modes stop on a match, quote your recorded reason, and ask for an explicit override before proceeding. Your call always wins.
- A blacklist entry never changes any score anywhere — it is a gate, not a signal.

| Company | Since | Scope | Reason |
|---------|-------|-------|--------|
