/**
 * Named, synchronous check on a value. When it fails, its {@link name} is used
 * as validation message.
 * @typeParam TValue Type of the value.
 */
export interface IRequirement<TValue = string> {
  /** Name of the requirement, used as validation message. */
  readonly name: string;
  /**
   * Checks the value.
   * @param value Value to check.
   * @returns true if the value satisfies the requirement.
   */
  validate(value: TValue): boolean;
}
