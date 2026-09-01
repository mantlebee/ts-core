import { TokenizerResult } from "./types";

/**
 * Splits text into {@link Token}s according to a set of {@link TokenizerRule}s.
 */
export interface ITokenizer {
  /**
   * Scans the text and collects the distinct tokens it contains.
   * @param text Text to tokenize.
   * @returns the tokenization result.
   */
  tokenize(text: string): TokenizerResult;
}
