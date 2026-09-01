import { KeyOf } from "@/common";

import { WebColorNamesHexMap } from "./constants";

/**
 * HSL color with a required alpha channel.
 * `h` is in degrees (0-360), `s` and `l` are percentages (0-100), `a` is 0-1.
 */
export type HslaColor = { a: number; h: number; s: number; l: number };
/**
 * HSL color with an optional alpha channel.
 * `h` is in degrees (0-360), `s` and `l` are percentages (0-100), `a` is 0-1.
 */
export type HslColor = { a?: number; h: number; s: number; l: number };
/**
 * RGB color with a required alpha channel. `r`, `g`, `b` are 0-255, `a` is 0-1.
 */
export type RgbaColor = { a: number; b: number; g: number; r: number };
/**
 * RGB color with an optional alpha channel. `r`, `g`, `b` are 0-255, `a` is 0-1.
 */
export type RgbColor = { a?: number; b: number; g: number; r: number };
/**
 * Union of every valid CSS/Web color name (the keys of {@link WebColorNamesHexMap}).
 */
export type WebColorName = KeyOf<typeof WebColorNamesHexMap>;
