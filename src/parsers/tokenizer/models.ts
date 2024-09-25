import { List } from "@/common";

import { ITokenizer } from "./interface";
import { TokenizerResult, TokenizerRule } from "./types";
import { tokenize } from "./utils";

export class Tokenizer implements ITokenizer {
  public constructor(protected readonly rules: List<TokenizerRule>) {}

  public tokenize(text: string): TokenizerResult {
    return tokenize(text, this.rules);
  }
}
