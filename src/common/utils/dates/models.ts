import { Stringable } from "@/common";

import { addLeadingZeros } from "../strings";
import { dateAsUtc } from "./utils";

/**
 * Offset, in days, to apply to a date. When no source date is given, the offset
 * is applied to the current date every time {@link value} is read.
 * @example
 * ```ts
 * DateOffset.fromDays(7).value                       // a week from now
 * DateOffset.fromDays(-1, new Date(2026, 0, 1)).value // 2025-12-31
 * ```
 */
export class DateOffset {
  private constructor(
    private readonly offset: number,
    private readonly sourceDate?: Date,
  ) {}

  /**
   * Number of days of the offset.
   */
  public get days(): number {
    return this.offset;
  }
  /**
   * Source date (or now) with the offset applied.
   */
  public get value(): Date {
    const date = new Date(this.sourceDate ?? Date.now());
    date.setDate(date.getDate() + this.offset);
    return date;
  }

  /**
   * Creates an offset of the given days.
   * @param days Number of days, negative to go back in time.
   * @param date Source date. If missing, the current date is used.
   * @returns a new {@link DateOffset}.
   */
  public static fromDays(days: number, date?: Date): DateOffset {
    return new DateOffset(days, date);
  }
}
