/**
 * Represents an alarm that executes something when the timer goes off.
 * The interface doesn't involve the code execution or the timer definition.
 * It exposes only methods and properties useful before or after the timer ends.
 * When the Alarm goes off, it can be stopped or snoozed by a specific amount of time (milliseconds).
 */
export interface IAlarm {
  /** `true` once the expiration date has passed. */
  readonly expired: boolean;
  /** `true` once the alarm has been stopped. */
  readonly stopped: boolean;
  /**
   * Postpones the alarm.
   * @param time Snooze time in milliseconds. If greater than the delta between
   * 'now' and the 'expiration', the delta is used instead.
   */
  snooze(time: number): void;
  /** Stops the alarm; it will not go off anymore. */
  stop(): void;
}
