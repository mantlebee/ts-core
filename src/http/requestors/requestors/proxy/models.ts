import { IHttpRequestor } from "../../interfaces";
import {
  HttpBody,
  HttpHeaders,
  HttpRequestorOptions,
  HttpSearchParams,
} from "../../types";

/**
 * {@link IHttpRequestor} that forwards everything to another requestor.
 * Meant to be extended to decorate a requestor (headers, error handling, …).
 */
export abstract class ProxyHttpRequestor implements IHttpRequestor {
  /**
   * @param requestor Requestor that actually sends the requests.
   */
  public constructor(protected readonly requestor: IHttpRequestor) {}

  public getHeaders(): HttpHeaders {
    return this.requestor.getHeaders();
  }
  public setHeaders(headers: HttpHeaders): void {
    this.requestor.setHeaders(headers);
  }

  public get<TResponse = void>(
    url: string,
    searchParams?: HttpSearchParams
  ): Promise<TResponse> {
    return this.requestor.get<TResponse>(url, searchParams);
  }
  public post<TBody extends HttpBody, TResponse = void>(
    url: string,
    body?: TBody
  ): Promise<TResponse> {
    return this.requestor.post<TBody, TResponse>(url, body);
  }

  public abstract withOptions(options: HttpRequestorOptions): IHttpRequestor;
}
