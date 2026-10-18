/** @jest-environment node */
import {
  createHttpGetQuery,
  createHttpPostBody,
  getResponseContentType,
  getResponseFilename,
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
