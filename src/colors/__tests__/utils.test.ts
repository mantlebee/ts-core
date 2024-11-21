import { Dictionary } from "@/common";

import { RgbaColor, RgbColor } from "../types";
import {
  hexToRgba,
  hslStringToRgba,
  rgbaToHex,
  rgbaToHsla,
  rgbStringToRgb,
  shortHexToFullHex,
  textToHsl,
  webColorNameToHex,
} from "../utils";

describe("colors", () => {
  describe("utils", () => {
    describe("hslStringToRgba", () => {
      it("Converts HSL to RGBA", () => {
        const toTest: Dictionary<RgbaColor> = {
          "hsl(60, 81.82%, 43.14%)": { r: 200, g: 200, b: 20, a: 1 },
          "hsl(60, 81.82%, 43.14%, 0.2)": { r: 200, g: 200, b: 20, a: 0.2 },
        };
        Object.keys(toTest).forEach((key) => {
          expect({ [key]: hslStringToRgba(key) }).toEqual({
            [key]: toTest[key],
          });
        });
      });
    });
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
    describe("rgbaToHsla", () => {
      it("Converts RGBA to HSLA", () => {
        expect(rgbaToHsla(200, 200, 20, 0.2)).toEqual({
          h: 60,
          s: 82,
          l: 43,
          a: 0.2,
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
    describe("textToHsl", () => {
      it("Converts a text to an HSL color: #Hello, World! > #ff88aa", () => {
        expect(textToHsl("Hello, World!")).toEqual({ h: 109, l: 50, s: 50 });
      });
    });
    describe("webColorNameToHex", () => {
      it("Converts the WEB color name into an HEX string: aliceblue > #f0f8ff", () => {
        expect(webColorNameToHex("aliceblue")).toBe("#f0f8ff");
      });
    });
  });
});
