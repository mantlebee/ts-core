/**
 * This interface is used to make an abstraction on comparision
 * operations.
 */
export interface IComparer<T> {
  /**
   * Make a comparision between the elements passed.
   * @param first  - First element to compare.
   * @param second - Second element to compare.
   * @returns A number to indicate the result of the
   *          comparision:
   *          <ul>
   *              <li>
   *                 &lt 0: First is less than Second
   *              </li>
   *              <li>
   *                 &eq 0: First is equal to Second
   *              </li>
   *              <li>
   *                 &gt 0: First is greater than Second
   *              </li>
   *          </ul>
   */
  compare(first: T, second: T): number;
}
