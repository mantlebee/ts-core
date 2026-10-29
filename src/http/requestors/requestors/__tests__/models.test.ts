/** @jest-environment node */
import { Notifier } from "@/notifications";

import { HttpAbortController } from "../../controllers";
import {
  BadRequestException,
  HttpResponseException,
  NotAuthorizedException,
} from "../../exceptions";
import { BlobHttpResponseReader } from "../../response-readers";
import { HttpHeaders, HttpSearchParams } from "../../types";
import { FetchApiHttpRequestor } from "../fetch-api";
import { InterceptorHttpRequestor } from "../interceptor";
import { WithExtraHeadersHttpRequestor } from "../with-extra-headers";

class TokenHttpRequestor extends WithExtraHeadersHttpRequestor {
  public token = "";
  protected getExtraHeaders(): HttpHeaders {
    const headers = new Headers();
    if (this.token) headers.set("Authorization", `Bearer ${this.token}`);
    return headers;
  }
  public withOptions(): never {
    throw new Error("not used");
  }
}

const originalFetch = global.fetch;
const mockFetch = (response: () => Response) => {
  const fetchMock = jest.fn((_url: string, _init?: RequestInit) =>
    Promise.resolve(response())
  );
  global.fetch = fetchMock as unknown as typeof fetch;
  return fetchMock;
};
const getSentInit = (fetchMock: jest.Mock, call: number) =>
  fetchMock.mock.calls[call][1] as RequestInit;

