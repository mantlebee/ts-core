import { List } from "@/common";

import { extractRandomItem, firstOrDefault, listToDictionary } from "../arrays";

type Item = { id: number; name: string };

const items: List<Item> = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];
const defaultItem: Item = { id: 3, name: "Jack" };

describe("common", () => {
  describe("utils", () => {
    describe("arrays", () => {
      describe("extractRandomItem", () => {
        it("Extract a random item from a list", () => {
          const randoms: List<Item> = [];
          for (let i = 0; i < 100; i++) randoms.push(extractRandomItem(items));
          expect(randoms.some((a) => a === items[0])).toBeTruthy();
          expect(randoms.some((a) => a === items[1])).toBeTruthy();
        });
        it("If list has 1 items only, that one is extracted", () => {
          const randoms: List<Item> = [];
          for (let i = 0; i < 100; i++)
            randoms.push(extractRandomItem([defaultItem]));
          expect(randoms.every((a) => a === defaultItem)).toBeTruthy();
        });
      });
      describe("firstOrDefault", () => {
        it("Returns the found item", () => {
          const item = firstOrDefault<Item>(items, (a) => a.id == 1);
          expect(item).toBe(items[0]);
        });
        it("Returns `null` if item is not found and a default value is not provided", () => {
          const item = firstOrDefault<Item>(items, (a) => a.id == 3);
          expect(item).toBeNull();
        });
        it("Returns the given default value if item is not found and a default value is provided", () => {
          const item = firstOrDefault<Item>(
            items,
            (a) => a.id == 3,
            defaultItem
          );
          expect(item).toBe(defaultItem);
        });
      });
      describe("listToDictionary", () => {
        it("Creates a dictionary `{key: list item}` from a list and an item key", () => {
          const dict = listToDictionary(items, "id");
          expect(dict).toEqual({ 1: items[0], 2: items[1] });
        });
      });
    });
  });
});
