import { INotifier } from "@/notifications";

/**
 * Handles some of the errors of an {@link InterceptorHttpRequestor}.
 * @typeParam TError Type of the handled errors.
 */
export type InterceptorHttpRequestorHandler<TError extends Error = Error> = {
  /**
   * Checks if the error is handled by this handler.
   * @param error Error of the request.
   * @returns true if {@link handle} must be called.
   */
  canHandle(error: TError): boolean;
  /**
   * Handles the error: it can recover (resolving with a response) or reject.
   * @param error Error of the request.
   * @param params Notifier of the requestor.
   * @returns the result of the request.
   */
  handle<TResponse>(
    error: TError,
    params: { notifier: INotifier }
  ): Promise<TResponse>;
};
