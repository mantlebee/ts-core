import { roundNumber } from "..";
import { RgbaColor } from "./types";

/**
 * Converts an HEX color to a RgbaColor object.
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
  const a = roundNumber(parseInt(hex.slice(7, 9), 16) / 255, 2);
  return { a, b, g, r };
}

/**
 * Converts RGBA values to an HEX string. If the alpha value is provided, the HEX result will contain the alpha channel: #rrggbbAA.
 * @param r Red value (0-255).
 * @param g Green value (0-255).
 * @param b Blue value (0-255).
 * @param a Alpha value (0-1). Default is 1.
 * @returns an HEX string of the RGBA values.
 */
export function rgbaToHex(r: number, g: number, b: number, a?: number) {
  let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  if (a !== undefined) hex += ((a * 255) | (1 << 8)).toString(16).slice(1);
  return hex;
}

/**
 * Converts a short HEX to the full version: #f8a > #ff88aa.
 * @param shortHex Short HEX: #f8a.
 * @returns a full HEX: #ff88aa.
 */
export function shortHexToFullHex(shortHex: string): string {
  const r = shortHex.slice(1, 2);
  const g = shortHex.slice(2, 3);
  const b = shortHex.slice(3, 4);
  return `#${r}${r}${g}${g}${b}${b}`;
}
