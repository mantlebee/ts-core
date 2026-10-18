import { Nullable } from "@/common";

import { MimeType } from "./types";

/**
 * Reads the `Content-Type` header of a response.
 * @param response HTTP response.
 * @returns the content type, or `null` if missing.
 */
export function getResponseContentType(response: Response): Nullable<MimeType> {
  return response.headers.get("Content-Type") as Nullable<MimeType>;
}

/**
 * Reads the filename from the `Content-Disposition` header of a response.
 * @param response HTTP response.
 * @returns the filename, or an empty string if missing.
 */
export function getResponseFilename(response: Response): string {
  const contentDisposition = response.headers.get("Content-Disposition");
  if (contentDisposition?.includes("filename="))
    return contentDisposition
      .split("filename=")[1]
      .split(";")[0]
      .replace(/"/g, "")
      .trim();
  return "";
}
