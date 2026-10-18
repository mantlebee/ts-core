import { Any, Dictionary } from "@/common";

import { FlatObject } from "../flat";
import { ImmutableObject } from "../immutable";
import { ISmartObject } from "../interfaces";
import { NestedObject } from "../nested";

const nestedFactory = (obj: Dictionary): ISmartObject =>
  new NestedObject(obj, { createIfMissing: true, replaceIfExists: true });

describe("common", () => {
  describe("classes", () => {
    describe("smart-objects", () => {
      describe("regressions", () => {
        afterEach(() => {
          delete (Object.prototype as Any).polluted;
        });
        describe("NestedObject", () => {
          it("'set' never writes through '__proto__'", () => {
            const nested = new NestedObject(
              {},
              { createIfMissing: true, replaceIfExists: true }
            );
            nested.set("__proto__.polluted", 1);
            nested.set("a.__proto__.polluted", 1);
            expect(({} as Any).polluted).toBeUndefined();
          });
          it("'seed' with a parsed '__proto__' key doesn't pollute Object.prototype", () => {
            const nested = new NestedObject({}, { createIfMissing: true });
            nested.seed(JSON.parse('{"__proto__":{"polluted":2},"ok":1}'));
            expect(({} as Any).polluted).toBeUndefined();
            expect(nested.get("ok")).toBe(1);
          });
          it("inherited members are neither present nor readable", () => {
            const nested = new NestedObject({ a: {} });
            expect(nested.has("toString")).toBe(false);
            expect(nested.has("a.constructor")).toBe(false);
            expect(nested.get("toString")).toBeUndefined();
            expect(nested.get("constructor.name")).toBeUndefined();
          });
        });
        describe("FlatObject", () => {
          it("inherited members are neither present nor readable", () => {
            const flat = new FlatObject({});
            expect(flat.has("toString")).toBe(false);
            expect(flat.get("toString")).toBeUndefined();
          });
          it("'set' ignores the '__proto__' key", () => {
            const obj: Dictionary = {};
            new FlatObject(obj).set("__proto__", { polluted: 1 });
            expect(Object.getPrototypeOf(obj)).toBe(Object.prototype);
            expect(obj.polluted).toBeUndefined();
          });
        });
        describe("ImmutableObject", () => {
          it("writes made to a version after 'clone' are not visible in the fork", () => {
            const v1 = new ImmutableObject({ a: 1 }, nestedFactory);
            v1.set("b", 2);
            const v2 = v1.clone();
            v1.set("c", 3);
            v1.set("a", 10);
            expect(v2.has("c")).toBe(false);
            expect(v2.get("a")).toBe(1);
            expect(v2.get("b")).toBe(2);
            expect(v1.get("c")).toBe(3);
          });
          it("forks of the same version are independent", () => {
            const v1 = new ImmutableObject({}, nestedFactory);
            v1.set("a", 1);
            const v2 = v1.clone();
            const v3 = v1.clone();
            v2.set("a", 2);
            expect(v3.get("a")).toBe(1);
            expect(v1.get("a")).toBe(1);
          });
        });
      });
    });
  });
});
