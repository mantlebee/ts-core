import { List } from "@/common";
import { INotifier } from "@/notifications";

import { IHttpRequestor } from "../../interfaces";
import { HttpBody, HttpRequestorOptions, HttpSearchParams } from "../../types";
import { ProxyHttpRequestor } from "../proxy";
import { InterceptorHttpRequestorHandler } from "./types";

/**
 * {@link IHttpRequestor} that intercepts the errors of another requestor.
 * The first handler that can handle an error handles it; when none can, the
 * error message is notified with {@link INotifier.notifyError} and the error is
 * rethrown.
 * @typeParam TError Type of the intercepted errors.
 */
export class InterceptorHttpRequestor<TError extends Error = Error>
  extends ProxyHttpRequestor
  implements IHttpRequestor
{
  /**
   * @param requestor Requestor that actually sends the requests.
   * @param notifier Notifier of the errors.
   * @param handlers Handlers of specific errors.
   */
  public constructor(
    requestor: IHttpRequestor,
    protected readonly notifier: INotifier,
    protected readonly handlers?: List<InterceptorHttpRequestorHandler<TError>>
  ) {
    super(requestor);
  }

  public get<TResponse = void>(
    url: string,
    searchParams?: HttpSearchParams
  ): Promise<TResponse> {
    return super
      .get<TResponse>(url, searchParams)
      .catch((error: TError) => this.handleError<TResponse>(error));
  }
  public post<TBody extends HttpBody, TResponse = void>(
    url: string,
    body?: TBody
  ): Promise<TResponse> {
    return super
      .post<TBody, TResponse>(url, body)
      .catch((error: TError) => this.handleError<TResponse>(error));
  }

  public withOptions(options: HttpRequestorOptions): IHttpRequestor {
    return new InterceptorHttpRequestor(
      this.requestor.withOptions(options),
      this.notifier,
      this.handlers
    );
  }

  /**
   * Handles an error of a request.
   * @param error Error of the request.
   * @returns the result of the handler, or a rejected promise.
   */
  protected handleError<TResponse = void>(error: TError): Promise<TResponse> {
    const handler = this.handlers?.find((a) => a.canHandle(error));
    if (handler) return handler.handle(error, { notifier: this.notifier });
    if (error?.message) this.notifier.notifyError(error.message);
    return Promise.reject(error);
  }
}
