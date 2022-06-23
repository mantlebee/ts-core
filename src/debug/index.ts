let debug = false;

/**
 * Gets or sets the debug value. If value is defined, its value is used to set/unset debug mode.
 * @param value Debug value to set.
 * @returns current debug value.
 */
export function isDebug(value?: boolean): boolean {
  if (value !== undefined) debug = value;
  return debug;
}
