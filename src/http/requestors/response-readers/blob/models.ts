import { IHttpResponseReader } from "../interfaces";

/**
 * Reads the body as a `Blob`.
 */
export class BlobHttpResponseReader implements IHttpResponseReader<Blob> {
  public read(response: Response): Promise<Blob> {
    return response.blob();
  }
}
