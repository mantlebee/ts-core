import { List } from "@/common";

import { ITokenizer } from "./interface";
import { TokenizerResult, TokenizerRule } from "./types";
import { tokenize } from "./utils";

/**
 * Default {@link ITokenizer} implementation. Applies its {@link TokenizerRule}s,
 * in order, at each position of the text.
 */
export class Tokenizer implements ITokenizer {
  /**
   * @param rules Rules applied, in order, at every position of the text.
   */
  public constructor(protected readonly rules: List<TokenizerRule>) {}

  /**
   * Scans the text and collects the distinct tokens it contains.
   * @param text Text to tokenize.
   * @returns the tokenization result.
   */
  public tokenize(text: string): TokenizerResult {
    return tokenize(text, this.rules);
  }
}
