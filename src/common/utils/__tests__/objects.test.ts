import { isObject, objectHasKey } from "../objects";

const obj = { id: 1, name: "John" };

describe("common", () => {
  describe("utils", () => {
    describe("objects", () => {
      describe("isObject", () => {
        it("True if arg in an object", () => {
          expect(isObject({})).toBeTruthy();
          expect(isObject(obj)).toBeTruthy();
          expect(isObject(JSON.parse("{}"))).toBeTruthy();
          expect(isObject(Object.create(null))).toBeTruthy();
        });
        it("False if arg in not an object", () => {
          expect(isObject(undefined)).toBeFalsy();
          expect(isObject(null)).toBeFalsy();
          expect(isObject(true)).toBeFalsy();
          expect(isObject(1)).toBeFalsy();
          expect(isObject("")).toBeFalsy();
          expect(isObject(() => {})).toBeFalsy();
          expect(isObject([])).toBeFalsy();
          expect(isObject(JSON.parse("[]"))).toBeFalsy();
          expect(isObject(Error)).toBeFalsy();
          expect(isObject(new Error())).toBeFalsy();
          expect(isObject(new Date())).toBeFalsy();
          expect(isObject(/regex/)).toBeFalsy();
          expect(isObject(new Map())).toBeFalsy();
          class Foo {}
          expect(isObject(new Foo())).toBeFalsy();
        });
      });
      describe("objectHasKey", () => {
        it("True if object has the given key", () => {
          const hasKey = objectHasKey(obj, "id");
          expect(hasKey).toBeTruthy();
        });
        it("False if object has not the given key", () => {
          const hasKey = objectHasKey(obj, "surname");
          expect(hasKey).toBeFalsy();
        });
      });
    });
  });
});
