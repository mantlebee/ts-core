import { getLowerCaseChars, getNumberChars, getUpperCaseChars } from "../chars";
import { formatString, generateRandomString } from "../strings";

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
          const chars = getLowerCaseChars() + getUpperCaseChars();
          const random = generateRandomString(chars, 10);
          expect(/^([a-z]|[A-Z]){10}$/.test(random)).toBeTruthy();
        });
      });
    });
  });
});
