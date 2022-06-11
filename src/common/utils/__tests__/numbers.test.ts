import { isNumber, numberIsInteger, roundNumber } from "../numbers";

describe("common", () => {
  describe("utils", () => {
    describe("numbers", () => {
      describe("isNumber", () => {
        it("Item is a number", () => {
          const is = isNumber(5);
          expect(is).toBeTruthy();
        });
        it("Item is not a number", () => {
          const is = isNumber("Hello, World!");
          expect(is).toBeFalsy();
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
      describe("roundNumber", () => {
        it("Rounds 1.4 to 1", () => {
          const result = roundNumber(1.4);
          expect(result).toBe(1);
        });
        it("Rounds 1.44 to 1.4", () => {
          const result = roundNumber(1.44, 1);
          expect(result).toBe(1.4);
        });
        it("Rounds 1.444 to 1.44", () => {
          const result = roundNumber(1.444, 2);
          expect(result).toBe(1.44);
        });
        it("Rounds 1.5 to 2", () => {
          const result = roundNumber(1.5);
          expect(result).toBe(2);
        });
        it("Rounds 1.55 to 1.6", () => {
          const result = roundNumber(1.55, 1);
          expect(result).toBe(1.6);
        });
        it("Rounds 1.555 to 1.56", () => {
          const result = roundNumber(1.555, 2);
          expect(result).toBe(1.56);
        });
      });
    });
  });
});
