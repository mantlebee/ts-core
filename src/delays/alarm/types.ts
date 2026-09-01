/**
 * Callback executed when an alarm goes off.
 * @param stop Call it to stop the alarm; it will not go off anymore.
 * @param snooze Call it to postpone the alarm by the given amount of milliseconds.
 */
export type AlarmDelegate = (
  stop: () => void,
  snooze: (time: number) => void
) => void;
