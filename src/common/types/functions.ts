/**
 * Type of function without args or with a single one that returns a value or not.
 * It is an alternative to arrow function declarations, like `() => void`, `() => string`, `(a: string) => boolean`.
 * @param TReturn Result of the function.
 * @param TArg Single and optional function parameter.
 */
export type Delegate<TReturn = void, TArg = void> = (arg?: TArg) => TReturn;
