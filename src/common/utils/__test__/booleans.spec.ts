import { List } from "@/common";

import { generateRandomBoolean, isBoolean } from "../booleans";

describe("common", () => {
  describe("utils", () => {
    describe("booleans", () => {
      describe("generateRandomBoolean", () => {
        it("Generates a random boolean", () => {
          const randoms: List<boolean> = [];
          for (let i = 0; i < 100; ++i) randoms.push(generateRandomBoolean());
          expect(randoms.some((a) => a)).toBeTruthy();
          expect(randoms.some((a) => !a)).toBeTruthy();
        });
      });
      describe("isBoolean", () => {
        it("Item is a boolean", () => {
          const is = isBoolean(true);
          expect(is).toBeTruthy();
        });
        it("Item is not a boolean", () => {
          const is = isBoolean(5);
          expect(is).toBeFalsy();
        });
      });
    });
  });
});
