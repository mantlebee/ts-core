import { IColor } from "./interfaces";
import { RgbaColor, WebColorName } from "./types";
import {
  hexToRgba,
  hslStringToRgba,
  rgbaToHex,
  rgbaToHsla,
  rgbStringToRgb,
  textToHsl,
  webColorNameToHex,
} from "./utils";

/**
 * Represents a color instance. It can be read in different formats. It manages transparency.
 * Exposes static methods to create an instance of Color from an existing string (hex, rgb, rgba)
 */
export class Color implements IColor {
  private color!: RgbaColor;

  public constructor(r: number, g: number, b: number, a = 1) {
    this.color = { a, b, g, r };
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
   * Creates a Color instance with high contrast.
   * Results could be "black" or "white".
   * @returns Black or White Color instance.
   */
  public contrast(): IColor {
    const { b, g, r } = this.color;
    const luminance = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5 ? new Color(0, 0, 0) : new Color(255, 255, 255);
  }

  /**
   * Prints the HEX string version of the color.
   * @returns an HEX color string.
   */
  public hex(): string {
    const { b, g, r } = this.color;
    let a = this.color.a != 1 ? this.color.a : undefined;
    return rgbaToHex(r, g, b, a);
  }
  /**
   * Prints the HSL string version of the color.
   * @returns an HSL color string.
   */
  public hsl(): string {
    const { b, g, r } = this.color;
    const { h, l, s } = rgbaToHsla(r, g, b);
    return `hsl(${h},${s}%,${l}%)`;
  }
  /**
   * Prints the HSLA string version of the color.
   * @returns an HSLA color string.
   */
  public hsla(): string {
    const { a, b, g, r } = this.color;
    const { h, l, s } = rgbaToHsla(r, g, b);
    return `hsla(${h},${s}%,${l}%,${a})`;
  }
  /**
   * Prints the RGB string version of the color.
   * @returns an RGB color string.
   */
  public rgb(): string {
    const { b, g, r } = this.color;
    return `rgb(${r},${g},${b})`;
  }
  /**
   * Prints the RGBA string version of the color.
   * @returns an RGBA color string.
   */
  public rgba(): string {
    const { a, b, g, r } = this.color;
    return `rgba(${r},${g},${b},${a})`;
  }

  /**
   * Creates a Color instance from an HEX color string.
   * @param hex HEX string.
   * @returns a Color instance from HEX string.
   */
  public static fromHex(hex: string): IColor {
    const { a, b, g, r } = hexToRgba(hex);
    return new Color(r, g, b, a);
  }
  /**
   * Creates a Color instance from an HSL color string.
   * @param hsl HSL string.
   * @returns a Color instance from HSL string.
   */
  public static fromHsl(hsl: string): IColor {
    const { a, b, g, r } = hslStringToRgba(hsl);
    return new Color(r, g, b, a);
  }
  /**
   * Creates a Color instance from an RGB(A) color string.
   * @param rgb RGB(A) string.
   * @returns a Color instance from RGB(A) string.
   */
  public static fromRgb(rgb: string): IColor {
    const { a, b, g, r } = rgbStringToRgb(rgb);
    return new Color(r, g, b, a);
  }
  /**
   * Creates a Color instance from a string.
   * @param text a string.
   * @returns a Color instance from a string.
   */
  public static fromText(text: string): IColor {
    const { h, l, s } = textToHsl(text);
    return Color.fromHsl(`hsl(${h},${s}%,${l}%)`);
  }
  /**
   * Creates a Color instance from a WEB color name.
   * @param webColorName WEB color name (eg. aliceblue)
   * @returns a Color instance from a WEB color name.
   */
  public static fromWebColorName(webColorName: WebColorName): IColor {
    const hex = webColorNameToHex(webColorName);
    return Color.fromHex(hex);
  }
}
