import { IEnablable } from "./interfaces";

export class Enablable implements IEnablable {
  private _isEnabled: boolean;

  public constructor(isEnabled = false) {
    this._isEnabled = isEnabled;
  }

  public get isEnabled(): boolean {
    return this._isEnabled;
  }

  disable(): void {
    this._isEnabled = false;
  }
  enable(): void {
    this._isEnabled = true;
  }
}
