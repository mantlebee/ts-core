import { List } from "@/common";

import { Token, TokenizerResult, TokenizerRule } from "./types";

export function tokenize(
  text: string,
  rules: List<TokenizerRule>
): TokenizerResult {
  const tokensMap: Record<string, Token> = {};
  const tokens: List<Token> = [];
  let currentIndex = 0;
  while (currentIndex < text.length) {
    let nextIndex = currentIndex + 1;
    for (const rule of rules) {
      const ruleMatch = rule.match(text, currentIndex);
      if (ruleMatch) {
        if (!tokensMap[ruleMatch.match]) {
          tokensMap[ruleMatch.match] = {
            occurrences: [],
            match: ruleMatch.match,
            value: ruleMatch.value,
          };
          tokens.push(tokensMap[ruleMatch.match]);
        }
        const token = tokensMap[ruleMatch.match];
        token.occurrences.push({
          endIndex: ruleMatch.endIndex,
          startIndex: currentIndex,
        });
        nextIndex = ruleMatch.endIndex + 1;
        break;
      }
    }
    currentIndex = nextIndex;
  }
  return { tokens };
}
