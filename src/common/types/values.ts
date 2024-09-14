/**
 * Defines a type or a getter of that type.
 * Useful when something's options can be an object or a function that returns options.
 */
export type ValueOrGetter<TValue, TArg> = TValue | ((args: TArg) => TValue);
