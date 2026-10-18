import { dateAsUtc, DateOffset, isDate } from "../dates";

// Local dates: expectations are computed so tests pass in any timezone.
const date1 = new Date(2026, 0, 1);
const date2 = new Date(2026, 6, 1);

describe("common", () => {
  describe("utils", () => {
    describe("dates", () => {
      describe("dateAsUtc", () => {
        it("Returns a new date whose UTC components are the local components of the given date", () => {
          expect(dateAsUtc(date1).toISOString()).toBe(
            "2026-01-01T00:00:00.000Z",
          );
          expect(dateAsUtc(date2).toISOString()).toBe(
            "2026-07-01T00:00:00.000Z",
          );
        });
      });
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
      describe("DateOffset", () => {
        it("Applies the offset to the source date", () => {
          const offset = DateOffset.fromDays(-1, date1);
          expect(offset.days).toBe(-1);
          expect(offset.value).toEqual(new Date(2025, 11, 31));
        });
        it("Applies the offset to the current date if source date is missing", () => {
          jest.useFakeTimers().setSystemTime(date1);
          expect(DateOffset.fromDays(2).value).toEqual(new Date(2026, 0, 3));
          jest.useRealTimers();
        });
      });
    });
  });
});
