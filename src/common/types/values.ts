/**
 * Defines a type or a getter of that type.
 * Useful when something's options can be an object or a function that returns options.
 * @typeParam TValue Type of the value.
 * @typeParam TArg Type of the argument passed to the getter when a getter is used.
 */
export type ValueOrGetter<TValue, TArg> = TValue | ((args: TArg) => TValue);
