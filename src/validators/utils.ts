import { List } from "@/common";

import { Validation } from "./types";

/**
 * Collects the errors of a validation, to build a {@link Validation}.
 * @example
 * ```ts
 * const { error, resolve } = createValidationCollector();
 * if (!value) error("empty");
 * return resolve(); // Promise<{ isValid: false, messages: ["empty"] }>
 * ```
 * @returns `error`, to add an error message, and `resolve`, to get the result.
 */
export function createValidationCollector() {
  const messages: List<string> = [];
  const error = (message: string) => {
    messages.push(message);
  };
  const resolve = (): Promise<Validation> =>
    Promise.resolve(
      messages.length ? { isValid: false, messages } : { isValid: true }
    );
  return { error, resolve };
}

/**
 * Merges many validations in one: it is valid only if all of them are valid,
 * and its messages are the messages of all of them.
 * @param validations Validations to merge.
 * @returns the merged validation.
 */
export function mergeValidations(validations: List<Validation>): Validation {
  const merged: Validation = { isValid: true };
  validations.forEach((a) => {
    merged.isValid = merged.isValid && a.isValid;
    if (a.messages) {
      if (!merged.messages) merged.messages = [];
      merged.messages.push(...a.messages);
    }
  });
  return merged;
}
