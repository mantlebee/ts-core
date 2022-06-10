import { isNumber, numberIsInteger } from "../numbers";

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
    });
  });
});
