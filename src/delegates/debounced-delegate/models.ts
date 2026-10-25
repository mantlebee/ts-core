import { List, Nullable } from "@/common";

import { IDebouncedDelegate } from "./interfaces";

/**
 * Prevents multiple and repetitive executions of a function, in a specific time range.
 * Delays the execution of the delegate while the {@link call} method keeps being
 * called within the configured time range. A scheduled execution can be
 * cancelled with {@link abort}.
 */
export class DebouncedDelegate implements IDebouncedDelegate {
  /** Milliseconds of quiet time to wait before the delegate is executed. */
  private readonly _delay!: number;
  /** Function to execute. */
  private readonly _delegate!: (...args: List<unknown>) => void;
  /**
   * Timeout that is set and reset every time the {@link call} method is called.
   * When it expires, the delegate is executed. Typed after the global
   * `setTimeout`, so the class works in browsers, Node and jsdom alike.
   */
  private _timeout: Nullable<ReturnType<typeof setTimeout>> = null;
  /**
   * @param delegate Function to execute once the calls stop.
   * @param delay Milliseconds of quiet time to wait before executing.
   */
  public constructor(delegate: (...args: List<unknown>) => void, delay: number) {
    this._delay = delay;
    this._delegate = delegate;
  }
  public get isPending(): boolean {
    return this._timeout !== null;
  }
  /**
   * Cancels the pending execution, if any. The arguments of the cancelled
   * call are discarded; a following {@link call} starts a new wait.
   */
  public abort(): void {
    this.clearTimeout();
  }
  /**
   * Resets the timeout every time the method is run.
   * When the timeout expires the delegate is executed.
   */
  public call(...args: List<unknown>): void {
    this.clearTimeout();
    this._timeout = setTimeout(() => {
      this.clearTimeout();
      this._delegate(...args);
    }, this._delay);
  }
  /**
   * Stops and clears the pending timeout, if any.
   */
  private clearTimeout(): void {
    if (this._timeout !== null) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  }
}
