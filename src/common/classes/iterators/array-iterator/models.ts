import { Any, List } from "@/common";

import { IIterator } from "../interfaces";

/**
 * {@link IIterator} implementation backed by an array. It walks the array
 * forward from index 0; the array is held by reference and never copied.
 * @typeParam TItem Type of the iterated items; defaults to {@link Any}.
 */
export class ArrayIterator<TItem = Any> implements IIterator<TItem> {
  /** Index {@link getCurrent} reads from and {@link goNext} advances. */
  protected currentIndex = 0;
  /** The wrapped array, held by reference. */
  protected items: List<TItem>;

  /**
   * @param items Array to iterate over; used by reference, not copied.
   */
  public constructor(items: List<TItem>) {
    this.items = items;
  }

  /**
   * Returns the item at the current position, or `undefined` once the end has
   * been passed.
   * @returns the current item.
   */
  public getCurrent(): TItem {
    return this.items[this.currentIndex];
  }

  /** Advances the cursor by one position. */
  public goNext(): void {
    ++this.currentIndex;
  }

  /**
   * Tells whether {@link getCurrent} still points at a valid item.
   * @returns true while the current position is within the array bounds.
   */
  public hasMore(): boolean {
    return this.currentIndex < this.items.length;
  }
}
