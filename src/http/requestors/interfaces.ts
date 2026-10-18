import {
  HttpBody,
  HttpHeaders,
  HttpRequestorOptions,
  HttpSearchParams,
} from "./types";

/**
 * HTTP client.
 */
export interface IHttpRequestor {
  /**
   * Returns the headers sent with every request.
   */
  getHeaders(): HttpHeaders;
  /**
   * Sets the headers sent with every request.
   * @param headers Headers to send.
   */
  setHeaders(headers: HttpHeaders): void;

  /**
   * Sends a GET request.
   * @typeParam TResponse Type of the response, as read by the response reader.
   * @param endpoint URL of the request.
   * @param searchParams Query string parameters.
   * @returns a promise resolved with the response.
   */
  get<TResponse = void>(
    endpoint: string,
    searchParams?: HttpSearchParams
  ): Promise<TResponse>;
  /**
   * Sends a POST request.
   * @typeParam TBody Type of the body.
   * @typeParam TResponse Type of the response, as read by the response reader.
   * @param endpoint URL of the request.
   * @param body Body of the request.
   * @returns a promise resolved with the response.
   */
  post<TBody extends HttpBody, TResponse = void>(
    endpoint: string,
    body?: TBody
  ): Promise<TResponse>;

  /**
   * Creates a new requestor with the same headers and the given options.
   * @param options Options of the new requestor.
   * @returns the new requestor.
   */
  withOptions(options: HttpRequestorOptions): IHttpRequestor;
}
