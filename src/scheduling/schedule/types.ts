import { MonthWeekConditions, Months, WeekDays } from "@/calendar";
import { List } from "@/common";

//#region Common Schedule Types

/**
 * Repeat the schedule execution every X time, optionally for a limited amount of time.
 */
export type ScheduleRepeat = {
  /** Amount of time that has to elapse between one execution and the next. */
  every: ScheduleTime;
  /**
   * For how long the schedule keeps repeating, counted from its start.
   * When omitted, the schedule repeats indefinitely.
   */
  duration?: ScheduleTime;
};

/**
 * An amount of time expressed in hours and minutes.
 */
export type ScheduleTime = {
  /** Hours component of the amount of time. */
  hours: number;
  /** Minutes component of the amount of time. */
  minutes: number;
};

/**
 * Common shape shared by every schedule: when it starts, when it expires and
 * whether it repeats.
 */
export type Schedule = {
  /** Date and time the schedule becomes active. */
  startDate: Date;
  /** Date and time after which the schedule no longer runs. */
  expireDate?: Date;
  /** Repetition rule; when omitted, the schedule runs only once. */
  repeat?: ScheduleRepeat;
};

//#endregion

//#region Specific Schedules

/**
 * Execute the schedule once, at a specific date and time.
 */
export type OneTimeSchedule = Schedule;

/**
 * Execute the schedule every X days.
 */
export type DailySchedule = Schedule & {
  /** Number of days between one execution and the next. */
  every: number;
};

/**
 * Execute the schedule on specific week days.
 */
export type WeeklySchedule = Schedule & {
  /** The {@link WeekDays} on which the schedule is executed. */
  days: List<WeekDays>;
  /** Number of weeks between one execution and the next. */
  every: number;
};

/**
 * Execute the schedule on specific days of the month (e.g. the 5th), in specific months.
 */
export type MonthlyByDaySchedule = Schedule & {
  /** Days of the month on which the schedule is executed. */
  days: List<number>;
  /** Months in which the schedule is executed. */
  months: List<Months>;
};

/**
 * Execute the schedule on a specific day of the week within the month
 * (e.g. the first Monday), in specific months.
 */
export type MonthlyByWeeklyDaySchedule = Schedule & {
  /** Which occurrences within the month are targeted (e.g. first, last). */
  conditions: List<MonthWeekConditions>;
  /** Days of the week on which the schedule is executed. */
  weekDays: List<WeekDays>;
  /** Months in which the schedule is executed. */
  months: List<Months>;
};

//#endregion
