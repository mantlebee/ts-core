/**
 * Controller that can abort the requests of an {@link IHttpRequestor}.
 */
export interface IHttpAbortController {
  /**
   * Aborts the requests bound to the controller.
   */
  abort(): Promise<void>;
  /**
   * Binds the controller to a request, before it is sent.
   * @param init Options of the request.
   */
  onRequestInit(init: RequestInit): void;
}
