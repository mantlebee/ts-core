import { StringValidationMessages } from "../../string";
import { ConfirmStringValidationMessages } from "../constants";
import { ConfirmStringValidator } from "../models";

describe("validators", () => {
  describe("confirm-string", () => {
    describe("ConfirmStringValidator", () => {
      const validator = new ConfirmStringValidator(() => "secret");
      it("Valid, if equal to the source string", async () => {
        await expect(validator.validate("secret")).resolves.toEqual({
          isValid: true,
        });
      });
      it("Invalid, if different from the source string", async () => {
        await expect(validator.validate("other")).resolves.toEqual({
          isValid: false,
          messages: [ConfirmStringValidationMessages.stringsMismatch],
        });
      });
      it("Invalid, if empty", async () => {
        await expect(validator.validate("")).resolves.toEqual({
          isValid: false,
          messages: [StringValidationMessages.required],
        });
      });
    });
  });
});
