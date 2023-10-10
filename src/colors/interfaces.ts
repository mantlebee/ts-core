/**
 * Represents a color instance. It can be read in different formats. It manages transparency.
 */
export interface IColor {
  readonly alpha: number;
  readonly blue: number;
  readonly green: number;
  readonly red: number;
  hex(): string;
  rgb(): string;
  rgba(): string;
}
