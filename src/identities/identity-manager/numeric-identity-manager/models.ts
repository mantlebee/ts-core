import { Nullable } from "@/common";

import { IIdentityManager } from "../interfaces";

/**
 * Used to generate numeric ids. Only positive and integer values.
 */
export class NumericIdentityManager implements IIdentityManager<number> {
  private _lastValue: Nullable<number> = null;
  /**
   * Last value is used as starting index. If lastValue is less than 0, 0 is used instead.
   * @param lastValue Starting value, newValue will return lastValue + 1
   */
  public constructor(lastValue?: number) {
    if (lastValue && lastValue > 0) this._lastValue = lastValue;
  }
  /** The last generated number, or `null` when none has been generated yet. */
  public get lastValue(): Nullable<number> {
    return this._lastValue;
  }
  /**
   * Returns {@link lastValue} + 1 (starting from 1) and records it as the new last value.
   * @returns the newly generated number.
   */
  public newValue(): number {
    const newValue = (this.lastValue || 0) + 1;
    this._lastValue = newValue;
    return newValue;
  }
}
