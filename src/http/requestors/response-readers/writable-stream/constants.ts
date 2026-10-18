import { MimeType } from "../types";
import { FilePickerOptionsGetter } from "./types";

/**
 * Content type used when the response has none.
 */
export const ContentTypeDefault: MimeType = "application/octet-stream";

/**
 * Default options of the save file picker: only the suggested name.
 */
export const FilePickerOptionsDefault: FilePickerOptionsGetter = (filename) => ({
  suggestedName: filename,
});
