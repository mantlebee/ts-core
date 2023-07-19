import { MonthWeekConditions, Months, WeekDays } from "@/calendar";
import { List } from "@/common";

//#region Common Schedule Types

/**
 * Repeat the schedule execution every X time for an optional amount of time
 * @param every after how much time the schedule has to be executed
 * @param duration after how much time the schedule has to be executed
 */
export type ScheduleRepeat = {
  every: ScheduleTime;
  duration?: ScheduleTime;
};

export type ScheduleTime = { hours: number; minutes: number };

export type Schedule = {
  startDate: Date;
  expireDate?: Date;
  repeat?: ScheduleRepeat;
};

//#endregion

//#region Specific Schedules

/**
 * Execute the schedule once at a specific DateTime
 */
export type OneTimeSchedule = Schedule;

/**
 * Execute the schedule every X days
 * @param every days occur between an execution and the next one
 */
export type DailySchedule = Schedule & { every: number };

/**
 * Execute the schedule at specific weekly days
 * @param days the list of {@link WeekDays} on which execute the schedule
 * @param every weeks occur between an execution and the next one
 */
export type WeeklySchedule = Schedule & {
  days: List<WeekDays>;
  every: number;
};

/**
 * Execute the schedule on a specific day (number, eg: 5), every X months
 * @param days days of the month in which execute the schedule
 * @param months months in which execute the schedule
 */
export type MonthlyByDaySchedule = Schedule & {
  days: List<number>;
  months: List<Months>;
};

/**
 * Execute the schedule on a specific day of the week (eg: first monday), every X months
 * @param conditions list of specific weekly days of the month (eg: first, last)
 * @param weekDays days of the week in which execute the schedule
 * @param months months in which execute the schedule
 */
export type MonthlyByWeeklyDaySchedule = Schedule & {
  conditions: List<MonthWeekConditions>;
  weekDays: List<WeekDays>;
  months: List<Months>;
};

//#endregion
