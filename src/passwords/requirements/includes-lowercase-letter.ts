import { PasswordRequirementsDefaultNames } from "../constants";
import { PasswordRequirement } from "../models";

/**
 * The password must include at least a lowercase letter (`a-z`).
 */
export class PasswordRequirementIncludesLowercaseLetter extends PasswordRequirement {
  public constructor() {
    super(
      PasswordRequirementsDefaultNames.lowercaseLetter,
      /[a-z]/,
      "abcdefghijklmnopqrstuvwxyz"
    );
  }
}
