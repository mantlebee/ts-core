import { generateGuid, Nullable } from "@/common";

import { IIdentityManager } from "../interfaces";

/**
 * Used to generate GUID ids.
 */
export class GuidIdentityManager implements IIdentityManager<string> {
  private _lastValue: Nullable<string> = null;
  public get lastValue(): Nullable<string> {
    return this._lastValue;
  }
  public newValue(): string {
    const newValue = generateGuid();
    this._lastValue = newValue;
    return newValue;
  }
}
