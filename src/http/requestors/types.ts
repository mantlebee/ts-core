import { Dictionary } from "@/common";

import { IHttpAbortController } from "./controllers";
import { IHttpResponseReader } from "./response-readers";

/**
 * Body of a POST request: serialized as JSON, unless it is a `URLSearchParams`.
 */
export type HttpBody = object;

/**
 * Headers of a request.
 */
export type HttpHeaders = Headers;

/**
 * Options of an {@link IHttpRequestor}.
 */
export type HttpRequestorOptions = {
  /** Controller that can abort the requests. */
  abortController?: IHttpAbortController;
  /** Reader of the responses, default {@link JsonHttpResponseReader}. */
  responseReader?: IHttpResponseReader;
};

/**
 * Query string parameters of a GET request. `null` and `undefined` values are
 * skipped.
 */
export type HttpSearchParams = Dictionary<unknown>;
