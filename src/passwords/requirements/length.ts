import { PasswordRequirementsDefaultNames } from "../constants";
import { PasswordRequirement } from "../models";

/**
 * The password length must be between a minimum and an optional maximum.
 */
export class PasswordRequirementLength extends PasswordRequirement {
  /**
   * @param minLength Minimum length, included.
   * @param maxLength Maximum length, included. If missing, there is no maximum.
   */
  public constructor(
    public readonly minLength: number,
    public readonly maxLength?: number
  ) {
    super(
      PasswordRequirementsDefaultNames.length,
      new RegExp(`^.{${minLength},${maxLength ?? ""}}$`)
    );
  }
}
