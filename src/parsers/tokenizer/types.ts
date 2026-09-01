import { List, Nullable } from "@/common";

/**
 * A distinct piece of text recognized by a {@link TokenizerRule}, together with
 * every place it occurs in the parsed text.
 */
export type Token = {
  /** Every position in the text where this token was matched. */
  occurrences: List<TokenOccurrence>;
  /** The exact substring that was matched. */
  match: string;
  /** The value the rule assigned to the match. */
  value: string;
};

/**
 * Outcome of a {@link ITokenizer.tokenize} call.
 */
export type TokenizerResult = {
  /** The distinct tokens found, in first-seen order. */
  tokens: List<Token>;
};

/**
 * A single tokenization rule: given the text and a position, it decides whether
 * something matches there.
 */
export type TokenizerRule = {
  /**
   * Tries to match at the given position.
   * @param text Full text being tokenized.
   * @param currentIndex Position at which to attempt the match.
   * @returns the match, or `null` when the rule does not apply here.
   */
  match(text: string, currentIndex: number): Nullable<TokenizerRuleMatch>;
};

/**
 * What a {@link TokenizerRule} returns when it matches.
 */
export type TokenizerRuleMatch = {
  /** Index of the last matched character. */
  endIndex: number;
  /** The exact substring that was matched. */
  match: string;
  /** The value to associate with the match. */
  value: string;
};

/**
 * A single position in the parsed text where a {@link Token} occurs.
 */
export type TokenOccurrence = {
  /** Index of the last character of the occurrence. */
  endIndex: number;
  /** Index of the first character of the occurrence. */
  startIndex: number;
};
