import { List } from "@/common";

import { firstOrDefault } from "../arrays";

type Item = { id: number; name: string };

const items: List<Item> = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];
const defaultItem: Item = { id: 3, name: "Jack" };

describe("common", () => {
  describe("utils", () => {
    describe("arrays", () => {
      describe("firstOrDefault", () => {
        it("Returns the found item", () => {
          const item = firstOrDefault(items, (a) => a.id == 1);
          expect(item).toBe(items[0]);
        });
        it("Returns `null` if item is not found and a default value is not provided", () => {
          const item = firstOrDefault(items, (a) => a.id == 3);
          expect(item).toBeNull();
        });
        it("Returns the given default value if item is not found and a default value is provided", () => {
          const item = firstOrDefault(items, (a) => a.id == 3, defaultItem);
          expect(item).toBe(defaultItem);
        });
      });
    });
  });
});
