/**
 * A builder is used in combination with a {@link IFactory}
 * to instantiate an object without worrying about if debug mode is active or not.
 * @typeParam T Type of the object the builder creates.
 */
export interface IBuilder<T> {
  /**
   * Create an object of type T.
   * @returns an instance of T.
   */
  build(): T;
}
