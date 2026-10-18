import { List } from "@/common";
import { requirementsValidatorDelegate, Validation } from "@/validators";

import { IPasswordRequirement } from "./interfaces";
import {
  PasswordRequirementIncludesLowercaseLetter,
  PasswordRequirementIncludesNumber,
  PasswordRequirementIncludesSymbol,
  PasswordRequirementIncludesUppercaseLetter,
  PasswordRequirementLength,
  PasswordRequirementNoWhitespaces,
} from "./requirements";

/**
 * Creates the requirements of a common password policy:
 * - between 8 and 30 chars long;
 * - at least a lowercase letter;
 * - at least an uppercase letter;
 * - at least a number;
 * - at least a symbol;
 * - no whitespaces.
 * @returns a new list of requirements.
 */
export const PasswordRequirementsDefault = (): List<IPasswordRequirement> => [
  new PasswordRequirementLength(8, 30),
  new PasswordRequirementIncludesLowercaseLetter(),
  new PasswordRequirementIncludesUppercaseLetter(),
  new PasswordRequirementIncludesNumber(),
  new PasswordRequirementIncludesSymbol(),
  new PasswordRequirementNoWhitespaces(),
];

/**
 * Checks a password against a list of requirements.
 * @param password Password to check.
 * @param requirements Requirements, default {@link PasswordRequirementsDefault}.
 * @returns a validation whose messages are the names of the unsatisfied requirements.
 */
export function validatePassword(
  password: string,
  requirements: List<IPasswordRequirement> = PasswordRequirementsDefault()
): Validation {
  return requirementsValidatorDelegate(password, requirements);
}
