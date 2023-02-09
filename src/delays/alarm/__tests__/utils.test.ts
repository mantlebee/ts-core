import { TestDateNow } from "@test/index";

import { getExpirationDelta } from "../utils";

describe("Delays", () => {
  describe("Alarm", () => {
    describe("utils", () => {
      describe("getExpirationDelta", () => {
        const fakeDateNow = new TestDateNow(new Date(2023, 0, 1, 12, 0, 0));
        beforeAll(() => {
          fakeDateNow.enable();
        });
        afterAll(() => {
          fakeDateNow.disable();
        });
        it("Get a positive value if the expiration date comes after current datetime", () => {
          const expiration = new Date(2023, 0, 1, 12, 0, 1);
          const delta = getExpirationDelta(expiration);
          expect(delta).toBe(1000);
        });
        it("Get a negative value if the expiration date comes before current datetime", () => {
          const expiration = new Date(2023, 0, 1, 11, 59, 59);
          const delta = getExpirationDelta(expiration);
          expect(delta).toBe(-1000);
        });
      });
    });
  });
});
