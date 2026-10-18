import { IHttpRequestor } from "../../interfaces";
import { HttpBody, HttpHeaders, HttpSearchParams } from "../../types";
import { ProxyHttpRequestor } from "../proxy";

/**
 * {@link ProxyHttpRequestor} that adds extra headers (e.g. `Authorization`) to
 * every request, without changing the headers of the inner requestor: the
 * original headers are restored right after the request is started (requestors
 * read the headers synchronously), so a removed extra header is not sent anymore.
 */
export abstract class WithExtraHeadersHttpRequestor
  extends ProxyHttpRequestor
  implements IHttpRequestor
{
  /**
   * Returns the extra headers, read before every request.
   */
  protected abstract getExtraHeaders(): HttpHeaders;

  /**
   * Returns the headers of the inner requestor merged with the extra ones.
   */
  public getHeaders(): HttpHeaders {
    return this.getMergedHeaders();
  }

  public get<TResponse = void>(
    url: string,
    searchParams?: HttpSearchParams
  ): Promise<TResponse> {
    return this.withExtraHeaders(() => super.get<TResponse>(url, searchParams));
  }
  public post<TBody extends HttpBody, TResponse = void>(
    url: string,
    body?: TBody
  ): Promise<TResponse> {
    return this.withExtraHeaders(() => super.post<TBody, TResponse>(url, body));
  }

  /**
   * Merges the headers of the inner requestor with the extra ones (the extra
   * ones win).
   */
  protected getMergedHeaders(): HttpHeaders {
    const headers = new Headers(super.getHeaders());
    this.getExtraHeaders().forEach((value, key) => headers.set(key, value));
    return headers;
  }
  /**
   * Starts a request with the merged headers, then restores the original
   * headers of the inner requestor.
   * @param request Starts the request.
   * @returns the result of request.
   */
  protected withExtraHeaders<TResult>(request: () => TResult): TResult {
    const originalHeaders = super.getHeaders();
    super.setHeaders(this.getMergedHeaders());
    try {
      return request();
    } finally {
      super.setHeaders(originalHeaders);
    }
  }
}
