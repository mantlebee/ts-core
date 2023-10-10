import { IColor } from "./interfaces";
import { RgbaColor } from "./types";
import { hexToRgba, rgbaToHex, rgbStringToRgb } from "./utils";

/**
 * Represents a color instance. It can be read in different formats. It manages transparency.
 * Exposes static methods to create an instance of Color from an existing string (hex, rgb, rgba)
 */
export class Color implements IColor {
  private color!: RgbaColor;

  public constructor(r: number, g: number, b: number, a = 1) {
    this.color = { r, g, b, a };
  }

  public get alpha(): number {
    return this.color.a;
  }
  public get blue(): number {
    return this.color.b;
  }
  public get green(): number {
    return this.color.g;
  }
  public get red(): number {
    return this.color.r;
  }

  /**
   * Prints the HEX string version of the color.
   * @returns an HEX color string.
   */
  public hex(): string {
    const { r, g, b } = this.color;
    let a = this.color.a != 1 ? this.color.a : undefined;
    return rgbaToHex(r, g, b, a);
  }
  /**
   * Prints the RGB string version of the color.
   * @returns an RGB color string.
   */
  public rgb(): string {
    const { r, g, b } = this.color;
    return `rgb(${r},${g},${b})`;
  }
  /**
   * Prints the RGBA string version of the color.
   * @returns an RGBA color string.
   */
  public rgba(): string {
    const { r, g, b, a } = this.color;
    return `rgba(${r},${g},${b},${a})`;
  }

  /**
   * Creates a Color instance from an HEX color string.
   * @param hex HEX string.
   * @returns a Color instance from HEX string.
   */
  public static fromHex(hex: string): IColor {
    const { r, g, b, a } = hexToRgba(hex);
    return new Color(r, g, b, a);
  }
  /**
   * Creates a Color instance from an RGB(A) color string.
   * @param rgb RGB(A) string.
   * @returns a Color instance from RGB(A) string.
   */
  public static fromRgb(rgb: string): IColor {
    const { r, g, b, a } = rgbStringToRgb(rgb);
    return new Color(r, g, b, a);
  }
}
