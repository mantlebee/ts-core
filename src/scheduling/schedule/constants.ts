/**
 * Recurrence kinds a schedule can have. Each value corresponds to one of the
 * `*Schedule` types (e.g. {@link DailySchedule}, {@link WeeklySchedule}).
 */
export enum ScheduleTypes {
  OneTime,
  Daily,
  Weekly,
  MonthlyByDays,
  MonthlyByWeekDays,
}
