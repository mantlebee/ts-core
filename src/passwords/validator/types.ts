import { List } from "@/common";
import { ValidatorOptions } from "@/validators";

import { IPasswordRequirement } from "../interfaces";

/**
 * Options of {@link passwordValidatorDelegate}.
 */
export type PasswordValidatorOptions = ValidatorOptions & {
  /** Requirements of the password, default {@link PasswordRequirementsDefault}. */
  requirements?: List<IPasswordRequirement>;
};
