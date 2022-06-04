import { List } from "@/common";

import { generateRandomNumber } from "../numbers";

describe("common", () => {
  describe("utils", () => {
    describe("number", () => {
      describe("generateRandomNumber", () => {
        it("Generates a random number in the given range, min and max included", () => {
          const randoms: List<number> = [];
          for (let i = 0; i < 10; ++i) randoms.push(generateRandomNumber(0, 1));
          expect(randoms.every((a) => a >= 0 && a <= 1)).toBeTruthy();
        });
      });
    });
  });
});
