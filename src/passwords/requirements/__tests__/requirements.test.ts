import { IPasswordRequirement } from "../../interfaces";
import {
  PasswordRequirementIncludesLowercaseLetter,
  PasswordRequirementIncludesNumber,
  PasswordRequirementIncludesSymbol,
  PasswordRequirementIncludesUppercaseLetter,
  PasswordRequirementLength,
  PasswordRequirementMatchPassword,
  PasswordRequirementNoWhitespaces,
} from "..";

const testAllowedChars = (requirement: IPasswordRequirement) => {
  it("Every allowed char satisfies the requirement", () => {
    const chars = requirement.allowedChars!.split("");
    expect(chars.length).toBeGreaterThan(0);
    expect(chars.every((a) => requirement.validate(a))).toBe(true);
  });
};

describe("passwords", () => {
  describe("requirements", () => {
    describe("PasswordRequirementIncludesLowercaseLetter", () => {
      const requirement = new PasswordRequirementIncludesLowercaseLetter();
      testAllowedChars(requirement);
      it("Valid only if includes a lowercase letter, in any position", () => {
        expect(requirement.validate("A1!")).toBe(false);
        expect(requirement.validate("aA1!")).toBe(true);
        expect(requirement.validate("A1!a")).toBe(true);
      });
    });
    describe("PasswordRequirementIncludesUppercaseLetter", () => {
      const requirement = new PasswordRequirementIncludesUppercaseLetter();
      testAllowedChars(requirement);
      it("Valid only if includes an uppercase letter, in any position", () => {
        expect(requirement.validate("a1!")).toBe(false);
        expect(requirement.validate("Aa1!")).toBe(true);
        expect(requirement.validate("a1!A")).toBe(true);
      });
    });
    describe("PasswordRequirementIncludesNumber", () => {
      const requirement = new PasswordRequirementIncludesNumber();
      testAllowedChars(requirement);
      it("Valid only if includes a number, in any position", () => {
        expect(requirement.validate("aA!")).toBe(false);
        expect(requirement.validate("1aA!")).toBe(true);
        expect(requirement.validate("aA!1")).toBe(true);
      });
    });
    describe("PasswordRequirementIncludesSymbol", () => {
      const requirement = new PasswordRequirementIncludesSymbol();
      testAllowedChars(requirement);
      it("Valid only if includes a symbol, in any position", () => {
        expect(requirement.validate("aA1")).toBe(false);
        expect(requirement.validate("!aA1")).toBe(true);
        expect(requirement.validate("aA1!")).toBe(true);
      });
      it("Every symbol is matched literally, the first one too", () => {
        const custom = new PasswordRequirementIncludesSymbol("^a");
        expect(custom.validate("^")).toBe(true);
        expect(custom.validate("b")).toBe(false);
      });
    });
    describe("PasswordRequirementLength", () => {
      it("Invalid, if too short or too long", () => {
        expect(new PasswordRequirementLength(5).validate("aA1!")).toBe(false);
        expect(new PasswordRequirementLength(1, 3).validate("aA1!")).toBe(false);
      });
      it("Valid, if the length is within the limits", () => {
        const requirement = new PasswordRequirementLength(1, 4);
        expect(requirement.validate("a")).toBe(true);
        expect(requirement.validate("aA1!")).toBe(true);
        expect(new PasswordRequirementLength(2).validate("a".repeat(100))).toBe(
          true
        );
      });
      it("Exposes the limits", () => {
        const requirement = new PasswordRequirementLength(8, 30);
        expect(requirement.minLength).toBe(8);
        expect(requirement.maxLength).toBe(30);
        expect(requirement.allowedChars).toBeUndefined();
      });
    });
    describe("PasswordRequirementMatchPassword", () => {
      it("Valid only if equal to the other password, and not empty", () => {
        let other = "Secret1!";
        const requirement = new PasswordRequirementMatchPassword(() => other);
        expect(requirement.validate("Secret1!")).toBe(true);
        expect(requirement.validate("Secret2!")).toBe(false);
        other = "";
        expect(requirement.validate("")).toBe(false);
      });
    });
    describe("PasswordRequirementNoWhitespaces", () => {
      const requirement = new PasswordRequirementNoWhitespaces();
      it("Invalid, if contains whitespaces, in any position", () => {
        expect(requirement.validate(" aA1!")).toBe(false);
        expect(requirement.validate("aA 1!")).toBe(false);
        expect(requirement.validate("aA1! ")).toBe(false);
      });
      it("Valid, if doesn't contain whitespaces", () => {
        expect(requirement.validate("aA1!")).toBe(true);
      });
    });
  });
});
