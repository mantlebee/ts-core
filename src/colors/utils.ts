import { KeyOf, List } from "..";
import { WebColorNamesHexMap } from "./constants";
import { IColor } from "./interfaces";
import { Color } from "./models";
import {
  HslaColor,
  HslColor,
  RgbaColor,
  RgbColor,
  WebColorName,
} from "./types";

/**
 * Tries to convert a string into an IColor instance.
 * If {@link value} is not a valid string, a black color is returned instead.
 * @param value string to convert into an IColor instance; accepted values are: HEX, HSL, RGB(A), Web Color Name.
 * @returns an IColor instance.
 */
export function getColor(value: string): IColor {
  if (value.startsWith("#")) return Color.fromHex(value);
  if (value.startsWith("hsl")) return Color.fromHsl(value);
  if (value.startsWith("rgb")) return Color.fromRgb(value);
  if (WebColorNamesHexMap[value as WebColorName])
    return Color.fromWebColorName(value as WebColorName);
  return new Color(0, 0, 0);
}

/**
 * Converts an HEX color to a RgbaColor object.
 * @example
 * ```ts
 * hexToRgba("#FF0000") // {a: 1, b: 0, g: 0, r: 255}
 * ```
 * @param hex HEX to convert to RGBA.
 * @returns RgbaColor.
 */
export function hexToRgba(hex: string): RgbaColor {
  // Converting short HEX to full HEX
  if (hex.length === 4) hex = shortHexToFullHex(hex);
  // Adding alpha if missing
  if (hex.length === 7) hex = `${hex}ff`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const a = parseInt(hex.slice(7, 9), 16) / 255;
  return { a, b, g, r };
}

/**
 * Converts an HSL string into an RgbaColor object. It works with HSLA strings too.
 * @param hsl HSL string to convert.
 * @returns an RgbaColor object.
 */
export function hslStringToRgba(hsl: string): RgbaColor {
  const [h, s, l, a = 1] = hsl.match(/\d+(\.\d+)?/g)!.map(Number);
  const c = (1 - Math.abs((2 * l) / 100 - 1)) * (s / 100);
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l / 100 - c / 2;
  const [r, g, b] =
    h < 60
      ? [c, x, 0]
      : h < 120
      ? [x, c, 0]
      : h < 180
      ? [0, c, x]
      : h < 240
      ? [0, x, c]
      : h < 300
      ? [x, 0, c]
      : [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a,
  };
}

/**
 * Converts RGBA values to an HEX string. If the alpha value is provided, the HEX result will contain the alpha channel: #rrggbbAA.
 * @example
 * ```ts
 * rgbaToHex(255, 0, 0) // "#FF0000"
 * ```
 * @param r Red value (0-255).
 * @param g Green value (0-255).
 * @param b Blue value (0-255).
 * @param a Alpha value (0-1). Default is 1.
 * @returns an HEX string of the RGBA values.
 */
export function rgbaToHex(r: number, g: number, b: number, a?: number): string {
  let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  if (a !== undefined) hex += ((a * 255) | (1 << 8)).toString(16).slice(1);
  return hex;
}

/**
 * Converts RGBA values to HSLA.
 * @param r Red value (0-255).
 * @param g Green value (0-255).
 * @param b Blue value (0-255).
 * @param a Alpha value (0-1). Default is 1.
 * @returns HSLA color.
 */
export function rgbaToHsla(r: number, g: number, b: number, a = 1): HslaColor {
  const [rNorm, gNorm, bNorm] = [r, g, b].map((v) => v / 255);
  const max = Math.max(rNorm, gNorm, bNorm),
    min = Math.min(rNorm, gNorm, bNorm);
  const l = (max + min) / 2;
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h =
    max === min
      ? 0
      : max === rNorm
      ? (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)
      : max === gNorm
      ? (bNorm - rNorm) / d + 2
      : (rNorm - gNorm) / d + 4;
  return {
    h: Math.round(h * 60),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a,
  };
}

/**
 * Converts a RGB string into an RgbColor object. It works with RGBA colors too.
 * Reference: https://www.geeksforgeeks.org/how-to-convert-rgb-color-string-into-an-object-in-javascript/.
 * @example
 * ```ts
 * rgbStringToRgb("rgb(255, 0, 0)") // {a: 1, b: 0, g: 0, r: 255}
 * ```
 * @param rgb RGB string to convert.
 * @returns an RgbColor object.
 */
export function rgbStringToRgb(rgb: string): RgbColor {
  const keys: List<KeyOf<RgbColor>> = ["r", "g", "b"];
  // Removing rgba, rgb, brackets and spaces and splitting by ","
  const values = rgb.replace(/(rgba|rgb|\(|\)| )/g, "").split(",");
  const color = keys.reduce((result, current, index) => {
    result[current] = parseInt(values[index]);
    return result;
  }, {} as RgbColor);
  // Adding alpha if present
  if (values.length === 4) color.a = parseFloat(values[3]);
  return color;
}

/**
 * Converts a short HEX to the full version (eg. #f8a > #ff88aa).
 * @example
 * ```ts
 * shortHexToFullHex("#F00") // "#FF0000"
 * ```
 * @param shortHex Short HEX (eg. #f8a).
 * @returns a full HEX (eg.  #ff88aa).
 */
export function shortHexToFullHex(shortHex: string): string {
  const r = shortHex.slice(1, 2);
  const g = shortHex.slice(2, 3);
  const b = shortHex.slice(3, 4);
  return `#${r}${r}${g}${g}${b}${b}`;
}

/**
 * Converts a text to an HSL color.
 * @example
 * ```ts
 * textToHsl("Hello, World!") // ""
 * ```
 * @param text text to convert into HSL color.
 * @param lightness lightness value of the HSL color (default: 50).
 * @param saturation saturation value of the HSL color (default: 50).
 * @returns
 */
export function textToHsl(
  text: string,
  lightness = 50,
  saturation = 50
): HslColor {
  let hash = 0;
  for (var i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return { h, l: lightness, s: saturation };
}

/**
 * Converts the WEB color name into an HEX string. (eg. aliceblue > #f0f8ff)
 * @example
 * ```ts
 * webColorNameToHex("aliceblue") // "#f0f8ff"
 * ```
 * @param webColorName WEB color name (eg. aliceblue)
 * @returns a full HEX string (eg. #f0f8ff)
 */
export function webColorNameToHex(webColorName: WebColorName): string {
  return WebColorNamesHexMap[webColorName];
}
