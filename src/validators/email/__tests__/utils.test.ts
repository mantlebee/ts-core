import { EmailValidationMessages } from "../constants";
import { EmailValidator } from "../models";
import { emailValidatorDelegate } from "../utils";

describe("validators", () => {
  describe("email", () => {
    describe("emailValidatorDelegate", () => {
      it("Valid, if email", async () => {
        await expect(
          emailValidatorDelegate("john.doe@foo.bar")
        ).resolves.toEqual({ isValid: true });
      });
      it("Invalid, if not email", async () => {
        await expect(emailValidatorDelegate("john.doe")).resolves.toEqual({
          isValid: false,
          messages: [EmailValidationMessages.invalid],
        });
      });
      it("Valid, if empty and not required", async () => {
        await expect(emailValidatorDelegate("")).resolves.toEqual({
          isValid: true,
        });
      });
      it("Invalid, if empty and required", async () => {
        await expect(
          emailValidatorDelegate("", { required: true })
        ).resolves.toEqual({
          isValid: false,
          messages: [EmailValidationMessages.required],
        });
      });
    });
    describe("EmailValidator", () => {
      it("Uses the given options", async () => {
        const validator = new EmailValidator({ required: true });
        const { isValid, messages } = await validator.validate("");
        expect(isValid).toBe(false);
        expect(messages).toEqual([EmailValidationMessages.required]);
      });
    });
  });
});
