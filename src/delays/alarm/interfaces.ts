/**
 * Represents an alarm
 */
export interface IAlarm {
  readonly expired: boolean;
  readonly stopped: boolean;
  /**@param time Snooze time in milliseconds. If greater than the delta between 'now' and the 'expiration', the delta is used */
  snooze(time: number): void;
  stop(): void;
}
