/**
 * A builder is used in combination with a {@link IFactory}
 * to instatiates an object without worrying about if debug mode is active or not.
 */
export interface IBuilder<T> {
  /**
   * Create an object of type T.
   * @return An instance of T element.
   */
  build(): T;
}
