import { isBoolean } from "../booleans";

describe("common", () => {
  describe("utils", () => {
    describe("booleans", () => {
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
