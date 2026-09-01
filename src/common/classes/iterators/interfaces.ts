import { Any } from "@/common";

/**
 * A minimal forward cursor over a list.
 * @typeParam TItem Type of the iterated items; defaults to {@link Any}.
 */
export interface IIterator<TItem = Any> {
  /**
   * Returns the item at the current position.
   * @returns the current item.
   */
  getCurrent(): TItem;
  /** Advances the cursor by one position. */
  goNext(): void;
  /**
   * Tells whether {@link getCurrent} still points at a valid item.
   * @returns true while the current position is within the list.
   */
  hasMore(): boolean;
}
