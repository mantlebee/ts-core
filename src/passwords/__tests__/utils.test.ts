import { PasswordRequirementsDefaultNames } from "../constants";
import { PasswordRequirementIncludesNumber } from "../requirements";
import { PasswordRequirementsDefault, validatePassword } from "../utils";
import { PasswordValidator } from "../validator";

describe("passwords", () => {
  describe("validatePassword", () => {
    it("Invalid, if at least one default requirement isn't satisfied", () => {
      expect(validatePassword("password123?!").isValid).toBe(false);
      expect(validatePassword("PASSWORD123?!").isValid).toBe(false);
      expect(validatePassword("Password123").isValid).toBe(false);
      expect(validatePassword("Password?!").isValid).toBe(false);
      expect(validatePassword("Password 123 ?!").isValid).toBe(false);
      expect(validatePassword("Pa1!").isValid).toBe(false);
    });
    it("Valid, if every default requirement is satisfied", () => {
      expect(validatePassword("Password123?!")).toEqual({ isValid: true });
    });
    it("Messages are the names of the unsatisfied requirements", () => {
      expect(validatePassword("password?!").messages).toEqual([
        PasswordRequirementsDefaultNames.uppercaseLetter,
        PasswordRequirementsDefaultNames.number,
      ]);
    });
    it("Uses the given requirements", () => {
      expect(
        validatePassword("1", [new PasswordRequirementIncludesNumber()])
      ).toEqual({ isValid: true });
    });
  });
  describe("PasswordRequirementsDefault", () => {
    it("Returns a new list on every call", () => {
      expect(PasswordRequirementsDefault()).not.toBe(
        PasswordRequirementsDefault()
      );
    });
  });
  describe("PasswordValidator", () => {
    it("Uses the default requirements, without options", async () => {
      const validator = new PasswordValidator();
      await expect(validator.validate("Password_123")).resolves.toEqual({
        isValid: true,
      });
      const { isValid } = await validator.validate("password");
      expect(isValid).toBe(false);
    });
    it("Empty values are invalid only if required", async () => {
      await expect(new PasswordValidator().validate("")).resolves.toEqual({
        isValid: true,
      });
      const { isValid } = await new PasswordValidator({
        required: true,
      }).validate("");
      expect(isValid).toBe(false);
    });
    it("Uses the given requirements", async () => {
      const validator = new PasswordValidator({
        requirements: [new PasswordRequirementIncludesNumber()],
      });
      await expect(validator.validate("1")).resolves.toEqual({ isValid: true });
    });
  });
});
