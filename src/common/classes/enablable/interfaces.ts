/**
 * Represents any class that can be enabled or disabled.
 */
export interface IEnablable {
  readonly isEnabled: boolean;
  disable(): void;
  enable(): void;
}
