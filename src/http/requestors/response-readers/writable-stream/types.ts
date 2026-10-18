import { Dictionary, List } from "@/common";

import { MimeType } from "../types";

/**
 * Options of `window.showSaveFilePicker` (File System Access API), not yet
 * included in the TypeScript DOM types.
 */
export type SaveFilePickerOptions = {
  /** If true, the "all files" option is not shown. */
  excludeAcceptAllOption?: boolean;
  /** Id used by the browser to remember the last used directory. */
  id?: string;
  /** Suggested name of the file. */
  suggestedName?: string;
  /** Allowed file types. */
  types?: List<{
    /** Description of the file type. */
    description?: string;
    /** Accepted extensions (e.g. `[".pdf"]`) by MIME type. */
    accept: Dictionary<List<string>>;
  }>;
};

/**
 * Function that creates the options of the save file picker.
 * @param filename Filename from the `Content-Disposition` header, or an empty string.
 * @param contentType Content type of the response.
 * @returns the options of the save file picker.
 */
export type FilePickerOptionsGetter = (
  filename: string,
  contentType: MimeType
) => SaveFilePickerOptions;

/**
 * Options of {@link WritableStreamHttpResponseReader}.
 */
export type WritableStreamHttpResponseReaderOptions = {
  /** Creates the options of the save file picker, default {@link FilePickerOptionsDefault}. */
  getFilePickerOptions?: FilePickerOptionsGetter;
  /** Called with every chunk written to the file (e.g. to show the progress). */
  onStreamWrite?: (chunk: Uint8Array) => void;
};
