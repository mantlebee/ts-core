import { RegexRequirement } from "@/validators";

import { IPasswordRequirement } from "./interfaces";

/**
 * {@link IPasswordRequirement} satisfied when the password matches a regex.
 */
export class PasswordRequirement
  extends RegexRequirement
  implements IPasswordRequirement
{
  /**
   * @param name Name of the requirement, used as validation message.
   * @param validateRegex Regex the password must match.
   * @param allowedChars Chars that satisfy the requirement, if any.
   */
  public constructor(
    name: string,
    validateRegex: RegExp,
    public readonly allowedChars?: string
  ) {
    super(name, validateRegex);
  }
}
