import { IEnablable } from "./interfaces";

/**
 * Minimal {@link IEnablable} implementation backed by a boolean flag.
 */
export class Enablable implements IEnablable {
  private _isEnabled: boolean;

  /**
   * @param isEnabled Initial state; disabled by default.
   */
  public constructor(isEnabled = false) {
    this._isEnabled = isEnabled;
  }

  /** `true` while enabled. */
  public get isEnabled(): boolean {
    return this._isEnabled;
  }

  /** Sets the state to disabled. */
  disable(): void {
    this._isEnabled = false;
  }
  /** Sets the state to enabled. */
  enable(): void {
    this._isEnabled = true;
  }
}
