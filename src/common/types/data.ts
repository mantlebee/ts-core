/**
 * Any type.
 * Useful when:
 * 1. you don't know the type of a parameter, like check functions (`function isString(arg: Any): boolean`)
 * 2. you have to deal with generic type variables, but the type of the value is not important or is not the same for each item.
 * ATTENTION: its intent is not to avoid eslint checks.
 */
export type Any = any; // eslint-disable-line

/**
 * Type of value that can be `null` too.
 */
export type Nullable<T> = T | null;

/**
 * Type of value that can be `undefined` too.
 */
export type Undefinable<T> = T | undefined;
