/** Something that holds a memento to be restored. */
export interface IRestorable {
  restore(): Promise<void>;
}
