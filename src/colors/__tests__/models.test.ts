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
        it("Method rgb generates an RGB string, alpha is ignored", () => {
          const color = new Color(240, 100, 20, 0.5);
          expect(color.rgb()).toBe("rgb(240,100,20)");
        });
        it("Method rgba generates an RGBA string", () => {
          const color = new Color(240, 100, 20, 0.5);
          expect(color.rgba()).toBe("rgba(240,100,20,0.5)");
        });
      });
    });
  });
});
