/**
 * Represents any class that can be enabled or disabled.
 */
export interface IEnablable {
  /** `true` while enabled. */
  readonly isEnabled: boolean;
  /** Sets the state to disabled. */
  disable(): void;
  /** Sets the state to enabled. */
  enable(): void;
}
