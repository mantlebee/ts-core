import { List } from "@/common";

import { Validation } from "../types";
import { IRequirement } from "./interfaces";

/**
 * Checks a value against a list of requirements, synchronously.
 * @typeParam TValue Type of the value.
 * @param value Value to check.
 * @param requirements Requirements the value must satisfy.
 * @returns a validation whose messages are the names of the unsatisfied requirements.
 */
export function requirementsValidatorDelegate<TValue = string>(
  value: TValue,
  requirements: List<IRequirement<TValue>>
): Validation {
  const unsatisfiedRequirements = requirements.filter((a) => !a.validate(value));
  return unsatisfiedRequirements.length
    ? { isValid: false, messages: unsatisfiedRequirements.map((a) => a.name) }
    : { isValid: true };
}
