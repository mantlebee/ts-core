import { List } from "@/common";

import { IValidator } from "../interfaces";
import { Validation } from "../types";
import { IRequirement } from "./interfaces";
import { requirementsValidatorDelegate } from "./utils";

/**
 * {@link IRequirement} satisfied when the value matches a regex.
 */
export class RegexRequirement implements IRequirement<string> {
  /**
   * @param name Name of the requirement, used as validation message.
   * @param validateRegex Regex the value must match.
   */
  public constructor(
    public readonly name: string,
    protected readonly validateRegex: RegExp
  ) {}

  public validate(value: string): boolean {
    // Global and sticky regexes are stateful: always start from the beginning.
    this.validateRegex.lastIndex = 0;
    return this.validateRegex.test(value);
  }
}

/**
 * {@link IValidator} that checks a value against a list of requirements.
 * @typeParam TValue Type of the value.
 */
export class RequirementsValidator<TValue = string>
  implements IValidator<TValue>
{
  /**
   * @param requirements Requirements the value must satisfy.
   */
  public constructor(
    public readonly requirements: List<IRequirement<TValue>>
  ) {}

  public validate(value: TValue): Promise<Validation> {
    return Promise.resolve(
      requirementsValidatorDelegate(value, this.requirements)
    );
  }
}
