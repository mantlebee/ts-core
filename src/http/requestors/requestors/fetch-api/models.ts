import { HttpResponseException, NotAuthorizedException } from "../../exceptions";
import { IHttpRequestor } from "../../interfaces";
import { HttpRequestorAbstract } from "../../models";
import {
  IHttpResponseReader,
  JsonHttpResponseReader,
} from "../../response-readers";
import { HttpBody, HttpRequestorOptions, HttpSearchParams } from "../../types";
import { createHttpGetQuery, createHttpPostBody } from "../../utils";

/**
 * {@link IHttpRequestor} backed by the Fetch API. Responses are handled as follows:
 * - `401`: rejects with {@link NotAuthorizedException};
 * - `2xx`: resolves with the body read by the response reader (`undefined` if
 *   empty, with the default {@link JsonHttpResponseReader});
 * - not `2xx`, with a readable body: rejects with the read body;
 * - not `2xx`, with an empty or unreadable body: rejects with
 *   {@link HttpResponseException}.
 */
export class FetchApiHttpRequestor
  extends HttpRequestorAbstract
  implements IHttpRequestor
{
  public get<TResponse = void>(
    url: string,
    searchParams?: HttpSearchParams
  ): Promise<TResponse> {
    const query = searchParams && createHttpGetQuery(searchParams);
    if (query) url += `?${query}`;
    const init = this.getRequestInit();
    return fetch(url, init).then((a) => this.onFetch<TResponse>(a));
  }
  public post<TBody extends HttpBody, TResponse = void>(
    url: string,
    body?: TBody
  ): Promise<TResponse> {
    const init = this.getRequestInit();
    if (body) {
      init.body = createHttpPostBody(body);
      // JSON bodies must be declared as such, or many servers won't parse them.
      // `URLSearchParams` bodies get their content type from `fetch` itself.
      const headers = init.headers as Headers;
      if (!(body instanceof URLSearchParams) && !headers.has("Content-Type"))
        headers.set("Content-Type", "application/json");
    }
    init.method = "POST";
    return fetch(url, init).then((a) => this.onFetch<TResponse>(a));
  }

  /**
   * Creates a new requestor with the given options and a copy of the current
   * headers: changing the headers of one requestor doesn't affect the other.
   */
  public withOptions(options: HttpRequestorOptions): IHttpRequestor {
    const requestor = new FetchApiHttpRequestor(options);
    requestor.setHeaders(new Headers(this.getHeaders()));
    return requestor;
  }

  private getRequestInit(): RequestInit {
    // A copy, so per-request headers never leak into the requestor's headers.
    const init: RequestInit = { headers: new Headers(this.getHeaders()) };
    this.options?.abortController?.onRequestInit(init);
    return init;
  }
  private getResponseReader(): IHttpResponseReader {
    return this.options?.responseReader || new JsonHttpResponseReader();
  }
  private onFetch<TResponse>(response: Response): Promise<TResponse> {
    if (response.status === 401)
      return Promise.reject(new NotAuthorizedException());
    return this.getResponseReader()
      .read(response)
      .then(
        (a) =>
          response.ok
            ? a
            : Promise.reject(a ?? new HttpResponseException(response)),
        (error) =>
          Promise.reject(
            response.ok ? error : new HttpResponseException(response, error)
          )
      );
  }
}
