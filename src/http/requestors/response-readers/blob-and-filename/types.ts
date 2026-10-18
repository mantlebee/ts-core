/**
 * Value read by {@link BlobAndFilenameHttpResponseReader}.
 */
export type BlobAndFilenameHttpResponse = {
  /** Body of the response. */
  blob: Blob;
  /** Filename from the `Content-Disposition` header, or an empty string. */
  filename: string;
};
