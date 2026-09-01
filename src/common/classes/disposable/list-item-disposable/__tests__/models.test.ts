import { ListItemDisposable } from "../models";

describe("common", () => {
  describe("classes", () => {
    describe("disposable", () => {
      describe("list-item-disposable", () => {
        describe("models", () => {
          describe("ListItemDisposable", () => {
            describe("dispose", () => {
              it("removes the item from the list", async () => {
                const list = ["a", "b", "c"];
                const disposable = new ListItemDisposable("b", list);
                await disposable.dispose();
                expect(list).toEqual(["a", "c"]);
              });
              it("mutates the same list instance", async () => {
                const list = [1, 2, 3];
                const ref = list;
                await new ListItemDisposable(2, list).dispose();
                expect(ref).toBe(list);
                expect(ref).toEqual([1, 3]);
              });
              it("removes every occurrence of the item", async () => {
                const list = ["x", "y", "x", "z", "x"];
                await new ListItemDisposable("x", list).dispose();
                expect(list).toEqual(["y", "z"]);
              });
              it("matches by reference, not by value", async () => {
                const target = { id: 1 };
                const twin = { id: 1 };
                const list = [target, twin];
                await new ListItemDisposable({ id: 1 }, list).dispose();
                expect(list).toEqual([target, twin]);
                await new ListItemDisposable(target, list).dispose();
                expect(list).toEqual([twin]);
              });
              it("leaves the list untouched when the item is not present", async () => {
                const list = ["a", "b"];
                await new ListItemDisposable("missing", list).dispose();
                expect(list).toEqual(["a", "b"]);
              });
              it("is safe to call more than once", async () => {
                const list = ["a", "b", "c"];
                const disposable = new ListItemDisposable("b", list);
                await disposable.dispose();
                await disposable.dispose();
                expect(list).toEqual(["a", "c"]);
              });
              it("resolves to undefined", async () => {
                const result = await new ListItemDisposable(1, [1]).dispose();
                expect(result).toBeUndefined();
              });
            });
          });
        });
      });
    });
  });
});
