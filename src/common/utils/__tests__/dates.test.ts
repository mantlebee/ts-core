import { dateAsUtc, DateOffset, isDate, isIsoDateTime } from "../dates";

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
      describe("isIsoDateTime", () => {
        it("Accepts ISO 8601 UTC date times, with or without milliseconds", () => {
          expect(isIsoDateTime("2026-01-01T00:00:00.000Z")).toBeTruthy();
          expect(isIsoDateTime("2026-01-01T00:00:00Z")).toBeTruthy();
          expect(isIsoDateTime("2026-12-31T23:59:59.999Z")).toBeTruthy();
          expect(isIsoDateTime("0000-01-01T00:00:00Z")).toBeTruthy();
          expect(isIsoDateTime("9999-12-31T23:59:59Z")).toBeTruthy();
          expect(
            isIsoDateTime(new Date(Date.UTC(2026, 6, 15, 8, 30)).toISOString()),
          ).toBeTruthy();
        });
        it("Accepts February 29 only in leap years", () => {
          expect(isIsoDateTime("2024-02-29T12:00:00Z")).toBeTruthy();
          expect(isIsoDateTime("2000-02-29T12:00:00Z")).toBeTruthy();
          expect(isIsoDateTime("2023-02-29T12:00:00Z")).toBeFalsy();
          expect(isIsoDateTime("1900-02-29T12:00:00Z")).toBeFalsy();
          expect(isIsoDateTime("2024-02-30T12:00:00Z")).toBeFalsy();
        });
        it("Rejects days and months out of the calendar", () => {
          expect(isIsoDateTime("2026-00-10T00:00:00Z")).toBeFalsy();
          expect(isIsoDateTime("2026-13-10T00:00:00Z")).toBeFalsy();
          expect(isIsoDateTime("2026-01-00T00:00:00Z")).toBeFalsy();
          expect(isIsoDateTime("2026-01-32T00:00:00Z")).toBeFalsy();
          expect(isIsoDateTime("2026-04-31T00:00:00Z")).toBeFalsy();
          expect(isIsoDateTime("2026-04-30T00:00:00Z")).toBeTruthy();
        });
        it("Rejects times out of range, including 24:00 and leap seconds", () => {
          expect(isIsoDateTime("2026-01-01T24:00:00Z")).toBeFalsy();
          expect(isIsoDateTime("2026-01-01T23:60:00Z")).toBeFalsy();
          expect(isIsoDateTime("2026-12-31T23:59:60Z")).toBeFalsy();
        });
        it("Rejects offsets other than Z", () => {
          expect(isIsoDateTime("2026-01-01T00:00:00+00:00")).toBeFalsy();
          expect(isIsoDateTime("2026-01-01T00:00:00+01:00")).toBeFalsy();
          expect(isIsoDateTime("2026-01-01T00:00:00.000-05:00")).toBeFalsy();
          expect(isIsoDateTime("2026-01-01T00:00:00+0100")).toBeFalsy();
        });
        it("Rejects date times without Z", () => {
          expect(isIsoDateTime("2026-01-01T00:00:00")).toBeFalsy();
          expect(isIsoDateTime("2026-01-01T00:00:00.000")).toBeFalsy();
          expect(isIsoDateTime("2026-01-01T00:00:00z")).toBeFalsy();
        });
        it("Rejects other shapes", () => {
          expect(isIsoDateTime("")).toBeFalsy();
          expect(isIsoDateTime("2026-01-01")).toBeFalsy();
          expect(isIsoDateTime("00:00:00Z")).toBeFalsy();
          expect(isIsoDateTime("2026-01-01 00:00:00Z")).toBeFalsy();
          expect(isIsoDateTime("2026-01-01t00:00:00Z")).toBeFalsy();
          expect(isIsoDateTime("2026-1-1T0:0:0Z")).toBeFalsy();
          expect(isIsoDateTime("2026-01-01T00:00Z")).toBeFalsy();
          expect(isIsoDateTime("2026-01-01T00:00:00.1Z")).toBeFalsy();
          expect(isIsoDateTime("2026-01-01T00:00:00.1234Z")).toBeFalsy();
          expect(isIsoDateTime("+002026-01-01T00:00:00.000Z")).toBeFalsy();
          expect(isIsoDateTime(" 2026-01-01T00:00:00Z")).toBeFalsy();
          expect(isIsoDateTime("2026-01-01T00:00:00Z\n")).toBeFalsy();
          expect(isIsoDateTime("Thu Jan 01 2026")).toBeFalsy();
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
