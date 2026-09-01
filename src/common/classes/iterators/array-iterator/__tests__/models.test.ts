import { ArrayIterator } from "../models";

describe("common", () => {
  describe("classes", () => {
    describe("iterators", () => {
      describe("array-iterator", () => {
        describe("models", () => {
          describe("ArrayIterator", () => {
            describe("getCurrent", () => {
              it("returns the first item before any goNext()", () => {
                const iterator = new ArrayIterator([10, 20, 30]);
                expect(iterator.getCurrent()).toBe(10);
              });
              it("returns the item at the current position after goNext()", () => {
                const iterator = new ArrayIterator([10, 20, 30]);
                iterator.goNext();
                expect(iterator.getCurrent()).toBe(20);
              });
              it("returns undefined once the end has been passed", () => {
                const iterator = new ArrayIterator([1]);
                iterator.goNext();
                expect(iterator.getCurrent()).toBeUndefined();
              });
              it("returns undefined for an empty array", () => {
                const iterator = new ArrayIterator<number>([]);
                expect(iterator.getCurrent()).toBeUndefined();
              });
            });
            describe("goNext", () => {
              it("advances one position per call", () => {
                const iterator = new ArrayIterator(["a", "b", "c"]);
                iterator.goNext();
                iterator.goNext();
                expect(iterator.getCurrent()).toBe("c");
              });
            });
            describe("hasMore", () => {
              it("is true while the current position is within bounds", () => {
                const iterator = new ArrayIterator([1, 2]);
                expect(iterator.hasMore()).toBe(true);
                iterator.goNext();
                expect(iterator.hasMore()).toBe(true);
              });
              it("is false once every item has been consumed", () => {
                const iterator = new ArrayIterator([1, 2]);
                iterator.goNext();
                iterator.goNext();
                expect(iterator.hasMore()).toBe(false);
              });
              it("is false for an empty array", () => {
                const iterator = new ArrayIterator<string>([]);
                expect(iterator.hasMore()).toBe(false);
              });
            });
            describe("iteration", () => {
              it("visits every item once, in order", () => {
                const source = [1, 2, 3, 4];
                const iterator = new ArrayIterator(source);
                const visited: number[] = [];
                while (iterator.hasMore()) {
                  visited.push(iterator.getCurrent());
                  iterator.goNext();
                }
                expect(visited).toEqual(source);
              });
              it("reflects later mutations of the wrapped array (held by reference)", () => {
                const source = [1, 2];
                const iterator = new ArrayIterator(source);
                iterator.goNext();
                source.push(3);
                expect(iterator.hasMore()).toBe(true);
                expect(iterator.getCurrent()).toBe(2);
                iterator.goNext();
                expect(iterator.getCurrent()).toBe(3);
              });
            });
          });
        });
      });
    });
  });
});
