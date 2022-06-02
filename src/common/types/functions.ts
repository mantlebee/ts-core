/**
 * Function without args or with a single one that returns a value or not.
 * @param TReturn Result of the function, default is `void`
 * @param TArg Single and optional function parameter, default is `void`
 */
export type Delegate<TReturn = void, TArg = void> = (arg?: TArg) => TReturn;
