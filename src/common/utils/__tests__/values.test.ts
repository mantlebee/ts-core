import { isDefined, isNull, isNullOrUndefined, isUndefined } from "../values";

describe("common", () => {
  describe("utils", () => {
    describe("values", () => {
      describe("isDefined", () => {
        it("Returns true if value is not null and not undefined", () => {
          const value = 1;
          expect(isDefined(value)).toBeTruthy();
        });
        it("Returns false if value is null", () => {
          const value = null;
          expect(isDefined(value)).toBeFalsy();
        });
        it("Returns false if value is undefined", () => {
          let value;
          expect(isDefined(value)).toBeFalsy();
        });
      });
      describe("isNull", () => {
        it("Returns true if value is null", () => {
          const value = null;
          expect(isNull(value)).toBeTruthy();
        });
        it("Returns false if value is not null", () => {
          const value = 1;
          expect(isNull(value)).toBeFalsy();
        });
      });
      describe("isNullOrUndefined", () => {
        it("Returns true if value is null", () => {
          const value = null;
          expect(isNullOrUndefined(value)).toBeTruthy();
        });
        it("Returns true if value is undefined", () => {
          let value;
          expect(isNullOrUndefined(value)).toBeTruthy();
        });
        it("Returns false if value is not null", () => {
          const value = 1;
          expect(isNullOrUndefined(value)).toBeFalsy();
        });
      });
      describe("isUndefined", () => {
        it("Returns true if value is undefined", () => {
          let value;
          expect(isUndefined(value)).toBeTruthy();
        });
        it("Returns false if value is not undefined", () => {
          const value = 1;
          expect(isUndefined(value)).toBeFalsy();
        });
      });
    });
  });
});
