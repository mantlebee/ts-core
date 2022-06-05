import { isDate } from "../dates";

describe("common", () => {
  describe("utils", () => {
    describe("dates", () => {
      describe("isDate", () => {
        it("Item is a date", () => {
          const is = isDate(new Date());
          expect(is).toBeTruthy();
        });
        it("Item is not a date", () => {
          const is = isDate(5);
          expect(is).toBeFalsy();
        });
      });
    });
  });
});
