import { List } from "@/common";

import { generateRandomNumber } from "../numbers";

describe("common", () => {
  describe("utils", () => {
    describe("number", () => {
      describe("generateRandomNumber", () => {
        it("Generates a random number in the given range, min and max included", () => {
          const max = 9;
          const min = 5;
          const randoms: List<number> = [];
          for (let i = 0; i < 10; ++i)
            randoms.push(generateRandomNumber(min, max));
          expect(randoms.every((a) => a >= min && a <= max)).toBeTruthy();
        });
        it("Generates number 5", () => {
          expect(generateRandomNumber(5, 5)).toBe(5);
        });
      });
    });
  });
});
