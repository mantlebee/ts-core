import { IColor } from "./interfaces";
import { RgbaColor } from "./types";
import { hexToRgba, rgbaToHex, rgbStringToRgb } from "./utils";

export class Color implements IColor {
  private color!: RgbaColor;

  public constructor(r: number, g: number, b: number, a = 1) {
    this.color = { r, g, b, a };
  }

  public get alpha(): number {
    return this.color.a;
  }
  public get blue(): number {
    return this.color.b;
  }
  public get green(): number {
    return this.color.g;
  }
  public get red(): number {
    return this.color.r;
  }

  public hex(): string {
    const { r, g, b } = this.color;
    let a = this.color.a != 1 ? this.color.a : undefined;
    return rgbaToHex(r, g, b, a);
  }
  public rgb(): string {
    const { r, g, b } = this.color;
    return `rgb(${r},${g},${b})`;
  }
  public rgba(): string {
    const { r, g, b, a } = this.color;
    return `rgba(${r},${g},${b},${a})`;
  }

  public static fromHex(hex: string): IColor {
    const { r, g, b, a } = hexToRgba(hex);
    return new Color(r, g, b, a);
  }
  public static fromRgb(rgb: string): IColor {
    const { r, g, b, a } = rgbStringToRgb(rgb);
    return new Color(r, g, b, a);
  }
}
