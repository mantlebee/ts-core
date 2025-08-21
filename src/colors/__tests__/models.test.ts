import { Color } from "../models";

describe("colors", () => {
  describe("models", () => {
    describe("Color", () => {
      describe("getters", () => {
        it("Getters are equal to the constructor params", () => {
          const color = new Color(240, 100, 20, 0.5);
          expect(color.alpha).toBe(0.5);
          expect(color.blue).toBe(20);
          expect(color.green).toBe(100);
          expect(color.red).toBe(240);
        });
        it("Alpha is 1 if not passed to the constructor", () => {
          const color = new Color(240, 100, 20);
          expect(color.alpha).toBe(1);
        });
      });
      describe("To string methods", () => {
        it("Method hex generates an HEX string", () => {
          const color = new Color(240, 100, 20, 0.6);
          expect(color.hex()).toBe("#f0641499");
        });
        it("Method hex generates an HEX string, alpha is included only if different from 1", () => {
          const color = new Color(240, 100, 20);
          expect(color.hex()).toBe("#f06414");
        });
        it("Method hsl generates an HSL string", () => {
          const color = new Color(200, 200, 20, 0.2);
          expect(color.hsl()).toBe("hsl(60,82%,43%)");
        });
        it("Method hsla generates an HSLA string", () => {
          const color = new Color(200, 200, 20, 0.2);
          expect(color.hsla()).toBe("hsla(60,82%,43%,0.2)");
        });
        it("Method rgb generates an RGB string, alpha is ignored", () => {
          const color = new Color(240, 100, 20, 0.5);
          expect(color.rgb()).toBe("rgb(240,100,20)");
        });
        it("Method rgba generates an RGBA string", () => {
          const color = new Color(240, 100, 20, 0.5);
          expect(color.rgba()).toBe("rgba(240,100,20,0.5)");
        });
      });
      describe("Extra methods", () => {
        it("Method contrast returns black or white, based on current color", () => {
          expect(Color.fromHex("#0088ff").contrast().hex()).toBe("#ffffff");
          expect(Color.fromHex("#0088ff").contrast(0.6).hex()).toBe("#000000");
          expect(Color.fromHex("#ff8800").contrast().hex()).toBe("#000000");
          expect(Color.fromHex("#ff8800").contrast(0.3).hex()).toBe("#ffffff");
        });
      });
      describe("Static constructors", () => {
        it("From HEX string", () => {
          const value = "#ff000088";
          expect(Color.fromHex(value).hex()).toBe(value);
        });
        it("From HSL string", () => {
          const value = "hsl(60,82%,43%)";
          expect(Color.fromHsl(value).hsl()).toBe(value);
        });
        it("From HSLA string", () => {
          const value = "hsla(60,82%,43%,0.2)";
          expect(Color.fromHsl(value).hsla()).toBe(value);
        });
        it("From RGB string", () => {
          const value = "rgb(200,120,80)";
          expect(Color.fromRgb(value).rgb()).toBe(value);
        });
        it("From RGBA string", () => {
          const value = "rgba(200,120,80,0.2)";
          expect(Color.fromRgb(value).rgba()).toBe(value);
        });
        it("From text", () => {
          expect(Color.fromText("Hello, World!").hex()).toBe("#57bf40");
        });
        it("From WEB color name", () => {
          expect(Color.fromWebColorName("aliceblue").hex()).toBe("#f0f8ff");
        });
      });
    });
  });
});
