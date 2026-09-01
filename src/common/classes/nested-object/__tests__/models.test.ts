import { Dictionary } from "@/common";

import { NestedObject } from "../models";

describe("common", () => {
  describe("classes", () => {
    describe("nested-object", () => {
      describe("models", () => {
        describe("NestedObject", () => {
          describe("get", () => {
            it("reads a nested value by path", () => {
              const nested = new NestedObject({ a: { b: { c: 1 } } });
              expect(nested.get("a.b.c")).toBe(1);
            });
            it("returns undefined when a segment is missing", () => {
              const nested = new NestedObject({ a: {} });
              expect(nested.get("a.b.c")).toBeUndefined();
            });
            it("returns undefined when a segment is not traversable", () => {
              const nested = new NestedObject({ a: 5 });
              expect(nested.get("a.b")).toBeUndefined();
            });
            it("reads array indexes", () => {
              const nested = new NestedObject({ a: [{ id: 10 }, { id: 20 }] });
              expect(nested.get("a.1.id")).toBe(20);
            });
            it("returns a stored null as null, not undefined", () => {
              const nested = new NestedObject({ a: { b: null } });
              expect(nested.get("a.b")).toBeNull();
            });
            it("honours a custom separator", () => {
              const nested = new NestedObject(
                { a: { b: 1 } },
                { pathSeparator: "/" },
              );
              expect(nested.get("a/b")).toBe(1);
            });
          });

          describe("has", () => {
            it("is true for a present key even when its value is undefined", () => {
              const nested = new NestedObject({ a: { b: undefined } });
              expect(nested.has("a.b")).toBe(true);
            });
            it("is false for a missing key", () => {
              const nested = new NestedObject({ a: {} });
              expect(nested.has("a.b")).toBe(false);
            });
            it("is false when a parent segment is not traversable", () => {
              const nested = new NestedObject({ a: 5 });
              expect(nested.has("a.b")).toBe(false);
            });
          });

          describe("set", () => {
            it("overwrites an existing leaf", () => {
              const data = { a: { b: 1 } };
              new NestedObject(data).set("a.b", 2);
              expect(data).toEqual({ a: { b: 2 } });
            });
            it("mutates the same object instance", () => {
              const data: Dictionary = { a: { b: 1 } };
              const ref = data;
              new NestedObject(data).set("a.b", 2);
              expect(ref).toBe(data);
            });
            it("does nothing when an intermediate segment is missing and createIfMissing is off", () => {
              const data = { a: {} };
              new NestedObject(data).set("a.b.c", 1);
              expect(data).toEqual({ a: {} });
            });
            it("creates missing intermediate objects when createIfMissing is on", () => {
              const data: Dictionary = {};
              new NestedObject(data, { createIfMissing: true }).set("a.b.c", 1);
              expect(data).toEqual({ a: { b: { c: 1 } } });
            });
            it("creates an array when the next segment is a numeric index", () => {
              const data: Dictionary = {};
              new NestedObject(data, { createIfMissing: true }).set("a.0.id", 7);
              expect(data).toEqual({ a: [{ id: 7 }] });
            });
            it("does not replace an existing non-traversable segment unless replaceIfExists is on", () => {
              const data = { a: 5 };
              new NestedObject(data, { createIfMissing: true }).set("a.b", 1);
              expect(data).toEqual({ a: 5 });
            });
            it("replaces an existing non-traversable segment when replaceIfExists is on", () => {
              const data = { a: 5 };
              new NestedObject(data, { replaceIfExists: true }).set("a.b", 1);
              expect(data).toEqual({ a: { b: 1 } });
            });
            it("leaves data completely untouched when the write cannot reach its leaf", () => {
              // `a` could be replaced (replaceIfExists) but the following `b`
              // cannot be created (createIfMissing is off): nothing should change.
              const data = { a: 5 };
              new NestedObject(data, { replaceIfExists: true }).set("a.b.c", 1);
              expect(data).toEqual({ a: 5 });
            });
          });

          describe("unset", () => {
            it("deletes a nested key", () => {
              const data = { a: { b: { c: 1, d: 2 } } };
              new NestedObject(data).unset("a.b.c");
              expect(data).toEqual({ a: { b: { d: 2 } } });
            });
            it("does nothing when the path cannot be traversed", () => {
              const data = { a: 1 };
              new NestedObject(data).unset("a.b.c");
              expect(data).toEqual({ a: 1 });
            });
            it("removes the key so has() becomes false afterwards", () => {
              const nested = new NestedObject({ a: { b: 1 } });
              nested.unset("a.b");
              expect(nested.has("a.b")).toBe(false);
            });
          });
        });
      });
    });
  });
});
