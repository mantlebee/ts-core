import { IHttpRequestor } from "./interfaces";
import {
  HttpBody,
  HttpHeaders,
  HttpRequestorOptions,
  HttpSearchParams,
} from "./types";

/**
 * Base {@link IHttpRequestor} implementation: it keeps the headers and the
 * options, leaving the requests to the subclasses.
 */
export abstract class HttpRequestorAbstract implements IHttpRequestor {
  private _headers: HttpHeaders = new Headers();

  /**
   * @param options Options of the requestor.
   */
  public constructor(protected readonly options?: HttpRequestorOptions) {}

  public getHeaders(): HttpHeaders {
    return this._headers;
  }
  public setHeaders(headers: HttpHeaders): void {
    this._headers = headers;
  }

  public abstract get<TResponse = void>(
    endpoint: string,
    searchParams?: HttpSearchParams
  ): Promise<TResponse>;
  public abstract post<TBody extends HttpBody, TResponse = void>(
    endpoint: string,
    body?: TBody
  ): Promise<TResponse>;

  public abstract withOptions(options: HttpRequestorOptions): IHttpRequestor;
}
