import { KeyOf } from "@/common";

import { WebColorNamesHexMap } from "./constants";

export type HslaColor = { a: number; h: number; s: number; l: number };
export type HslColor = { a?: number; h: number; s: number; l: number };
export type RgbaColor = { a: number; b: number; g: number; r: number };
export type RgbColor = { a?: number; b: number; g: number; r: number };
export type WebColorName = KeyOf<typeof WebColorNamesHexMap>;
