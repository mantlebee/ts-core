import { getLowercaseChars, getNumberChars, getUppercaseChars } from "../chars";
import {
  formatString,
  generateGuid,
  generateRandomString,
  isGuid,
  isString,
} from "../strings";

describe("common", () => {
  describe("utils", () => {
    describe("strings", () => {
      describe("formatString", () => {
        it("Replaces placeholders with given data", () => {
          const formattedString = formatString(
            "Hi {0}, this is {1}!",
            "John",
            "Jane"
          );
          expect(formattedString).toBe("Hi John, this is Jane!");
        });
        it("Same placeholder is replaced by the same data", () => {
          const formattedString = formatString(
            "Hi {0}, this is {1}. Goodbye, {0}.",
            "John",
            "Jane"
          );
          expect(formattedString).toBe("Hi John, this is Jane. Goodbye, John.");
        });
      });
      describe("generateGuid", () => {
        it("Generates a guid", () => {
          const guid = generateGuid();
          expect(isGuid(guid)).toBeTruthy();
        });
      });
      describe("generateRandomString", () => {
        it("Generates `aaa`", () => {
          const random = generateRandomString("a", 3);
          expect(random).toBe("aaa");
        });
        it("Generates a string of 5 numbers", () => {
          const chars = getNumberChars();
          const random = generateRandomString(chars, 5);
          expect(/^[0-9]{5}$/.test(random)).toBeTruthy();
        });
        it("Generates a string of 10 letters, upper and lower case", () => {
          const chars = getLowercaseChars() + getUppercaseChars();
          const random = generateRandomString(chars, 10);
          expect(/^([a-z]|[A-Z]){10}$/.test(random)).toBeTruthy();
        });
      });
      describe("isGuid", () => {
        it("Item is a GUID", () => {
          const is = isGuid("4840f4e3-7e5e-4ed8-9066-5a6673b940b6");
          expect(is).toBeTruthy();
        });
        it("Item is a GUID, case sensitive search", () => {
          const is = isGuid("4840f4e3-7e5e-4ed8-9066-5a6673b940B6");
          expect(is).toBeTruthy();
        });
        it("Item is not a GUID", () => {
          const is = isGuid("4840f4e37e5e4ed890665a6673b940B6");
          expect(is).toBeFalsy();
        });
      });
      describe("isString", () => {
        it("Item is a string", () => {
          const is = isString("Hello, World!");
          expect(is).toBeTruthy();
        });
        it("Item is not a string", () => {
          const is = isString(5);
          expect(is).toBeFalsy();
        });
      });
    });
  });
});
