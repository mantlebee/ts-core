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
  public get lastValue(): Nullable<number> {
    return this._lastValue;
  }
  public newValue(): number {
    const newValue = (this.lastValue || 0) + 1;
    this._lastValue = newValue;
    return newValue;
  }
}
