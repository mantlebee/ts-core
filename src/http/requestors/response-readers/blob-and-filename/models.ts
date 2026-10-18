import { IHttpResponseReader } from "../interfaces";
import { getResponseFilename } from "../utils";
import { BlobAndFilenameHttpResponse } from "./types";

/**
 * Reads the body as a `Blob`, together with the filename of the
 * `Content-Disposition` header.
 */
export class BlobAndFilenameHttpResponseReader
  implements IHttpResponseReader<BlobAndFilenameHttpResponse>
{
  public read(response: Response): Promise<BlobAndFilenameHttpResponse> {
    const filename = getResponseFilename(response);
    return response.blob().then((blob) => ({ blob, filename }));
  }
}
