import { Any } from "./data";

/**
 * Constructor of a specific class.
 * Useful when a constructor must be passed to a generic function as parameter.
 * @typeParam TClass Instantiable class.
 */
export type ConstructorOf<TClass> = { new (...args: Any): TClass };
