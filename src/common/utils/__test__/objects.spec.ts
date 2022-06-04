import { objectHasKey } from "../objects";

const obj = { id: 1, name: "John" };

describe("common", () => {
  describe("utils", () => {
    describe("objects", () => {
      describe("objectHasKey", () => {
        it("True if object has the given key", () => {
          const hasKey = objectHasKey(obj, "id");
          expect(hasKey).toBeTruthy();
        });
        it("False if object has not the given key", () => {
          const hasKey = objectHasKey(obj, "surname");
          expect(hasKey).toBeFalsy();
        });
      });
    });
  });
});
