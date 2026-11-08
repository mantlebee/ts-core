import { Any } from "@/common";

/**
 * Creates a new date whose UTC components are the local components of the given
 * date, i.e. it reads the date "as if it were UTC".
 * @example
 * ```ts
 * // In a UTC+1 timezone:
 * dateAsUtc(new Date(2026, 0, 1)).toISOString() // "2026-01-01T00:00:00.000Z"
 * ```
 * @param date Date to convert.
 * @returns a new date, whose UTC time is equal to the local time of date.
 */
export function dateAsUtc(date: Date): Date {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );
}

/**
 * Checks if arg is a date.
 * @param arg Item to check.
 * @returns true if arg is a date.
 */
export function isDate(arg: Any): boolean {
  return arg instanceof Date;
}

const IsoDateTimePattern =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{3})?Z$/;

/**
 * Checks if value is an {@link IsoDateTime}: an ISO 8601 date and time in UTC,
 * `YYYY-MM-DDTHH:mm:ss.sssZ`, with optional milliseconds (exactly 3 digits).
 *
 * Besides the shape, the date must exist in the (proleptic Gregorian)
 * calendar: months 01–12, days within the month (February 29 only in leap
 * years), hours 00–23 (`24:00:00` is rejected), minutes and seconds 00–59
 * (leap seconds are rejected, since `Date` cannot represent them). Offsets
 * other than `Z` (`+00:00`, `+01:00`, …), lowercase `t` / `z`, a space instead
 * of `T`, date-only and time-only values are rejected.
 * @example
 * ```ts
 * isIsoDateTime("2024-02-29T23:59:59.999Z") // true
 * isIsoDateTime("2024-02-29T23:59:59Z")     // true
 * isIsoDateTime("2023-02-29T00:00:00Z")     // false, 2023 is not a leap year
 * isIsoDateTime("2024-01-01T00:00:00+01:00") // false, offset is not Z
 * ```
 * @param value String to check.
 * @returns true if value is an ISO 8601 date and time in UTC.
 */
export function isIsoDateTime(value: string): boolean {
  const match = IsoDateTimePattern.exec(value);
  if (!match) return false;
  const [year, month, day, hours, minutes, seconds] = match
    .slice(1, 7)
    .map(Number) as [number, number, number, number, number, number];
  return (
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= getDaysInMonth(year, month) &&
    hours <= 23 &&
    minutes <= 59 &&
    seconds <= 59
  );
}

/**
 * Number of days of a month in the proleptic Gregorian calendar.
 * @param year Full year (0–9999).
 * @param month Month, 1-based (1 is January).
 * @returns the number of days of the month.
 */
function getDaysInMonth(year: number, month: number): number {
  if (month === 2) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    return isLeapYear ? 29 : 28;
  }
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}
