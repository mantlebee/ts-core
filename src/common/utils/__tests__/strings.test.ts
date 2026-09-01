import {
  createHash,
  createSlug,
  formatString,
  generateGuid,
  isEmail,
  isGuid,
  isString,
} from "../strings";

describe("common", () => {
  describe("utils", () => {
    describe("strings", () => {
      describe("createHash", () => {
        it("Returns an 8-character lowercase hex string", () => {
          expect(createHash("anything")).toMatch(/^[0-9a-f]{8}$/);
          expect(createHash({ a: 1 })).toMatch(/^[0-9a-f]{8}$/);
          expect(createHash(undefined)).toMatch(/^[0-9a-f]{8}$/);
        });
        it("Is deterministic across calls", () => {
          expect(createHash("hello")).toBe(createHash("hello"));
          expect(createHash({ id: 1, name: "John" })).toBe(
            createHash({ id: 1, name: "John" }),
          );
        });
        it("Hashes an empty string to all zeros", () => {
          expect(createHash("")).toBe("00000000");
        });
        it("Produces different hashes for different strings", () => {
          expect(createHash("hello")).not.toBe(createHash("world"));
        });
        it("Hashes objects with the same serialization to the same value", () => {
          expect(createHash({ id: 1, name: "John" })).toBe(
            createHash({ id: 1, name: "John" }),
          );
        });
        it("Is sensitive to object key order", () => {
          expect(createHash({ a: 1, b: 2 })).not.toBe(
            createHash({ b: 2, a: 1 }),
          );
        });
        it("Is sensitive to array order", () => {
          expect(createHash([1, 2, 3])).not.toBe(createHash([3, 2, 1]));
        });
        it("Hashes strings as-is, without JSON-quoting them", () => {
          // if the string went through JSON.stringify it would gain quotes and
          // match the hash of the explicitly quoted string.
          expect(createHash("hello")).not.toBe(createHash('"hello"'));
        });
        it("Does not throw on non-serializable values", () => {
          expect(() => createHash(undefined)).not.toThrow();
          expect(() => createHash(() => {})).not.toThrow();
          expect(createHash(undefined)).not.toBe(createHash(null));
        });
      });
      describe("createSlug", () => {
        it("Converts a string into a slug.", () => {
          const slug = createSlug("I'm the best ! The niño #1");
          expect(slug).toBe("im-the-best-the-nino-1");
        });
      });
      describe("formatString", () => {
        it("Replaces placeholders with given data", () => {
          const formattedString = formatString(
            "Hi {0}, this is {1}!",
            "John",
            "Jane",
          );
          expect(formattedString).toBe("Hi John, this is Jane!");
        });
        it("Same placeholder is replaced by the same data", () => {
          const formattedString = formatString(
            "Hi {0}, this is {1}. Goodbye, {0}.",
            "John",
            "Jane",
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
