/**
 * Behaviour options for a {@link NestedObject}.
 */
export type NestedObjectOptions = {
  /**
   * When `true`, {@link INestedObject.set} creates missing intermediate
   * containers instead of leaving the object untouched. Defaults to `false`.
   */
  createIfMissing?: boolean;
  /**
   * Separator used to split every path into segments. Defaults to `"."`.
   */
  pathSeparator?: string;
  /**
   * When `true`, {@link INestedObject.set} replaces an existing but
   * non-traversable intermediate value (a string, a number, …) with a fresh
   * container. Defaults to `false`.
   */
  replaceIfExists?: boolean;
};
