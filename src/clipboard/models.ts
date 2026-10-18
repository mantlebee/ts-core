import { isString } from "@/common";

import { IClipboard } from "./interfaces";

/**
 * {@link IClipboard} backed by the Clipboard API (`navigator.clipboard`).
 * Browser only, in a secure context.
 *
 * The read text is deserialized when it is valid JSON, otherwise it is returned
 * as it is. A string that is also valid JSON (e.g. `"123"`) is deserialized too.
 */
export const WebClipboard: IClipboard = {
  clear: () => navigator.clipboard.writeText(""),
  read: <TValue>() =>
    navigator.clipboard.readText().then((a) => {
      try {
        return JSON.parse(a) as TValue;
      } catch {
        return a as TValue;
      }
    }),
  write: (a) =>
    navigator.clipboard.writeText(
      isString(a) ? (a as string) : JSON.stringify(a)
    ),
};
