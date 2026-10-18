import { PasswordRequirementsDefaultNames } from "../constants";
import { PasswordRequirement } from "../models";

/**
 * The password must be equal to another one (e.g. the "confirm password"
 * field).
 */
export class PasswordRequirementMatchPassword extends PasswordRequirement {
  /**
   * @param getPassword Returns the password to match.
   */
  public constructor(private readonly getPassword: () => string) {
    super(PasswordRequirementsDefaultNames.matchPassword, /.*/);
  }

  public validate(password: string): boolean {
    return Boolean(password && password === this.getPassword());
  }
}
