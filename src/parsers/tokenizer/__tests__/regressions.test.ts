import { TokenizerRule } from "../types";
import { tokenize } from "../utils";

const WordRule: TokenizerRule = {
  match: (text, currentIndex) => {
    const word = /^\w+/.exec(text.substring(currentIndex))?.[0];
    return word
      ? { endIndex: currentIndex + word.length - 1, match: word, value: word }
      : null;
  },
};

describe("parsers", () => {
  describe("tokenizer", () => {
    describe("regressions", () => {
      it("matches named like Object.prototype members are regular tokens", () => {
        const { tokens } = tokenize("constructor toString constructor", [
          WordRule,
        ]);
        expect(tokens.map((a) => a.match)).toEqual(["constructor", "toString"]);
        expect(tokens[0].occurrences).toHaveLength(2);
      });
      it("a rule reporting an end before the current position doesn't loop forever", () => {
        const BackwardsRule: TokenizerRule = {
          match: (text, currentIndex) => ({
            endIndex: currentIndex - 1,
            match: text[currentIndex],
            value: text[currentIndex],
          }),
        };
        const { tokens } = tokenize("abc", [BackwardsRule]);
        expect(tokens.map((a) => a.match)).toEqual(["a", "b", "c"]);
      });
    });
  });
});
