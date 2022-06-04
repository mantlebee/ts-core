import {
  getCharsFromCharCodesRange,
  getLowercaseChars,
  getNumberChars,
  getSpecialChars,
  getUppercaseChars,
} from "../chars";

const specialCharsGroups = [
  // Char codes from 32 to 48
  " !\"#$%&'()*+,-./",
  // Char codes from 58 to 64
  ":;<=>?@",
  //Char codes from 94 to 96
  "^_`",
  //Char codes from 123 to 126
  "{|}~",
];

describe("common", () => {
  describe("utils", () => {
    describe("chars", () => {
      describe("getCharsFromCharCodesRange", () => {
        it("String of chars converted from the provided char code range, ordered by char code", () => {
          const str = getCharsFromCharCodesRange(32, 16);
          expect(str).toBe(specialCharsGroups[0]);
        });
      });
      describe("getLowercaseChars", () => {
        it("String of the lowercase alphabet, orderd alphabetically", () => {
          const str = getLowercaseChars();
          expect(str).toBe("abcdefghijklmnopqrstuvwxyz");
        });
      });
      describe("getNumberChars", () => {
        it("String of numbers from 0 to 9", () => {
          const str = getNumberChars();
          expect(str).toBe("0123456789");
        });
      });
      describe("getUppercaseChars", () => {
        it("String of the upper alphabet, orderd alphabetically", () => {
          const str = getUppercaseChars();
          expect(str).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        });
      });
      describe("getSpecialChars", () => {
        it("String of special chars, ordered by char code", () => {
          const str = getSpecialChars();
          expect(str).toBe(specialCharsGroups.join(""));
        });
      });
    });
  });
});
