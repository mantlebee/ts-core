/**
 * Checks if value is not null and not undefined.
 * @param value Value to check
 * @returns true is value is not null and not undefined.
 */
export function isDefined<TValue>(value: TValue): boolean {
  return !isUndefined(value) && !isNull(value);
}

/**
 * Checks if value is null.
 * @param value Value to check
 * @returns true is value is null.
 */
export function isNull<TValue>(value: TValue): boolean {
  return value === null;
}

/**
 * Checks if value is null or undefined.
 * @param value Value to check
 * @returns true is value is null or undefined.
 */
export function isNullOrUndefined<TValue>(value: TValue): boolean {
  return isUndefined(value) || isNull(value);
}

/**
 * Checks if value is undefined.
 * @param value Value to check
 * @returns true is value is undefined.
 */
export function isUndefined<TValue>(value: TValue): boolean {
  return value === undefined;
}
