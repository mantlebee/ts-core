import { List } from "@/common";

import { generateRandomNumber, numberIsInteger } from "../numbers";

describe("common", () => {
  describe("utils", () => {
    describe("number", () => {
      describe("generateRandomNumber", () => {
        it("Generates an integer random number between 0 and the given max value, max included", () => {
          const max = 12;
          const randoms: List<number> = [];
          for (let i = 0; i < 99; ++i) randoms.push(generateRandomNumber(max));
          expect(randoms.every((a) => a <= max)).toBeTruthy();
          expect(randoms.every(numberIsInteger)).toBeTruthy();
        });
        it("Generates an integer random number in the given range, min and max included", () => {
          const max = 12;
          const min = 10;
          const randoms: List<number> = [];
          for (let i = 0; i < 99; ++i)
            randoms.push(generateRandomNumber(max, min));
          expect(randoms.every((a) => a >= min && a <= max)).toBeTruthy();
          expect(randoms.every(numberIsInteger)).toBeTruthy();
        });
        it("Generates a float (2 digits) random number in the given range, min and max included", () => {
          const decimals = 2;
          const max = 12;
          const min = 10;
          const randoms: List<number> = [];
          for (let i = 0; i < 99; ++i)
            randoms.push(generateRandomNumber(max, min, decimals));
          expect(randoms.every((a) => a >= min && a <= max)).toBeTruthy();
          expect(randoms.some((a) => `${a}`.length === 5)).toBeTruthy();
          expect(randoms.some((a) => !numberIsInteger(a))).toBeTruthy();
        });
      });
      describe("numberIsInteger", () => {
        it("Number is integer", () => {
          const isInteger = numberIsInteger(5);
          expect(isInteger).toBeTruthy();
        });
        it("Number is not integer", () => {
          const isInteger = numberIsInteger(5.12);
          expect(isInteger).toBeFalsy();
        });
      });
    });
  });
});
