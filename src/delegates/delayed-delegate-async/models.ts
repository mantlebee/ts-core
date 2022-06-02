import { Delegate, Nullable } from "@/common";

import { IDelegate } from "../interfaces";

/**
 * Prevents multiple and repetitive executions of a function.
 * Delays the execution of an async {@link delegate}, if the {@link call} method is called multiple times in a time range ({@link delay}).
 */
export class DelayedDelegateAsync<TResult = void>
  implements IDelegate<Promise<TResult>> {
  /** Milliseconds after which the {@link delegate} must be executed. */
  private readonly delay!: number;
  /** Async function to execute. */
  private readonly delegate!: Delegate<Promise<TResult>>;
  /**
   * Timeout that is set and reset every time the {@link call} method is called.
   * After its expiring, the {@link delegate} is executed.
   */
  private timeout: Nullable<number> = null;
  /**
   * @param delegate {@link delegate}
   * @param delay {@link delay}
   */
  public constructor(delegate: Delegate<Promise<TResult>>, delay: number) {
    this.delay = delay;
    this.delegate = delegate;
  }
  /**
   * Returns a promise in which {@link timeout} is reset and started.
   * When the timeout expires the async {@link delegate} is executed and its result is used to resolve the promise.
   * @returns a promise which is resolved after a timeout.
   */
  public call() {
    return new Promise<TResult>((resolve) => {
      this.clearTimeout();
      this.timeout = window.setTimeout(() => {
        this.clearTimeout();
        this.delegate().then(resolve);
      }, this.delay);
    });
  }
  /**
   * Stops and clears the {@link timeout}.
   */
  private clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
}
