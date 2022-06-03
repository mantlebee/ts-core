/**
 * This is an interface that represent a single construction for an
 * object, without the difference between release or debug. This is
 * usefull when you need abstract on construction of a single object,
 * for example when you must instance more times same class and you
 * don't want make check on debug flag to decide which one create
 * (debug or release).
 */
export interface IBuilder<T> {
  /**
   * Create an object of type T.
   * @return An instance of T element.
   */
  create(): T;
}
