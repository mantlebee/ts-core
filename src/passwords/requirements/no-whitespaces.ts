import { PasswordRequirementsDefaultNames } from "../constants";
import { PasswordRequirement } from "../models";

/**
 * The password must not be empty nor contain whitespaces.
 */
export class PasswordRequirementNoWhitespaces extends PasswordRequirement {
  public constructor() {
    super(PasswordRequirementsDefaultNames.noWhitespaces, /^\S+$/);
  }
}
