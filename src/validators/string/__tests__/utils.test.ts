import { StringValidationMessages } from "../constants";
import { StringValidator } from "../models";
import { stringValidatorDelegate } from "../utils";

const valid = { isValid: true };
const invalid = (...messages: StringValidationMessages[]) => ({
  isValid: false,
  messages,
});

describe("validators", () => {
  describe("string", () => {
    describe("stringValidatorDelegate", () => {
      describe("required", () => {
        it("Valid, if empty and without options or not required", async () => {
          await expect(stringValidatorDelegate("")).resolves.toEqual(valid);
          await expect(
            stringValidatorDelegate("", { required: false })
          ).resolves.toEqual(valid);
        });
        it("Valid, if required and populated", async () => {
          await expect(
            stringValidatorDelegate("abc", { required: true })
          ).resolves.toEqual(valid);
        });
        it("Invalid, if required and empty, after trim too", async () => {
          await expect(
            stringValidatorDelegate("", { required: true })
          ).resolves.toEqual(invalid(StringValidationMessages.required));
          await expect(
            stringValidatorDelegate(" ", { required: true })
          ).resolves.toEqual(invalid(StringValidationMessages.required));
        });
        it("Handles null and undefined as empty", async () => {
          const empty = null as unknown as string;
          await expect(stringValidatorDelegate(empty)).resolves.toEqual(valid);
          await expect(
            stringValidatorDelegate(empty, { required: true })
          ).resolves.toEqual(invalid(StringValidationMessages.required));
        });
        it("Is checked first: if it fails, the other options are ignored", async () => {
          await expect(
            stringValidatorDelegate("", {
              maxLength: 3,
              minLength: 1,
              pattern: /a/,
              required: true,
            })
          ).resolves.toEqual(invalid(StringValidationMessages.required));
        });
        it("Empty values not required skip the other options", async () => {
          await expect(
            stringValidatorDelegate("", { minLength: 3, pattern: /a/ })
          ).resolves.toEqual(valid);
        });
      });
      describe("maxLength", () => {
        it("Valid, if chars are not more than max", async () => {
          await expect(
            stringValidatorDelegate("abc", { maxLength: 3 })
          ).resolves.toEqual(valid);
        });
        it("Invalid, if chars are more than max", async () => {
          await expect(
            stringValidatorDelegate("abcd", { maxLength: 3 })
          ).resolves.toEqual(invalid(StringValidationMessages.maxLength));
        });
      });
      describe("minLength", () => {
        it("Valid, if chars are not less than min", async () => {
          await expect(
            stringValidatorDelegate("abc", { minLength: 3 })
          ).resolves.toEqual(valid);
        });
        it("Invalid, if chars are less than min", async () => {
          await expect(
            stringValidatorDelegate("ab", { minLength: 3 })
          ).resolves.toEqual(invalid(StringValidationMessages.minLength));
        });
      });
      describe("pattern", () => {
        it("Valid, if matches the pattern", async () => {
          await expect(
            stringValidatorDelegate("A0", { pattern: /^[A-Z][0-9]$/ })
          ).resolves.toEqual(valid);
        });
        it("Invalid, if doesn't match the pattern", async () => {
          await expect(
            stringValidatorDelegate("0A", { pattern: /^[A-Z][0-9]$/ })
          ).resolves.toEqual(invalid(StringValidationMessages.pattern));
        });
        it("If it fails, the lengths are not checked", async () => {
          await expect(
            stringValidatorDelegate("A", {
              maxLength: 3,
              minLength: 2,
              pattern: /[0-9]/,
            })
          ).resolves.toEqual(invalid(StringValidationMessages.pattern));
        });
        it("If it passes, the lengths are checked too", async () => {
          await expect(
            stringValidatorDelegate("A1234", { maxLength: 3, pattern: /[0-9]/ })
          ).resolves.toEqual(invalid(StringValidationMessages.maxLength));
        });
        it("Global regexes give the same result on every call", async () => {
          const options = { pattern: /[0-9]/g };
          await expect(stringValidatorDelegate("A1", options)).resolves.toEqual(
            valid
          );
          await expect(stringValidatorDelegate("A1", options)).resolves.toEqual(
            valid
          );
        });
      });
    });
    describe("StringValidator", () => {
      it("Is not required by default", async () => {
        await expect(new StringValidator().validate("")).resolves.toEqual(valid);
      });
      it("Uses the given options", async () => {
        const validator = new StringValidator({ required: true });
        await expect(validator.validate("")).resolves.toEqual(
          invalid(StringValidationMessages.required)
        );
      });
    });
  });
});
