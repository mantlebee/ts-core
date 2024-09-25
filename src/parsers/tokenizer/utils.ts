import { List } from "@/common";

import { IRule, IToken } from "./interface";
import { Token } from "./models";
import { Tokenized } from "./types";

export function tokenize(text: string, rules: List<IRule>): Tokenized {
  const tokensMap: Record<string, IToken> = {};
  const tokens: List<IToken> = [];
  let currentIndex = 0;
  while (currentIndex < text.length) {
    let nextIndex = currentIndex + 1;
    for (const rule of rules) {
      const ruleMatch = rule.match(text, currentIndex);
      if (ruleMatch) {
        if (!tokensMap[ruleMatch.match]) {
          tokensMap[ruleMatch.match] = new Token(
            ruleMatch.match,
            ruleMatch.value
          );
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
