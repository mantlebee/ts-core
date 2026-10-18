import { Any } from "@/common";

/**
 * Reads the body of an HTTP response.
 * @typeParam TResponse Type of the read value.
 */
export interface IHttpResponseReader<TResponse = Any> {
  /**
   * Reads the response.
   * @param response Response to read.
   * @returns a promise resolved with the read value.
   */
  read(response: Response): Promise<TResponse>;
}
