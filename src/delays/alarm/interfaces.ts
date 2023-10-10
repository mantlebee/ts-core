/**
 * Represents an alarm that executes something when the timer goes off.
 * The interface doesn't involve the code execution or the timer definition.
 * It exposes only methods and properties useful before or after the timer ends.
 * When the Alarm goes off, it can be stopped or snoozed by a specific amount of time (milliseconds).
 */
export interface IAlarm {
  readonly expired: boolean;
  readonly stopped: boolean;
  /**@param time Snooze time in milliseconds. If greater than the delta between 'now' and the 'expiration', the delta is used */
  snooze(time: number): void;
  stop(): void;
}
