import { Nullable } from "@/common";

import { IDebouncedDelegate } from "./interfaces";

/**
 * Prevents multiple and repetitive executions of a function, in a specific time range.
 * Delays the execution of a {@link _delegate}, if the {@link call} method is called multiple times in a time range ({@link _delay}).
 */
export class DebouncedDelegate implements IDebouncedDelegate {
  /** Milliseconds after which the {@link _delegate} must be executed. */
  private readonly _delay!: number;
  /** Function to execute. */
  private readonly _delegate!: () => void;
  /**
   * Timeout that is set and reset every time the {@link call} method is called.
   * After its expiring, the {@link _delegate} is executed.
   */
  private _timeout: Nullable<number> = null;
  /**
   * @param delegate {@link delegate}
   * @param delay {@link delay}
   */
  public constructor(delegate: () => void, delay: number) {
    this._delay = delay;
    this._delegate = delegate;
  }
  /**
   * Reset the timeout any time the method is run.
   * When the timeout expires the {@link _delegate} is executed.
   */
  public call(): void {
    this.clearTimeout();
    this._timeout = window.setTimeout(() => {
      this.clearTimeout();
      this._delegate();
    }, this._delay);
  }
  /**
   * Stops and clears the {@link _timeout}.
   */
  private clearTimeout(): void {
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  }
}
