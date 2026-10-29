# `http`

**A pluggable HTTP client** on top of the Fetch API. `IHttpRequestor` sends
`get`/`post` requests with shared headers; how responses are read, how
requests are aborted and how the query string is serialized are pluggable
through `HttpRequestorOptions`. Requestors can be decorated (proxy pattern) to
add headers or to intercept errors.

Query string parameters (`HttpSearchParams`) are primitives, `Date`s or lists
of them: lists are sent as repeated keys (`ids=1&ids=2`), `Date`s as ISO 8601
strings, `null` and `undefined` are skipped, other objects are rejected with
`BadRequestException` instead of being sent as `[object Object]`. Another convention (`ids[]=1`,
`ids=1,2`, JSON) takes a custom `searchParamsSerializer` in the options.

## What's in here

- **`utils.ts`** — `createHttpRelativePath`, joins URL path segments.
- **`requestors/`**:
  - **`interfaces.ts`, `models.ts`, `types.ts`** — `IHttpRequestor`,
    `HttpRequestorAbstract` (keeps headers and options), `HttpBody`,
    `HttpHeaders`, `HttpSearchParams`, `HttpSearchParamValue`,
    `HttpSearchParamsSerializer`, `HttpRequestorOptions`.
  - **`utils.ts`** — `createHttpGetQuery` (the default
    `HttpSearchParamsSerializer`), `createHttpPostBody`.
  - **`exceptions.ts`** — `BadRequestException`, `InvalidCredentialsException`,
    `NotAuthorizedException`, `HttpResponseException` (all `BaseException`s).
  - **`controllers/`** — `IHttpAbortController` / `HttpAbortController`.
  - **`requestors/`**:
    - `FetchApiHttpRequestor` — the actual client, see its docs for how
      statuses are mapped to results and errors.
    - `ProxyHttpRequestor` — forwards everything to another requestor.
    - `WithExtraHeadersHttpRequestor` — adds extra headers (e.g. a token) to
      every request without changing the inner requestor.
    - `InterceptorHttpRequestor` — handles errors with a list of handlers,
      notifying the unhandled ones through an
      [`INotifier`](../notifications).
  - **`response-readers/`** — `IHttpResponseReader` and its implementations:
    `JsonHttpResponseReader` (default), `BlobHttpResponseReader`,
    `BlobAndFilenameHttpResponseReader`, `PureResponseHttpResponseReader`,
    `WritableStreamHttpResponseReader` (streams the body to a file chosen with
    the save file picker; Chromium-based browsers only). Plus
    `getResponseContentType` and `getResponseFilename`.
