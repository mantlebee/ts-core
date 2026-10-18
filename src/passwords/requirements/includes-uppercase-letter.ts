import { PasswordRequirementsDefaultNames } from "../constants";
import { PasswordRequirement } from "../models";

/**
 * The password must include at least an uppercase letter (`A-Z`).
 */
export class PasswordRequirementIncludesUppercaseLetter extends PasswordRequirement {
  public constructor() {
    super(
      PasswordRequirementsDefaultNames.uppercaseLetter,
      /[A-Z]/,
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
  }
}
