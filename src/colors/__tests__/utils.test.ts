import { Dictionary } from "@/common";

import { RgbaColor, RgbColor } from "../types";
import {
  hexToRgba,
  rgbaToHex,
  rgbStringToRgb,
  shortHexToFullHex,
} from "../utils";

describe("colors", () => {
  describe("utils", () => {
    describe("hexToRgba", () => {
      it("Converts HEX to RGB", () => {
        const toTest: Dictionary<RgbaColor> = {
          "#d21": { r: 221, g: 34, b: 17, a: 1 },
          "#d2112a": { r: 210, g: 17, b: 42, a: 1 },
          "#d2112a99": { r: 210, g: 17, b: 42, a: 0.6 },
        };
        Object.keys(toTest).forEach((key) => {
          expect({ [key]: hexToRgba(key) }).toEqual({
            [key]: toTest[key],
          });
        });
      });
    });
    describe("rgbaToHex", () => {
      it("Converts RGBA values to an HEX string", () => {
        const toTest: Dictionary<RgbColor> = {
          "#d2112a": { r: 210, g: 17, b: 42 },
          "#d2112a99": { r: 210, g: 17, b: 42, a: 0.6 },
        };
        Object.keys(toTest).forEach((key) => {
          const { r, g, b, a } = toTest[key];
          expect(rgbaToHex(r, g, b, a)).toBe(key);
        });
      });
    });
    describe("rgbStringToRgb", () => {
      it("Converts a RGB string into a RgbColor object", () => {
        expect(rgbStringToRgb("rgb(9,19,109)")).toEqual({
          r: 9,
          g: 19,
          b: 109,
        });
      });
      it("Spaces are ignored", () => {
        expect(rgbStringToRgb("rgb( 9, 19 , 109 )")).toEqual({
          r: 9,
          g: 19,
          b: 109,
        });
      });
      it("Even RGBA are converted", () => {
        expect(rgbStringToRgb("rgba(9, 19, 109, 0.5)")).toEqual({
          r: 9,
          g: 19,
          b: 109,
          a: 0.5,
        });
      });
    });
    describe("shortHexToFullHex", () => {
      it("Converts a short HEX to the full version: #f8a > #ff88aa", () => {
        expect(shortHexToFullHex("#f80")).toBe("#ff8800");
      });
    });
  });
});
