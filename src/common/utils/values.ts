import { Any, ValueOrGetter } from "../types";
import { isFunction } from "./functions";

/**
 * Type-safe implementation of the {@link ValueOrGetter} type.
 * @param valueOrGetter The value or the getter to call to return the value.
 * @param arg The optional argument, if {@link valurOrGetter} is a getter.
 * @returns the type-safe value.
 */
export function getValue<TValue, TArg = never>(
  valueOrGetter: ValueOrGetter<TValue, TArg>,
  arg?: TArg
): TValue {
  if (isFunction(valueOrGetter))
    return (valueOrGetter as (arg: Any) => TValue)(arg);
  else return valueOrGetter as TValue;
}

/**
 * Checks if value is not null and not undefined.
 * @param value Value to check
 * @returns true if value is not null and not undefined.
 */
export function isDefined<TValue>(value: TValue): boolean {
  return !isUndefined(value) && !isNull(value);
}

/**
 * Checks if value is null.
 * @param value Value to check
 * @returns true if value is null.
 */
export function isNull<TValue>(value: TValue): boolean {
  return value === null;
}

/**
 * Checks if value is null or undefined.
 * @param value Value to check
 * @returns true if value is null or undefined.
 */
export function isNullOrUndefined<TValue>(value: TValue): boolean {
  return isUndefined(value) || isNull(value);
}

/**
 * Checks if value is undefined.
 * @param value Value to check
 * @returns true if value is undefined.
 */
export function isUndefined<TValue>(value: TValue): boolean {
  return value === undefined;
}
