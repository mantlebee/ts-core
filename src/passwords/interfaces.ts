import { IRequirement } from "@/validators";

/**
 * Requirement of a password. Besides validating, it describes the chars and
 * the lengths it accepts, so a password generator can produce passwords that
 * satisfy it.
 */
export interface IPasswordRequirement extends IRequirement {
  /**
   * Chars that satisfy the requirement. Missing when the requirement can't be
   * satisfied by adding chars (e.g. a length or a match requirement).
   */
  readonly allowedChars?: string;
  /** Maximum length allowed by the requirement, if any. */
  readonly maxLength?: number;
  /** Minimum length required by the requirement, if any. */
  readonly minLength?: number;
}
