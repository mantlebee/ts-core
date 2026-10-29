import { BadRequestException } from "./exceptions";
import { HttpBody, HttpSearchParams } from "./types";

/**
 * Creates the query string of a GET request, without the leading `?`, the
 * default {@link HttpSearchParamsSerializer}:
 * - primitives are serialized with `String()` and encoded by `URLSearchParams`;
 * - `Date`s are serialized as ISO 8601 strings (`toISOString()`, UTC);
 * - lists are sent as repeated keys (`a=1&a=2`), the convention every server
 *   parses without configuration;
 * - `null` and `undefined` values are skipped, inside lists too;
 * - other objects, nested lists, invalid dates and other non-primitive values
 *   are rejected with a {@link BadRequestException}, instead of being sent as
 *   `[object Object]` or comma-joined: serialize them yourself (e.g. as JSON)
 *   or set another {@link HttpRequestorOptions.searchParamsSerializer}.
 * @example
 * ```ts
 * createHttpGetQuery({ page: 1, q: "a b", ids: [1, 2], filter: null }); // "page=1&q=a+b&ids=1&ids=2"
 * createHttpGetQuery({ from: new Date(Date.UTC(2026, 0, 1)) }); // "from=2026-01-01T00%3A00%3A00.000Z"
 * createHttpGetQuery({ filter: { a: 1 } }); // throws BadRequestException
 * ```
 * @param data Query string parameters.
 * @returns the encoded query string, empty when there is nothing to send.
 * @throws {BadRequestException} when a value is not an
 * {@link HttpSearchParamValue} or a list of them.
 */
export function createHttpGetQuery(data: HttpSearchParams): string {
  const searchParams = new URLSearchParams();
  Object.keys(data).forEach((key) => {
    const value: unknown = data[key];
    if (Array.isArray(value))
      value.forEach((a) => appendHttpSearchParam(searchParams, key, a));
    else appendHttpSearchParam(searchParams, key, value);
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

/**
 * Appends a single value to the query string, skipping `null` and `undefined`.
 * @param searchParams Query string being built.
 * @param key Name of the parameter.
 * @param value Value of the parameter.
 * @throws {BadRequestException} when the value is not a primitive or a valid
 * `Date`.
 */
function appendHttpSearchParam(
  searchParams: URLSearchParams,
  key: string,
  value: unknown
): void {
  if (value === null || value === undefined) return;
  if (value instanceof Date) {
    if (isNaN(value.getTime()))
      throw new BadRequestException(
        `The query string parameter "${key}" is an invalid Date.`
      );
    searchParams.append(key, value.toISOString());
    return;
  }
  const type = typeof value;
  if (type === "object" || type === "function" || type === "symbol")
    throw new BadRequestException(
      `The query string parameter "${key}" is not a primitive, a Date or a list of them: serialize it yourself, or set a custom 'searchParamsSerializer'.`
    );
  searchParams.append(key, String(value));
}
