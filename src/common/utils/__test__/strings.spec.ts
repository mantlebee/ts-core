import {
  formatString,
  generateGuid,
  isEmail,
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
      describe("isEmail", () => {
        it("Item is an email", () => {
          const validEmails = [
            "vincenzo.bautista@live.info",
            "dominic.johnston@live.co.uk",
            "mysite@ourearth.com",
            "my.ownsite@ourearth.org",
            "mysite@you.me.net",
          ];
          expect(validEmails.every(isEmail)).toBeTruthy();
        });
        it("Item is not an email", () => {
          const invalidEmails = [
            "mysite.ourearth.com",
            "mysite@.com.my",
            "@you.me.net",
            "mysite123@gmail.b",
            "mysite@.org.org",
            ".mysite@mysite.org",
            "mysite()*@gmail.com",
            "mysite..1234@yahoo.com",
          ];
          expect(invalidEmails.every(isEmail)).toBeFalsy();
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
