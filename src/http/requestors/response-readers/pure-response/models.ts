import { IHttpResponseReader } from "../interfaces";

/**
 * Doesn't read the body: returns the `Response` itself.
 */
export class PureResponseHttpResponseReader
  implements IHttpResponseReader<Response>
{
  public read(response: Response): Promise<Response> {
    return Promise.resolve(response);
  }
}
