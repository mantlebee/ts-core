/** @jest-environment node */
import { FetchApiHttpRequestor } from "../fetch-api";

const originalFetch = global.fetch;
const mockFetch = () => {
  const fetchMock = jest.fn((_url: string, _init?: RequestInit) =>
    Promise.resolve(new Response(null, { status: 204 }))
  );
  global.fetch = fetchMock as unknown as typeof fetch;
  return fetchMock;
};
const getSentHeaders = (fetchMock: jest.Mock, call = 0) =>
  new Headers((fetchMock.mock.calls[call][1] as RequestInit).headers);

describe("http", () => {
  describe("requestors", () => {
    describe("regressions", () => {
      afterEach(() => {
        global.fetch = originalFetch;
      });
      it("POST with a JSON body sends 'Content-Type: application/json'", async () => {
        const fetchMock = mockFetch();
        await new FetchApiHttpRequestor().post("/x", { a: 1 });
        expect(getSentHeaders(fetchMock).get("Content-Type")).toBe(
          "application/json"
        );
      });
      it("POST keeps a 'Content-Type' set by the caller", async () => {
        const fetchMock = mockFetch();
        const requestor = new FetchApiHttpRequestor();
        requestor.setHeaders(
          new Headers({ "Content-Type": "application/vnd.api+json" })
        );
        await requestor.post("/x", { a: 1 });
        expect(getSentHeaders(fetchMock).get("Content-Type")).toBe(
          "application/vnd.api+json"
        );
      });
      it("POST with URLSearchParams doesn't force the JSON content type", async () => {
        const fetchMock = mockFetch();
        await new FetchApiHttpRequestor().post(
          "/x",
          new URLSearchParams({ a: "1" })
        );
        expect(getSentHeaders(fetchMock).get("Content-Type")).not.toBe(
          "application/json"
        );
      });
      it("per-request headers don't leak into the requestor's headers", async () => {
        mockFetch();
        const requestor = new FetchApiHttpRequestor();
        await requestor.post("/x", { a: 1 });
        expect(requestor.getHeaders().has("Content-Type")).toBe(false);
      });
      it("'withOptions' copies the headers instead of sharing them", () => {
        const requestor = new FetchApiHttpRequestor();
        requestor.setHeaders(new Headers({ "X-App": "1" }));
        const copy = requestor.withOptions({});
        copy.getHeaders().set("X-Other", "2");
        expect(copy.getHeaders().get("X-App")).toBe("1");
        expect(requestor.getHeaders().has("X-Other")).toBe(false);
      });
    });
  });
});
