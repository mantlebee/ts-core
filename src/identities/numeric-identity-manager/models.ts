import { IIdentityManager } from "../interfaces";

/**
 * Used to generate numeric ids. Only positive and integer values.
 */
export class NumericIdentityManager implements IIdentityManager<number> {
  private _lastValue!: number;
  /**
   * Last value is used as starting index. If lastValue is less than 0, 0 is used instead.
   * @param lastValue Starting value, newValue will return lastValue + 1
   */
  public constructor(lastValue: number = 0) {
    this._lastValue = lastValue >= 0 ? lastValue : 0;
  }
  public get lastValue(): number {
    return this._lastValue;
  }
  public newValue(): number {
    this._lastValue++;
    return this._lastValue;
  }
}
