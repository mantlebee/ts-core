import { IAlarm } from "./interfaces";
import { AlarmDelegate } from "./types";
import { getExpirationDelta } from "./utils";

/** Longest delay `setTimeout` supports (2^31 - 1 ms, about 24.8 days). */
const MaxTimeoutDelay = 2147483647;

/**
 * Represents an alarm that executes code when the timer goes off.
 * It requires an expiration date and a delegate to execute when the expiration date is due.
 * When the Alarm goes off, it can be stopped or snoozed by a specific amount of time (milliseconds).
 */
export class Alarm implements IAlarm {
  private _stopped = false;
  private _timeout?: ReturnType<typeof setTimeout>;

  public constructor(
    private readonly expiration: Date,
    private readonly delegate: AlarmDelegate
  ) {
    this.schedule(this.delta);
  }

  public get expired(): boolean {
    return this.delta <= 0;
  }
  public get stopped(): boolean {
    return this._stopped;
  }

  public snooze(time: number): void {
    if (!this._stopped) {
      this.schedule(time);
    }
  }
  public stop(): void {
    this._stopped = true;
    this.unschedule();
  }

  private get delta(): number {
    return getExpirationDelta(this.expiration);
  }

  private alert(): void {
    if (this._stopped) return;
    this.delegate(this.stop.bind(this), this.snooze.bind(this));
  }
  /**
   * Schedules the alert after `delay` ms, replacing any pending one. Delays
   * longer than what `setTimeout` supports are split into consecutive timers.
   */
  private schedule(delay: number): void {
    this.unschedule();
    const fireAt = Date.now() + delay;
    const arm = (remaining: number) => {
      this._timeout = setTimeout(() => {
        const left = fireAt - Date.now();
        if (left > 0) arm(left);
        else this.alert();
      }, Math.min(remaining, MaxTimeoutDelay));
    };
    arm(delay);
  }
  private unschedule(): void {
    clearTimeout(this._timeout);
    this._timeout = undefined;
  }
}
