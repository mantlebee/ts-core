/** Something that holds a resource (subscription, handler, …) to be released. */
export interface IDisposable {
  dispose(): Promise<void>;
}

/** Something that holds a memento to be restored. */
export interface IRestorable {
  restore(): Promise<void>;
}
