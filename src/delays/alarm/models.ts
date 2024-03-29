import { IAlarm } from "./interfaces";
import { AlarmDelegate } from "./types";
import { getExpirationDelta } from "./utils";

/**
 * Represents an alarm that executes code when the timer goes off.
 * It requires an expiration date and a delegate to execute when the expiration date is due.
 * When the Alarm goes off, it can be stopped or snoozed by a specific amount of time (milliseconds).
 */
export class Alarm implements IAlarm {
  private _stopped = false;
  private _timeout?: number;

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
    this.delegate(this.stop.bind(this), this.snooze.bind(this));
  }
  private schedule(delta: number): void {
    this._timeout = setTimeout(
      this.alert.bind(this),
      delta
    ) as unknown as number;
  }
  private unschedule(): void {
    clearTimeout(this._timeout);
    this._timeout = undefined;
  }
}
