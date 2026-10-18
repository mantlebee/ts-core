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
