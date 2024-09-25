import { getSpecialChars, List } from "@/common";

import { Token, TokenizerRule } from "../types";
import { tokenize } from "../utils";

const RepeatableCharacterRule: (char: string) => TokenizerRule = (char) => ({
  match: (text, currentIndex) => {
    if (text[currentIndex] === char) {
      if (/^.\{\d{1,}\}/.test(text.substring(currentIndex))) {
        const endIndex = text.indexOf("}", currentIndex);
        if (endIndex === -1)
          throw "RepeatableCharacterRule ERROR: closing repeat bracket not found!";
        const match = text.substring(currentIndex, endIndex + 1);
        const repeat = parseInt(match.substring(2, match.length));
        const value = Array.from({ length: repeat }, () => char).join("");
        return { endIndex, match, value };
      }
      return { endIndex: currentIndex, match: char, value: char };
    }
    return null;
  },
});

const BracketsRule: TokenizerRule = {
  match: (text, currentIndex) => {
    if (text[currentIndex] === "(") {
      const endIndex = text.indexOf(")", currentIndex);
      if (endIndex === -1)
        throw "BracketRule ERROR: closing bracket not found!";
      const match = text.substring(currentIndex, endIndex + 1);
      const value = text.substring(currentIndex + 1, endIndex);
      return { endIndex, match, value };
    }
    return null;
  },
};
const LowerCaseRule = RepeatableCharacterRule("a");
const NumberRule = RepeatableCharacterRule("0");
const SpecialCharRule: TokenizerRule = {
  match(text, currentIndex) {
    const specialChars = getSpecialChars();
    const char = text[currentIndex];
    if (specialChars.includes(char))
      return { endIndex: currentIndex, match: char, value: char };
    return null;
  },
};
const UpperCaseRule = RepeatableCharacterRule("A");

describe("parsers", () => {
  describe("tokenizer", () => {
    describe("utils", () => {
      describe("tokenize", () => {
        it("tokenizes succesfully the given text", () => {
          const { tokens } = tokenize("(Phone of )Aa{5}( is )+000-0{7}", [
            BracketsRule,
            LowerCaseRule,
            NumberRule,
            SpecialCharRule,
            UpperCaseRule,
          ]);
          const expected: List<Token> = [
            {
              occurrences: [{ endIndex: 10, startIndex: 0 }],
              match: "(Phone of )",
              value: "Phone of ",
            },
            {
              occurrences: [{ endIndex: 11, startIndex: 11 }],
              match: "A",
              value: "A",
            },
            {
              occurrences: [{ endIndex: 15, startIndex: 12 }],
              match: "a{5}",
              value: "aaaaa",
            },
            {
              occurrences: [{ endIndex: 21, startIndex: 16 }],
              match: "( is )",
              value: " is ",
            },
            {
              occurrences: [{ endIndex: 22, startIndex: 22 }],
              match: "+",
              value: "+",
            },
            {
              occurrences: [
                { endIndex: 23, startIndex: 23 },
                { endIndex: 24, startIndex: 24 },
                { endIndex: 25, startIndex: 25 },
              ],
              match: "0",
              value: "0",
            },
            {
              occurrences: [{ endIndex: 26, startIndex: 26 }],
              match: "-",
              value: "-",
            },
            {
              occurrences: [{ endIndex: 30, startIndex: 27 }],
              match: "0{7}",
              value: "0000000",
            },
          ];
          tokens.forEach((token, index) =>
            expect(token).toEqual(expected[index])
          );
        });
      });
    });
  });
});
