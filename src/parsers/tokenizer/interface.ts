import { List, Nullable } from "@/common";

import { RuleMatch, Tokenized, TokenOccurrence } from "./types";

export interface IRule {
  match(text: string, currentIndex: number): Nullable<RuleMatch>;
}

export interface IToken {
  readonly occurrences: List<TokenOccurrence>;
  readonly match: string;
  readonly value: string;
}

export interface ITokenizer {
  tokenize(text: string): Tokenized;
}
