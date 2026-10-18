import { ValidatorOptions } from "../types";

/**
 * Options of {@link numberValidatorDelegate}.
 */
export type NumberValidatorOptions = ValidatorOptions & {
  /** Maximum value, included. */
  max?: number;
  /** Minimum value, included. */
  min?: number;
};
