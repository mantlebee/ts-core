import { List } from "@/common";

import { IRule, IToken, ITokenizer } from "./interface";
import { Tokenized, TokenOccurrence } from "./types";
import { tokenize } from "./utils";

export class Token implements IToken {
  public readonly occurrences: List<TokenOccurrence> = [];
  public constructor(
    public readonly match: string,
    public readonly value: string
  ) {}
}

export class Tokenizer implements ITokenizer {
  public constructor(protected readonly rules: List<IRule>) {}

  public tokenize(text: string): Tokenized {
    return tokenize(text, this.rules);
  }
}
