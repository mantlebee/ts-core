/**
 * Represents a color instance. It can be read in different formats. It manages transparency.
 */
export interface IColor {
  readonly alpha: number;
  readonly blue: number;
  readonly green: number;
  readonly red: number;
  /**
   * Returns a IColor instance of value black or white,
   * based on the current color value.
   * @param threshold luminance threshold; returns black if current luminance is lower than the thershold, white otherwise.
   */
  contrast(threshold?: number): IColor;
  hex(): string;
  hsl(): string;
  hsla(): string;
  rgb(): string;
  rgba(): string;
}