describe("http", () => {
  describe("requestors", () => {
    afterEach(() => {
      global.fetch = originalFetch;
    });
    describe("FetchApiHttpRequestor", () => {
      it("2xx with JSON: resolves with the deserialized body", async () => {
        mockFetch(() => new Response(JSON.stringify({ a: 1 }), { status: 200 }));
        await expect(new FetchApiHttpRequestor().get("/x")).resolves.toEqual({
          a: 1,
        });
      });
      it("204 without body: resolves with undefined", async () => {
        mockFetch(() => new Response(null, { status: 204 }));
        await expect(
          new FetchApiHttpRequestor().post("/x", {})
        ).resolves.toBeUndefined();
      });
      it("401: rejects with NotAuthorizedException", async () => {
        mockFetch(() => new Response(null, { status: 401 }));
        await expect(new FetchApiHttpRequestor().get("/x")).rejects.toBeInstanceOf(
          NotAuthorizedException
        );
      });
      it("4xx with JSON: rejects with the deserialized body", async () => {
        mockFetch(
          () => new Response(JSON.stringify({ message: "bad" }), { status: 400 })
        );
        await expect(new FetchApiHttpRequestor().get("/x")).rejects.toEqual({
          message: "bad",
        });
      });
      it("5xx with a non JSON body: rejects with HttpResponseException", async () => {
        mockFetch(
          () =>
            new Response("<html>err</html>", {
              status: 502,
              statusText: "Bad Gateway",
            })
        );
        const error = await new FetchApiHttpRequestor().get("/x").catch((a) => a);
        expect(error).toBeInstanceOf(HttpResponseException);
        expect(error.status).toBe(502);
        expect(error.statusText).toBe("Bad Gateway");
      });
      it("4xx without body: rejects with HttpResponseException", async () => {
        mockFetch(() => new Response(null, { status: 404 }));
        await expect(new FetchApiHttpRequestor().get("/x")).rejects.toBeInstanceOf(
          HttpResponseException
        );
      });
      it("Sends the query string, the headers and the JSON body", async () => {
        const fetchMock = mockFetch(() => new Response("{}"));
        const requestor = new FetchApiHttpRequestor();
        requestor.setHeaders(new Headers({ "X-App": "1" }));
        await requestor.get("/x", { page: 2, q: null });
        await requestor.post("/y", { a: 1 });
        expect(fetchMock.mock.calls[0][0]).toBe("/x?page=2");
        expect(new Headers(getSentInit(fetchMock, 0).headers).get("X-App")).toBe(
          "1"
        );
        expect(getSentInit(fetchMock, 1)).toMatchObject({
          body: '{"a":1}',
          method: "POST",
        });
      });
      it("Sends lists as repeated keys and rejects values it can't serialize", async () => {
        const fetchMock = mockFetch(() => new Response("{}"));
        const requestor = new FetchApiHttpRequestor();
        await requestor.get("/x", { ids: [1, 2] });
        expect(fetchMock.mock.calls[0][0]).toBe("/x?ids=1&ids=2");
        const params = { filter: { a: 1 } } as unknown as HttpSearchParams;
        await expect(requestor.get("/x", params)).rejects.toBeInstanceOf(
          BadRequestException
        );
        expect(fetchMock).toHaveBeenCalledTimes(1);
      });
      it("Uses the 'searchParamsSerializer' option, when given", async () => {
        const fetchMock = mockFetch(() => new Response("{}"));
        const searchParamsSerializer = jest.fn((params: HttpSearchParams) =>
          Object.entries(params)
            .map(([key, value]) => `${key}[]=${value}`)
            .join("&")
        );
        const requestor = new FetchApiHttpRequestor({ searchParamsSerializer });
        await requestor.get("/x", { ids: 1 });
        expect(fetchMock.mock.calls[0][0]).toBe("/x?ids[]=1");
        expect(searchParamsSerializer).toHaveBeenCalledWith({ ids: 1 });
        await requestor.get("/y");
        expect(fetchMock.mock.calls[1][0]).toBe("/y");
        expect(searchParamsSerializer).toHaveBeenCalledTimes(1);
      });
      it("'withOptions' keeps the headers and uses the given options", async () => {
        const fetchMock = mockFetch(() => new Response("abc"));
        const requestor = new FetchApiHttpRequestor();
        requestor.setHeaders(new Headers({ "X-App": "1" }));
        const abortController = new HttpAbortController();
        const blob = await requestor
          .withOptions({ abortController, responseReader: new BlobHttpResponseReader() })
          .get<Blob>("/x");
        expect(await blob.text()).toBe("abc");
        expect(getSentInit(fetchMock, 0).signal).toBeInstanceOf(AbortSignal);
        expect(new Headers(getSentInit(fetchMock, 0).headers).get("X-App")).toBe(
          "1"
        );
      });
    });
    describe("WithExtraHeadersHttpRequestor", () => {
      it("Sends the extra headers without changing the inner requestor", async () => {
        const fetchMock = mockFetch(() => new Response("{}"));
        const inner = new FetchApiHttpRequestor();
        inner.setHeaders(new Headers({ "X-App": "1" }));
        const requestor = new TokenHttpRequestor(inner);
        requestor.token = "abc";
        await requestor.get("/x");
        const sentHeaders = new Headers(getSentInit(fetchMock, 0).headers);
        expect(sentHeaders.get("Authorization")).toBe("Bearer abc");
        expect(sentHeaders.get("X-App")).toBe("1");
        expect(inner.getHeaders().has("Authorization")).toBe(false);
      });
      it("A removed extra header is not sent anymore", async () => {
        const fetchMock = mockFetch(() => new Response("{}"));
        const requestor = new TokenHttpRequestor(new FetchApiHttpRequestor());
        requestor.token = "abc";
        await requestor.post("/x", {});
        requestor.token = "";
        await requestor.post("/x", {});
        const sentHeaders = new Headers(getSentInit(fetchMock, 1).headers);
        expect(sentHeaders.has("Authorization")).toBe(false);
      });
    });
    describe("InterceptorHttpRequestor", () => {
      it("Notifies the error message and rejects, if no handler handles the error", async () => {
        mockFetch(() => new Response(JSON.stringify({ message: "bad" }), { status: 400 }));
        const delegate = jest.fn();
        const requestor = new InterceptorHttpRequestor(
          new FetchApiHttpRequestor(),
          new Notifier(delegate)
        );
        await expect(requestor.get("/x")).rejects.toEqual({ message: "bad" });
        expect(delegate).toHaveBeenCalledWith("error", "bad");
      });
      it("Uses the first handler that can handle the error", async () => {
        mockFetch(() => new Response(null, { status: 401 }));
        const delegate = jest.fn();
        const requestor = new InterceptorHttpRequestor(
          new FetchApiHttpRequestor(),
          new Notifier(delegate),
          [
            {
              canHandle: (error) => error instanceof NotAuthorizedException,
              handle: <T>() => Promise.resolve("recovered" as T),
            },
          ]
        );
        await expect(requestor.get("/x")).resolves.toBe("recovered");
        expect(delegate).not.toHaveBeenCalled();
      });
    });
  });
});
