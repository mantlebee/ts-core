import { FlatObject } from "../models";

describe("common", () => {
  describe("classes", () => {
    describe("smart-objects", () => {
      describe("flat", () => {
        describe("models", () => {
          describe("FlatObject", () => {
            it("reads and checks keys verbatim", () => {
              const flat = new FlatObject({ a: 1, "b.c": 2 });
              expect(flat.get("a")).toBe(1);
              expect(flat.get("b.c")).toBe(2);
              expect(flat.has("a")).toBe(true);
              expect(flat.has("missing")).toBe(false);
            });
            it("treats a dotted string as a single literal key, not a path", () => {
              const flat = new FlatObject({ a: { b: 1 } });
              expect(flat.get("a.b")).toBeUndefined();
            });
            it("sets and unsets on the wrapped dictionary in place", () => {
              const obj: Record<string, unknown> = { a: 1 };
              const flat = new FlatObject(obj);
              flat.set("b", 2);
              flat.unset("a");
              expect(obj).toEqual({ b: 2 });
            });
            it("defaults to an empty object", () => {
              const flat = new FlatObject();
              expect(flat.has("x")).toBe(false);
              flat.set("x", 1);
              expect(flat.get("x")).toBe(1);
            });
            it("lists own keys verbatim", () => {
              const flat = new FlatObject({ a: 1, "b.c": 2 });
              expect(flat.keys()).toEqual(["a", "b.c"]);
            });
            it("returns no keys for an empty object", () => {
              const flat = new FlatObject();
              expect(flat.keys()).toEqual([]);
            });
            it("writes every own key of the seed object via set", () => {
              const flat = new FlatObject();
              flat.seed({ a: 1, b: 2 });
              expect(flat.get("a")).toBe(1);
              expect(flat.get("b")).toBe(2);
            });
            it("does not remove keys absent from the seed object", () => {
              const flat = new FlatObject({ a: 1 });
              flat.seed({ b: 2 });
              expect(flat.get("a")).toBe(1);
              expect(flat.get("b")).toBe(2);
            });
          });
        });
      });
    });
  });
});
