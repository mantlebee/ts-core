import { Any } from "./data";

/**
 * Usefull when a constructor must be passed to a generic function as parameter.
 * @param TClass Instantiable class.
 */
export type ConstructorOf<TClass> = { new (...args: Any): TClass };
