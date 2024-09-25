import { TokenizerResult } from "./types";

export interface ITokenizer {
  tokenize(text: string): TokenizerResult;
}
