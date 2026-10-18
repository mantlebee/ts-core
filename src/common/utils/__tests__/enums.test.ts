import { getEnumKeyByValue } from "../enums";

enum NumericEnum {
  first,
  second,
}
enum StringEnum {
  red = "R",
  green = "G",
}

describe("common", () => {
  describe("utils", () => {
    describe("enums", () => {
      describe("getEnumKeyByValue", () => {
        it("Returns the key of a numeric enum member", () => {
          expect(getEnumKeyByValue(NumericEnum, NumericEnum.first)).toBe(
            "first"
          );
          expect(getEnumKeyByValue(NumericEnum, NumericEnum.second)).toBe(
            "second"
          );
        });
        it("Returns the key of a string enum member", () => {
          expect(getEnumKeyByValue(StringEnum, StringEnum.green)).toBe("green");
        });
        it("Returns undefined if no member has the value", () => {
          expect(getEnumKeyByValue(StringEnum, "X" as StringEnum)).toBeUndefined();
        });
      });
    });
  });
});
