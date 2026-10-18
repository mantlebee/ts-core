import { firstOrDefault } from "../arrays";
import { isFunction } from "../functions";
import { roundNumber } from "../numbers";
import { getValue } from "../values";

describe("common", () => {
  describe("utils", () => {
    describe("regressions", () => {
      describe("firstOrDefault", () => {
        it("returns falsy items instead of the default one", () => {
          expect(firstOrDefault([0, 1], (a) => a === 0, 99)).toBe(0);
          expect(firstOrDefault(["", "a"], (a) => a === "", "x")).toBe("");
          expect(firstOrDefault([false, true], (a) => !a, true)).toBe(false);
        });
      });
      describe("isFunction", () => {
        it("is true for functions declared with the 'function' keyword", () => {
          expect(isFunction(function () {})).toBe(true);
          expect(isFunction(function named() {})).toBe(true);
          expect(isFunction(async function () {})).toBe(true);
          expect(isFunction(function* () {})).toBe(true);
          expect(isFunction(Math.max)).toBe(true);
          expect(isFunction((() => {}).bind(null))).toBe(true);
        });
        it("is false for class and built-in constructors", () => {
          class A {}
          expect(isFunction(A)).toBe(false);
          expect(isFunction(Error)).toBe(false);
          expect(isFunction(Date)).toBe(false);
        });
      });
      describe("getValue", () => {
        it("calls getters declared with the 'function' keyword", () => {
          expect(
            getValue(function (a: number) {
              return a * 2;
            }, 21)
          ).toBe(42);
        });
      });
      describe("roundNumber", () => {
        it("handles numbers written in exponential notation", () => {
          expect(roundNumber(1.23e-7, 9)).toBe(1.23e-7);
          expect(roundNumber(1.26e-7, 8)).toBe(1.3e-7);
          expect(roundNumber(1e21, 2)).toBe(1e21);
        });
        it("still rounds halves away from floating point errors", () => {
          expect(roundNumber(1.005, 2)).toBe(1.01);
          expect(roundNumber(-1.44, 1)).toBe(-1.4);
        });
        it("returns non-finite numbers as they are", () => {
          expect(roundNumber(NaN, 2)).toBeNaN();
          expect(roundNumber(Infinity, 2)).toBe(Infinity);
        });
      });
    });
  });
});
