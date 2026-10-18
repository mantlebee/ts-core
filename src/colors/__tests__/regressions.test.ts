import { WebColorNamesHexMap } from "../constants";
import { Color } from "../models";
import { getColor, rgbaToHsla, textToHsl, webColorNameToHex } from "../utils";

describe("colors", () => {
  describe("regressions", () => {
    it("grays have 0 saturation instead of NaN", () => {
      expect(rgbaToHsla(0, 0, 0)).toEqual({ h: 0, s: 0, l: 0, a: 1 });
      expect(rgbaToHsla(255, 255, 255)).toEqual({ h: 0, s: 0, l: 100, a: 1 });
      expect(new Color(0, 0, 0).hsl()).toBe("hsl(0,0%,0%)");
      expect(new Color(255, 255, 255).hsla()).toBe("hsla(0,0%,100%,1)");
    });
    it("every web color name is a trimmed, lowercase CSS name", () => {
      Object.keys(WebColorNamesHexMap).forEach((name) =>
        expect(name).toMatch(/^[a-z]+$/)
      );
    });
    it("'indianred' is resolved", () => {
      expect(getColor("indianred").hex()).toBe("#cd5c5c");
    });
    it("uses the CSS values of 'mediumpurple' and 'palevioletred'", () => {
      expect(webColorNameToHex("mediumpurple")).toBe("#9370db");
      expect(webColorNameToHex("palevioletred")).toBe("#db7093");
    });
    it("includes the CSS names that were missing", () => {
      expect(webColorNameToHex("rebeccapurple")).toBe("#663399");
      expect(webColorNameToHex("grey")).toBe("#808080");
      expect(webColorNameToHex("darkgrey")).toBe("#a9a9a9");
      expect(webColorNameToHex("lightgray")).toBe("#d3d3d3");
    });
    it("'textToHsl' always returns a hue between 0 and 359", () => {
      ["zzzzzzzz", "Hello, World!", "", "a", "ñ€😀", "x".repeat(200)].forEach(
        (text) => {
          const { h } = textToHsl(text);
          expect(h).toBeGreaterThanOrEqual(0);
          expect(h).toBeLessThan(360);
        }
      );
    });
  });
});
