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
   * Postpones the alarm: it goes off `time` milliseconds from now, replacing
   * any alert still pending. Does nothing once the alarm is stopped.
   * @param time Snooze time in milliseconds.
   */
  snooze(time: number): void;
  /** Stops the alarm; it will not go off anymore. */
  stop(): void;
}
