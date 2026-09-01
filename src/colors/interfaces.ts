/**
 * Represents a color instance. It can be read in different formats. It manages transparency.
 */
export interface IColor {
  /** Alpha (opacity) channel, from 0 (transparent) to 1 (opaque). */
  readonly alpha: number;
  /** Blue channel, from 0 to 255. */
  readonly blue: number;
  /** Green channel, from 0 to 255. */
  readonly green: number;
  /** Red channel, from 0 to 255. */
  readonly red: number;
  /**
   * Returns a IColor instance of value black or white,
   * based on the current color value.
   * @param threshold Luminance threshold; returns black if the current luminance is lower than the threshold, white otherwise.
   * @returns a black or white IColor instance.
   */
  contrast(threshold?: number): IColor;
  /** @returns the HEX string representation of the color. */
  hex(): string;
  /** @returns the HSL string representation of the color. */
  hsl(): string;
  /** @returns the HSLA string representation of the color. */
  hsla(): string;
  /** @returns the RGB string representation of the color. */
  rgb(): string;
  /** @returns the RGBA string representation of the color. */
  rgba(): string;
}
