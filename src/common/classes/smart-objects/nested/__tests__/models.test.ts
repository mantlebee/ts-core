import { NestedObject } from "../models";

describe("common", () => {
  describe("classes", () => {
    describe("smart-objects", () => {
      describe("nested", () => {
        describe("models", () => {
          describe("NestedObject", () => {
            describe("keys", () => {
              it("returns dot-joined paths to every leaf value", () => {
                const nested = new NestedObject({
                  user: { name: "John", role: "admin" },
                  active: true,
                });
                expect(nested.keys()).toEqual([
                  "user.name",
                  "user.role",
                  "active",
                ]);
              });
              it("walks through arrays using their indices as segments", () => {
                const nested = new NestedObject({ items: [{ id: 1 }, { id: 2 }] });
                expect(nested.keys()).toEqual(["items.0.id", "items.1.id"]);
              });
              it("contributes no path for an empty nested container", () => {
                const nested = new NestedObject({ a: {}, b: [] });
                expect(nested.keys()).toEqual([]);
              });
              it("returns no keys for an empty object", () => {
                const nested = new NestedObject();
                expect(nested.keys()).toEqual([]);
              });
              it("uses a custom path separator when provided", () => {
                const nested = new NestedObject(
                  { user: { name: "John" } },
                  { pathSeparator: "/" },
                );
                expect(nested.keys()).toEqual(["user/name"]);
              });
            });
          });
        });
      });
    });
  });
});
