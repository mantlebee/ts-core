import { generateGuid, Nullable } from "@/common";

import { IIdentityManager } from "../interfaces";

/**
 * Used to generate GUID ids.
 */
export class GuidIdentityManager implements IIdentityManager<string> {
  private _lastValue: Nullable<string> = null;
  /** The last generated GUID, or `null` when none has been generated yet. */
  public get lastValue(): Nullable<string> {
    return this._lastValue;
  }
  /**
   * Generates a new GUID and records it as {@link lastValue}.
   * @returns the newly generated GUID.
   */
  public newValue(): string {
    const newValue = generateGuid();
    this._lastValue = newValue;
    return newValue;
  }
}
