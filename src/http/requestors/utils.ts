import { HttpBody, HttpSearchParams } from "./types";

/**
 * Creates the query string of a GET request, without the leading `?`.
 * `null` and `undefined` values are skipped.
 * @example
 * ```ts
 * createHttpGetQuery({ page: 1, q: "a b", filter: null }) // "page=1&q=a+b"
 * ```
 * @param data Query string parameters.
 * @returns the encoded query string.
 */
export function createHttpGetQuery(data: HttpSearchParams): string {
  const searchParams = new URLSearchParams();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value !== null && value !== undefined)
      searchParams.append(key, `${value}`);
  });
  return searchParams.toString();
}

/**
 * Creates the body of a POST request: `URLSearchParams` are sent as they are,
 * anything else is serialized as JSON.
 * @param body Body of the request.
 * @returns the body to pass to `fetch`.
 */
export function createHttpPostBody<TBody extends HttpBody>(
  body: TBody
): BodyInit {
  if (body instanceof URLSearchParams) return body;
  return JSON.stringify(body);
}
