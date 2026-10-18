import { IValidator } from "./interfaces";
import { Validation, ValidatorDelegate, ValidatorOptions } from "./types";

/**
 * {@link IValidator} that binds a {@link ValidatorDelegate} to a set of options.
 * @typeParam TValue Type of the value.
 * @typeParam TOptions Type of the validation options.
 */
export class Validator<TValue, TOptions = ValidatorOptions>
  implements IValidator<TValue>
{
  /**
   * @param validateDelegate Function that validates the value.
   * @param options Options passed to the delegate on every validation.
   */
  public constructor(
    protected readonly validateDelegate: ValidatorDelegate<TValue, TOptions>,
    protected readonly options?: TOptions
  ) {}

  public validate(value: TValue): Promise<Validation> {
    return this.validateDelegate(value, this.options);
  }
}
