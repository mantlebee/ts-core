import { Dictionary } from "@/common";

import { RgbaColor, RgbColor } from "../types";
import { hexToRgba, rgbaToHex, shortHexToFullHex } from "../utils";

describe("colors", () => {
  describe("utils", () => {
    describe("hexToRgba", () => {
      it("Converts HEX to RGB", () => {
        const toTest: Dictionary<RgbaColor> = {
          // Red
          "#f00": { r: 255, g: 0, b: 0, a: 1 },
          "#ff0000": { r: 255, g: 0, b: 0, a: 1 },
          "#ff000099": { r: 255, g: 0, b: 0, a: 0.6 },
          // Green
          "#0f0": { r: 0, g: 255, b: 0, a: 1 },
          "#00ff00": { r: 0, g: 255, b: 0, a: 1 },
          "#00ff0099": { r: 0, g: 255, b: 0, a: 0.6 },
          // Blue
          "#00f": { r: 0, g: 0, b: 255, a: 1 },
          "#0000ff": { r: 0, g: 0, b: 255, a: 1 },
          "#0000ff99": { r: 0, g: 0, b: 255, a: 0.6 },
          // Other color
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
          // Red
          "#ff0000": { r: 255, g: 0, b: 0 },
          "#ff000099": { r: 255, g: 0, b: 0, a: 0.6 },
          // Green
          "#00ff00": { r: 0, g: 255, b: 0 },
          "#00ff0099": { r: 0, g: 255, b: 0, a: 0.6 },
          // Blue
          "#0000ff": { r: 0, g: 0, b: 255 },
          "#0000ff99": { r: 0, g: 0, b: 255, a: 0.6 },
          // Other color
          "#d2112a": { r: 210, g: 17, b: 42 },
          "#d2112a99": { r: 210, g: 17, b: 42, a: 0.6 },
        };
        Object.keys(toTest).forEach((key) => {
          const { r, g, b, a } = toTest[key];
          expect(rgbaToHex(r, g, b, a)).toBe(key);
        });
      });
    });
    describe("shortHexToFullHex", () => {
      it("Converts a short HEX to the full version: #f8a > #ff88aa", () => {
        const toTest: Dictionary<string> = {
          "#f80": "#ff8800",
          "#000": "#000000",
          "#fff": "#ffffff",
          "#52a": "#5522aa",
        };
        Object.keys(toTest).forEach((key) => {
          expect(shortHexToFullHex(key)).toBe(toTest[key]);
        });
      });
    });
  });
});
