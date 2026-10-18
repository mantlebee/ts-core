import { UrlValidationMessages } from "../constants";
import { UrlValidator } from "../models";
import { urlValidatorDelegate } from "../utils";

const valid = { isValid: true };

describe("validators", () => {
  describe("url", () => {
    describe("urlValidatorDelegate", () => {
      it("Valid, if url", async () => {
        await expect(urlValidatorDelegate("https://example.com")).resolves.toEqual(
          valid
        );
      });
      it("Invalid, if simple string", async () => {
        await expect(urlValidatorDelegate("abc")).resolves.toEqual({
          isValid: false,
          messages: [UrlValidationMessages.invalidUrl],
        });
      });
      it("Valid, if empty and not required", async () => {
        await expect(urlValidatorDelegate("")).resolves.toEqual(valid);
        await expect(urlValidatorDelegate(" ")).resolves.toEqual(valid);
      });
      it("Invalid, if required and empty, after trim too", async () => {
        const invalid = {
          isValid: false,
          messages: [UrlValidationMessages.required],
        };
        await expect(
          urlValidatorDelegate("", { required: true })
        ).resolves.toEqual(invalid);
        await expect(
          urlValidatorDelegate(" ", { required: true })
        ).resolves.toEqual(invalid);
      });
    });
    describe("UrlValidator", () => {
      it("Uses the given options", async () => {
        const validator = new UrlValidator({ required: true });
        await expect(validator.validate("https://example.com")).resolves.toEqual(
          valid
        );
      });
    });
  });
});
