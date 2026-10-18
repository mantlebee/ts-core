/**
 * System clipboard.
 */
export interface IClipboard {
  /**
   * Empties the clipboard.
   */
  clear(): Promise<void>;
  /**
   * Reads the clipboard content.
   * @typeParam TValue Type of the content.
   * @returns the content, deserialized if it is valid JSON.
   */
  read<TValue>(): Promise<TValue>;
  /**
   * Writes a value in the clipboard. Strings are written as they are, any other
   * value is serialized as JSON.
   * @typeParam TValue Type of the value.
   * @param value Value to write.
   */
  write<TValue>(value: TValue): Promise<void>;
}
