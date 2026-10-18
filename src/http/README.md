# `http`

**A pluggable HTTP client** on top of the Fetch API. `IHttpRequestor` sends
`get`/`post` requests with shared headers; how responses are read and how
requests are aborted are pluggable through `HttpRequestorOptions`. Requestors
can be decorated (proxy pattern) to add headers or to intercept errors.

## What's in here

- **`utils.ts`** — `createHttpRelativePath`, joins URL path segments.
- **`requestors/`**:
  - **`interfaces.ts`, `models.ts`, `types.ts`** — `IHttpRequestor`,
    `HttpRequestorAbstract` (keeps headers and options), `HttpBody`,
    `HttpHeaders`, `HttpSearchParams`, `HttpRequestorOptions`.
  - **`utils.ts`** — `createHttpGetQuery`, `createHttpPostBody`.
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
