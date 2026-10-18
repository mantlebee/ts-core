import { MethodNotImplementedException } from "@/exceptions";

import { getResponseContentType, getResponseFilename } from "../utils";
import { ContentTypeDefault, FilePickerOptionsDefault } from "./constants";
import {
  SaveFilePickerOptions,
  WritableStreamHttpResponseReaderOptions,
} from "./types";

type WindowWithSaveFilePicker = {
  showSaveFilePicker?: (
    options?: SaveFilePickerOptions
  ) => Promise<FileSystemFileHandle>;
};

/**
 * Asks the user where to save the response body, with the save file picker.
 * @param response HTTP response.
 * @param options Options of the reader.
 * @returns a promise resolved with the handle of the chosen file.
 * @throws MethodNotImplementedException if the browser doesn't support the
 * save file picker.
 */
export function getFileHandle(
  response: Response,
  options?: WritableStreamHttpResponseReaderOptions
): Promise<FileSystemFileHandle> {
  const host = globalThis as WindowWithSaveFilePicker;
  if (!host.showSaveFilePicker)
    return Promise.reject(
      new MethodNotImplementedException("showSaveFilePicker is not supported")
    );
  const filename = getResponseFilename(response);
  const contentType = getResponseContentType(response) || ContentTypeDefault;
  const getFilePickerOptions =
    options?.getFilePickerOptions ?? FilePickerOptionsDefault;
  return host.showSaveFilePicker(getFilePickerOptions(filename, contentType));
}
