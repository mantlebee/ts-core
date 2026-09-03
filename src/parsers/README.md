# `parsers`

Turning **text into structured data**.

## What's in here

- **`tokenizer/`** — `ITokenizer` / `Tokenizer`: scans a string left-to-right and,
  at each position, applies an ordered list of `TokenizerRule`s until one
  matches. Repeated matches of the same substring are collapsed into a single
  `Token` that records every `TokenOccurrence`. A rule is anything with
  `match(text, index) => TokenizerRuleMatch | null`.
