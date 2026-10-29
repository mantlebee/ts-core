/** @jest-environment node */
import {
  BadRequestException,
  createHttpGetQuery,
  createHttpPostBody,
  getResponseContentType,
  getResponseFilename,
  HttpSearchParams,
} from "../requestors";
import { createHttpRelativePath } from "../utils";

describe("http", () => {
  describe("utils", () => {
    describe("createHttpRelativePath", () => {
      it("Joins strings with the '/' symbol", () => {
        expect(createHttpRelativePath("abc", "def", "ghi")).toBe("abc/def/ghi");
      });
      it("Ignores empty segments", () => {
        expect(createHttpRelativePath("abc", undefined, "", "ghi")).toBe(
          "abc/ghi"
        );
      });
      it("Removes unnecessary slashes", () => {
        expect(createHttpRelativePath("abc/", "/def/", "/ghi/")).toBe(
          "abc/def/ghi"
        );
      });
      it("Preserves the leading slash", () => {
        expect(createHttpRelativePath("/abc/", "/def/", "/ghi/")).toBe(
          "/abc/def/ghi"
        );
      });
    });
    describe("createHttpGetQuery", () => {
      it("Encodes the parameters, skipping null and undefined", () => {
        expect(
          createHttpGetQuery({ page: 1, q: "a b", empty: null, missing: undefined })
        ).toBe("page=1&q=a+b");
      });
      it("Serializes every primitive with String()", () => {
        expect(createHttpGetQuery({ s: "x", n: 0, b: false })).toBe(
          "s=x&n=0&b=false"
        );
      });
      it("Serializes dates as ISO 8601 strings, also inside lists", () => {
        const from = new Date(Date.UTC(2026, 0, 1));
        const to = new Date(Date.UTC(2026, 0, 2, 12, 30));
        expect(createHttpGetQuery({ from, days: [from, to] })).toBe(
          "from=2026-01-01T00%3A00%3A00.000Z" +
            "&days=2026-01-01T00%3A00%3A00.000Z&days=2026-01-02T12%3A30%3A00.000Z"
        );
      });
      it("Sends lists as repeated keys, skipping null and undefined items", () => {
        expect(
          createHttpGetQuery({ ids: [1, null, 2, undefined], tags: ["a b"] })
        ).toBe("ids=1&ids=2&tags=a+b");
        expect(createHttpGetQuery({ ids: [] })).toBe("");
      });
      it("Rejects objects, nested lists and invalid dates with BadRequestException", () => {
        const params = (value: unknown) => ({ a: value }) as HttpSearchParams;
        expect(() => createHttpGetQuery(params({ x: 1 }))).toThrow(
          BadRequestException
        );
        expect(() => createHttpGetQuery(params([[1]]))).toThrow(
          BadRequestException
        );
        expect(() => createHttpGetQuery(params(new Date("nope")))).toThrow(
          BadRequestException
        );
        expect(() => createHttpGetQuery(params({ x: 1 }))).toThrow('"a"');
      });
    });
    describe("createHttpPostBody", () => {
      it("Serializes objects as JSON, but keeps URLSearchParams", () => {
        expect(createHttpPostBody({ a: 1 })).toBe('{"a":1}');
        const params = new URLSearchParams({ a: "1" });
        expect(createHttpPostBody(params)).toBe(params);
      });
    });
    describe("getResponseContentType", () => {
      it("Returns the Content-Type header, or null", () => {
        const headers = { "Content-Type": "application/pdf" };
        expect(getResponseContentType(new Response("", { headers }))).toBe(
          "application/pdf"
        );
        expect(getResponseContentType(new Response(null))).toBeNull();
      });
    });
    describe("getResponseFilename", () => {
      it("Returns the filename of the Content-Disposition header, or an empty string", () => {
        const headers = {
          "Content-Disposition": 'attachment; filename="report.pdf"; size=10',
        };
        expect(getResponseFilename(new Response("", { headers }))).toBe(
          "report.pdf"
        );
        expect(getResponseFilename(new Response(""))).toBe("");
      });
    });
  });
});
