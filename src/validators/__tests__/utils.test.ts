import { RegexRequirement, RequirementsValidator } from "../requirements";
import { requirementsValidatorDelegate } from "../requirements";
import { createValidationCollector, mergeValidations } from "../utils";

describe("validators", () => {
  describe("utils", () => {
    describe("createValidationCollector", () => {
      it("Resolves a valid validation, without messages, if no error is collected", async () => {
        const { resolve } = createValidationCollector();
        await expect(resolve()).resolves.toEqual({ isValid: true });
      });
      it("Resolves an invalid validation with the collected messages", async () => {
        const { error, resolve } = createValidationCollector();
        error("first");
        error("second");
        await expect(resolve()).resolves.toEqual({
          isValid: false,
          messages: ["first", "second"],
        });
      });
    });
    describe("mergeValidations", () => {
      it("Is valid only if every validation is valid, and merges the messages", () => {
        expect(mergeValidations([{ isValid: true }, { isValid: true }])).toEqual(
          { isValid: true }
        );
        expect(
          mergeValidations([
            { isValid: false, messages: ["a"] },
            { isValid: true },
            { isValid: false, messages: ["b"] },
          ])
        ).toEqual({ isValid: false, messages: ["a", "b"] });
      });
    });
  });
  describe("requirements", () => {
    const requirements = [
      new RegexRequirement("startsWithLowercase", /^[a-z]/),
      new RegexRequirement("includesAt", /@/g),
      { name: "length3to16", validate: (a: string) => /^.{3,16}$/.test(a) },
    ];
    describe("requirementsValidatorDelegate", () => {
      it("Valid, if every requirement is satisfied", () => {
        expect(
          requirementsValidatorDelegate("john.doe@foo.bar", requirements)
        ).toEqual({ isValid: true });
      });
      it("Invalid, with the names of the unsatisfied requirements", () => {
        expect(requirementsValidatorDelegate("John.doe", requirements)).toEqual({
          isValid: false,
          messages: ["startsWithLowercase", "includesAt"],
        });
      });
    });
    describe("RegexRequirement", () => {
      it("Global regexes give the same result on every call", () => {
        const requirement = new RegexRequirement("includesAt", /@/g);
        expect(requirement.validate("a@b")).toBe(true);
        expect(requirement.validate("a@b")).toBe(true);
      });
    });
    describe("RequirementsValidator", () => {
      it("Validates asynchronously against its requirements", async () => {
        const validator = new RequirementsValidator(requirements);
        await expect(validator.validate("john@doe")).resolves.toEqual({
          isValid: true,
        });
      });
    });
  });
});
