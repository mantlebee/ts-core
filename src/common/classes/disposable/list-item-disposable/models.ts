import { List, replaceListItems } from "@/common";

import { IDisposable } from "../interfaces";

/**
 * {@link IDisposable} that, when disposed, removes a specific item from a list.
 *
 * The list is edited in place (its identity is preserved), every occurrence of
 * the item is removed, and matching is by reference (`===`). Disposing more than
 * once is harmless: after the first call the item is already gone.
 * @example
 * ```ts
 * const handlers = [a, b, c];
 * const sub = new ListItemDisposable(b, handlers);
 * await sub.dispose(); // handlers is now [a, c]
 * ```
 */
export class ListItemDisposable implements IDisposable {
  /**
   * @param item Item to remove from the list on dispose; compared by reference.
   * @param list List to remove the item from; mutated in place.
   */
  public constructor(
    protected readonly item: unknown,
    protected readonly list: List<unknown>,
  ) {}

  /**
   * Removes every reference-equal occurrence of the item from the list, keeping
   * the same list instance.
   * @returns a resolved promise once the item has been removed.
   */
  public async dispose(): Promise<void> {
    replaceListItems(
      this.list,
      this.list.filter((a) => a !== this.item),
    );
  }
}
