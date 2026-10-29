import { Dictionary, List } from "@/common";

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
  /**
   * Serializer of the query string of the GET requests, default
   * {@link createHttpGetQuery}. Set it to send lists with another convention
   * (e.g. `a[]=1&a[]=2` or `a=1,2`) or to encode the values differently.
   */
  searchParamsSerializer?: HttpSearchParamsSerializer;
};

/**
 * Value of a query string parameter: a primitive, serialized with `String()`,
 * or a `Date`, serialized as an ISO 8601 string (`toISOString()`).
 */
export type HttpSearchParamValue = string | number | boolean | bigint | Date;

/**
 * Query string parameters of a GET request: {@link HttpSearchParamValue}s, or
 * lists of them sent as repeated keys (`a=1&a=2`). `null` and `undefined`
 * values are skipped, inside lists too. Other objects and nested lists are
 * not supported by the default serializer, see {@link createHttpGetQuery}.
 */
export type HttpSearchParams = Dictionary<
  | HttpSearchParamValue
  | List<HttpSearchParamValue | null | undefined>
  | null
  | undefined
>;

/**
 * Creates the query string of a GET request, without the leading `?`; returns
 * an empty string when there is nothing to send.
 * @param searchParams Query string parameters.
 * @returns the encoded query string.
 */
export type HttpSearchParamsSerializer = (
  searchParams: HttpSearchParams,
) => string;
