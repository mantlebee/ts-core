import { NumberValidationMessages } from "../constants";
import { NumberValidator } from "../models";
import { numberValidatorDelegate } from "../utils";

const valid = { isValid: true };
const invalid = (...messages: NumberValidationMessages[]) => ({
  isValid: false,
  messages,
});
const empty = null as unknown as number;

describe("validators", () => {
  describe("number", () => {
    describe("numberValidatorDelegate", () => {
      describe("max", () => {
        it("Valid, if not greater than max", async () => {
          await expect(numberValidatorDelegate(0, { max: 0 })).resolves.toEqual(
            valid
          );
        });
        it("Invalid, if greater than max", async () => {
          await expect(numberValidatorDelegate(1, { max: 0 })).resolves.toEqual(
            invalid(NumberValidationMessages.max)
          );
        });
      });
      describe("min", () => {
        it("Valid, if not less than min", async () => {
          await expect(numberValidatorDelegate(0, { min: 0 })).resolves.toEqual(
            valid
          );
        });
        it("Invalid, if less than min", async () => {
          await expect(numberValidatorDelegate(-1, { min: 0 })).resolves.toEqual(
            invalid(NumberValidationMessages.min)
          );
        });
      });
      describe("required", () => {
        it("Valid, if empty and not required, even with min and max", async () => {
          await expect(numberValidatorDelegate(empty)).resolves.toEqual(valid);
          await expect(
            numberValidatorDelegate(empty, { min: 1, max: 5 })
          ).resolves.toEqual(valid);
        });
        it("Invalid, if empty (null or NaN) and required", async () => {
          await expect(
            numberValidatorDelegate(empty, { required: true })
          ).resolves.toEqual(invalid(NumberValidationMessages.required));
          await expect(
            numberValidatorDelegate(NaN, { required: true })
          ).resolves.toEqual(invalid(NumberValidationMessages.required));
        });
        it("Zero is not empty", async () => {
          await expect(
            numberValidatorDelegate(0, { required: true })
          ).resolves.toEqual(valid);
        });
      });
    });
    describe("NumberValidator", () => {
      it("Uses the given options", async () => {
        const validator = new NumberValidator({ max: 10 });
        await expect(validator.validate(11)).resolves.toEqual(
          invalid(NumberValidationMessages.max)
        );
      });
    });
  });
});
