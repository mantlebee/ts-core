/**
 * Reads a file with a `FileReader`, resolving with its string result.
 */
function readFile(
  file: Blob,
  read: (reader: FileReader, file: Blob) => void
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result as string));
    reader.addEventListener("error", () => reject(reader.error));
    reader.addEventListener("abort", () => reject(reader.error));
    read(reader, file);
  });
}

/**
 * Reads a file (or a blob) as a data URL (`data:<mime>;base64,...`).
 * Browser only: it relies on `FileReader`.
 * @param file File to read.
 * @returns a promise resolved with the data URL, or rejected with the read error.
 */
export function readFileAsDataUrl(file: Blob): Promise<string> {
  return readFile(file, (reader, a) => reader.readAsDataURL(a));
}

/**
 * Reads a file (or a blob) as text.
 * Browser only: it relies on `FileReader`.
 * @param file File to read.
 * @returns a promise resolved with the file content, or rejected with the read error.
 */
export function readFileAsText(file: Blob): Promise<string> {
  return readFile(file, (reader, a) => reader.readAsText(a));
}
