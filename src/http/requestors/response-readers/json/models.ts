import { Any } from "@/common";

import { IHttpResponseReader } from "../interfaces";

/**
 * Reads the body as JSON. An empty body (e.g. `204 No Content`) is read as
 * `undefined`.
 */
export class JsonHttpResponseReader implements IHttpResponseReader {
  public read(response: Response): Promise<Any> {
    return response.text().then((text) => (text ? JSON.parse(text) : undefined));
  }
}
