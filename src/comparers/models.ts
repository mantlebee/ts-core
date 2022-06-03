import { IComparer } from "./interface";

/**
 * This is the default implementation of the comparer interface used
 * to perform the comparison of two objects with the operators: <, ===
 * and >.
 */
export class Comparer<T> implements IComparer<T> {
  /**
   * @inheritdoc
   * Perform the comparison with the operators: <, === and >.
   */
  public compare(first: T, second: T): number {
    if (first < second) {
      return -1;
    } else if (first === second) {
      return 0;
    } else {
      return 1;
    }
  }
}
