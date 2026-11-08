import { JsonValue } from "../../types";
import { isJsonValue } from "../json";

class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}
}

describe("common", () => {
  describe("utils", () => {
    describe("json", () => {
      describe("isJsonValue", () => {
        it("Accepts strings, finite numbers, booleans and null", () => {
          expect(isJsonValue("")).toBeTruthy();
          expect(isJsonValue("text")).toBeTruthy();
          expect(isJsonValue(0)).toBeTruthy();
          expect(isJsonValue(-0)).toBeTruthy();
          expect(isJsonValue(1.5)).toBeTruthy();
          expect(isJsonValue(Number.MAX_VALUE)).toBeTruthy();
          expect(isJsonValue(true)).toBeTruthy();
          expect(isJsonValue(false)).toBeTruthy();
          expect(isJsonValue(null)).toBeTruthy();
        });
        it("Accepts lists and plain objects of JSON values, at any depth", () => {
          expect(isJsonValue([])).toBeTruthy();
          expect(isJsonValue({})).toBeTruthy();
          expect(isJsonValue(Object.create(null))).toBeTruthy();
          expect(
            isJsonValue({
              a: [1, "x", null, { b: true, c: [[], {}] }],
              d: { e: { f: "g" } },
            }),
          ).toBeTruthy();
        });
        it("Accepts the same object referenced twice without a cycle", () => {
          const shared = { a: 1 };
          expect(isJsonValue({ x: shared, y: shared })).toBeTruthy();
          expect(isJsonValue([shared, [shared]])).toBeTruthy();
        });
        it("Rejects undefined, also as property value or list item", () => {
          expect(isJsonValue(undefined)).toBeFalsy();
          expect(isJsonValue({ a: undefined })).toBeFalsy();
          expect(isJsonValue([1, undefined])).toBeFalsy();
          expect(isJsonValue({ a: { b: [undefined] } })).toBeFalsy();
        });
        it("Rejects the holes of sparse lists", () => {
          // eslint-disable-next-line no-sparse-arrays
          expect(isJsonValue([1, , 3])).toBeFalsy();
          expect(isJsonValue(new Array(2))).toBeFalsy();
        });
        it("Rejects functions, symbols and bigints", () => {
          expect(isJsonValue(() => 1)).toBeFalsy();
          expect(isJsonValue(Symbol("a"))).toBeFalsy();
          expect(isJsonValue(BigInt(1))).toBeFalsy();
          expect(isJsonValue({ a: () => 1 })).toBeFalsy();
          expect(isJsonValue([Symbol("a")])).toBeFalsy();
        });
        it("Rejects NaN and infinities", () => {
          expect(isJsonValue(NaN)).toBeFalsy();
          expect(isJsonValue(Infinity)).toBeFalsy();
          expect(isJsonValue(-Infinity)).toBeFalsy();
          expect(isJsonValue({ a: NaN })).toBeFalsy();
          expect(isJsonValue([1, Infinity])).toBeFalsy();
        });
        it("Rejects dates and other non-plain objects", () => {
          expect(isJsonValue(new Date())).toBeFalsy();
          expect(isJsonValue({ at: new Date() })).toBeFalsy();
          expect(isJsonValue(new Point(1, 2))).toBeFalsy();
          expect(isJsonValue(new Map())).toBeFalsy();
          expect(isJsonValue(new Set())).toBeFalsy();
          expect(isJsonValue(/a/)).toBeFalsy();
          expect(isJsonValue(new String("a"))).toBeFalsy();
          expect(isJsonValue(new Number(1))).toBeFalsy();
        });
        it("Rejects cycles", () => {
          const obj: Record<string, unknown> = { a: 1 };
          obj.self = obj;
          expect(isJsonValue(obj)).toBeFalsy();
          const list: unknown[] = [1];
          list.push(list);
          expect(isJsonValue(list)).toBeFalsy();
          const outer: Record<string, unknown> = {};
          outer.inner = { list: [outer] };
          expect(isJsonValue(outer)).toBeFalsy();
        });
        it("Narrows the type of the value", () => {
          const value: unknown = JSON.parse('{"a":[1]}');
          if (!isJsonValue(value)) throw new Error("Expected a JSON value");
          const json: JsonValue = value;
          expect(json).toEqual({ a: [1] });
        });
      });
    });
  });
});
