/**
 * Which occurrence of a week day within a month is targeted.
 * `last` is `-1` so it can be told apart from the positional values.
 */
export enum MonthWeekConditions {
  first = 1,
  second,
  third,
  fourth,
  last = -1,
}

/**
 * Months of the year, 1-based (`january` = 1 ... `december` = 12).
 */
export enum Months {
  january = 1,
  february,
  march,
  april,
  may,
  june,
  july,
  august,
  september,
  october,
  november,
  december,
}

/**
 * Days of the month, 1-based (`first` = 1 ... `thirtyFirst` = 31).
 * `last` is `-1` so it can be told apart from the positional values.
 */
export enum MonthDays {
  first = 1,
  second,
  third,
  fourth,
  fifth,
  sixth,
  seventh,
  eighth,
  ninth,
  tenth,
  eleventh,
  twelfth,
  thirteenth,
  fourteenth,
  fifteenth,
  sixteenth,
  seventeenth,
  eighteenth,
  nineteenth,
  twentieth,
  twentyFirst,
  twentySecond,
  twentyThird,
  twentyFourth,
  twentyFifth,
  twentySixth,
  twentySeventh,
  twentyEighth,
  twentyNinth,
  thirtieth,
  thirtyFirst,
  last = -1,
}

/**
 * Days of the week, 1-based (`monday` = 1 ... `sunday` = 7).
 */
export enum WeekDays {
  monday = 1,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
}
