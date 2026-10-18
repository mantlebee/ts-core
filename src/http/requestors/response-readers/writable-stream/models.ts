import { GenericException } from "@/exceptions";

import { IHttpResponseReader } from "../interfaces";
import { WritableStreamHttpResponseReaderOptions } from "./types";
import { getFileHandle } from "./utils";

/**
 * Streams the body directly to a file chosen by the user, with the save file
 * picker, without keeping it in memory. Useful to download large files.
 * Browser only, where the File System Access API is supported.
 */
export class WritableStreamHttpResponseReader
  implements IHttpResponseReader<void>
{
  /**
   * @param options Options of the save file picker and progress callback.
   */
  public constructor(
    protected readonly options?: WritableStreamHttpResponseReaderOptions
  ) {}

  /**
   * Asks the user where to save the file and writes the body into it.
   * @param response Response to read.
   * @returns a promise resolved once the whole body is written, or rejected
   * if the body is empty, the picker is not supported or dismissed, or the
   * stream fails.
   */
  public async read(response: Response): Promise<void> {
    const body = response.body;
    if (!body) throw new GenericException("The response has no body");
    const fileHandle = await getFileHandle(response, this.options);
    const fileStream = await fileHandle.createWritable();
    await body.pipeTo(
      new WritableStream<Uint8Array>({
        write: (chunk) => {
          this.options?.onStreamWrite?.(chunk);
          return fileStream.write(chunk as BufferSource);
        },
        close: () => fileStream.close(),
        abort: (reason) => fileStream.abort(reason),
      })
    );
  }
}
