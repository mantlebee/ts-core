/**@param delta Milliseconds between expiration and now. Negative if expiration is in the past. */
export type AlarmDelegate = (
  stop: () => void,
  snooze: (time: number) => void
) => void;
