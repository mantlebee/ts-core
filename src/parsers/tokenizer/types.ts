import { List } from "@/common";

import { IToken } from "./interface";

export type RuleMatch = {
  readonly endIndex: number;
  readonly match: string;
  readonly value: string;
};

export type Tokenized = {
  readonly tokens: List<IToken>;
};

export type TokenOccurrence = {
  endIndex: number;
  startIndex: number;
};
