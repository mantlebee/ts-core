import { List, Nullable } from "@/common";

export type Token = {
  occurrences: List<TokenOccurrence>;
  match: string;
  value: string;
};

export type TokenizerResult = {
  tokens: List<Token>;
};

export type TokenizerRule = {
  match(text: string, currentIndex: number): Nullable<TokenizerRuleMatch>;
};

export type TokenizerRuleMatch = {
  endIndex: number;
  match: string;
  value: string;
};

export type TokenOccurrence = {
  endIndex: number;
  startIndex: number;
};
