import { List } from "@/common";

import { Token, TokenizerResult, TokenizerRule } from "./types";

/**
 * Walks the text left to right and, at each position, applies the rules in order
 * until one matches. Repeated matches of the same substring are collapsed into a
 * single {@link Token} with multiple occurrences.
 * @example
 * ```ts
 * const digits: TokenizerRule = {
 *   match: (text, i) =>
 *     /\d/.test(text[i])
 *       ? { endIndex: i, match: text[i], value: text[i] }
 *       : null,
 * };
 * tokenize("a1b1", [digits]);
 * // { tokens: [{ match: "1", value: "1", occurrences: [
 * //   { startIndex: 1, endIndex: 1 }, { startIndex: 3, endIndex: 3 },
 * // ] }] }
 * ```
 * @param text Text to tokenize.
 * @param rules Rules applied, in order, at every position of the text.
 * @returns the tokenization result.
 */
export function tokenize(
  text: string,
  rules: List<TokenizerRule>
): TokenizerResult {
  // A Map, not a plain object: matches such as "constructor" or "toString"
  // would otherwise hit the inherited members of Object.prototype.
  const tokensMap = new Map<string, Token>();
  const tokens: List<Token> = [];
  let currentIndex = 0;
  while (currentIndex < text.length) {
    let nextIndex = currentIndex + 1;
    for (const rule of rules) {
      const ruleMatch = rule.match(text, currentIndex);
      if (ruleMatch) {
        let token = tokensMap.get(ruleMatch.match);
        if (!token) {
          token = {
            occurrences: [],
            match: ruleMatch.match,
            value: ruleMatch.value,
          };
          tokensMap.set(ruleMatch.match, token);
          tokens.push(token);
        }
        token.occurrences.push({
          endIndex: ruleMatch.endIndex,
          startIndex: currentIndex,
        });
        // Always move forward, even if a rule reports an end before the
        // current position: otherwise the loop would never end.
        nextIndex = Math.max(ruleMatch.endIndex + 1, currentIndex + 1);
        break;
      }
    }
    currentIndex = nextIndex;
  }
  return { tokens };
}
