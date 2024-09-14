import { isFunction } from "../functions";

const obj = { id: 1, greet() {} };

describe("common", () => {
  describe("utils", () => {
    describe("functions", () => {
      describe("isFunction", () => {
        it("True if arg in a function", () => {
          expect(isFunction(() => {})).toBeTruthy();
          expect(isFunction(obj.greet)).toBeTruthy();
        });
        it("False if arg in not a function", () => {
          expect(isFunction(undefined)).toBeFalsy();
          expect(isFunction(null)).toBeFalsy();
          expect(isFunction(true)).toBeFalsy();
          expect(isFunction(1)).toBeFalsy();
          expect(isFunction("")).toBeFalsy();
          expect(isFunction({})).toBeFalsy();
          expect(isFunction([])).toBeFalsy();
          expect(isFunction(JSON.parse("[]"))).toBeFalsy();
          expect(isFunction(new Error())).toBeFalsy();
          expect(isFunction(Error)).toBeFalsy();
        });
      });
    });
  });
});
