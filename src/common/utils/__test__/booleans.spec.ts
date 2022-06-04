import { List } from "@/common";

import { generateRandomBoolean } from "../booleans";

describe("common", () => {
  describe("utils", () => {
    describe("boolean", () => {
      describe("generateRandomBoolean", () => {
        it("Generates a random boolean", () => {
          const randoms: List<boolean> = [];
          for (let i = 0; i < 10; ++i) randoms.push(generateRandomBoolean());
          expect(randoms.some((a) => a)).toBeTruthy();
          expect(randoms.some((a) => !a)).toBeTruthy();
        });
      });
    });
  });
});
