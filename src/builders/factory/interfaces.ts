/**
 * Abstract factory pattern to build debug or release instances
 */
export interface IFactory<T> {
  /**
   * Create the release version of object T.
   * @returns An instance of T used for the release version.
   */
  createRelease(): T;
  /**
   * Create the debug version of object T.
   * @returns An instance of T used for the debug version.
   */
  createDebug(): T;
}
