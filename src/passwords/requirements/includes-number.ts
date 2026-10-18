import { PasswordRequirementsDefaultNames } from "../constants";
import { PasswordRequirement } from "../models";

/**
 * The password must include at least a digit (`0-9`).
 */
export class PasswordRequirementIncludesNumber extends PasswordRequirement {
  public constructor() {
    super(PasswordRequirementsDefaultNames.number, /[0-9]/, "0123456789");
  }
}
