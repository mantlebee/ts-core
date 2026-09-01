/**
 * Something that holds a resource (a subscription, a handler, a list entry, …)
 * which has to be released explicitly.
 */
export interface IDisposable {
  /**
   * Releases the held resource. Implementations should be safe to call more than
   * once.
   * @returns a promise that settles once the resource has been released.
   */
  dispose(): Promise<void>;
}
