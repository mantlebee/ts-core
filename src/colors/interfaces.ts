export interface IColor {
  readonly alpha: number;
  readonly blue: number;
  readonly green: number;
  readonly red: number;
  hex(): string;
  rgb(): string;
  rgba(): string;
}
