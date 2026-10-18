import { Undefinable } from "@/common";

/**
 * Returns the key of an enum member, given its value. Works with string and
 * numeric enums (the reverse mapping keys of numeric enums are ignored).
 * @example
 * ```ts
 * enum Colors { red = "R", green = "G" }
 * getEnumKeyByValue(Colors, "G") // "green"
 * enum Steps { first, second }
 * getEnumKeyByValue(Steps, 1)    // "second"
 * ```
 * @typeParam TEnum Type of the enum.
 * @param enumObject Enum to look into.
 * @param value Value of the member.
 * @returns the key of the member, or `undefined` if no member has that value.
 */
export function getEnumKeyByValue<TEnum extends object>(
  enumObject: TEnum,
  value: TEnum[keyof TEnum]
): Undefinable<string> {
  return Object.keys(enumObject).find(
    (key) =>
      !/^\d+$/.test(key) && enumObject[key as keyof TEnum] === value
  );
}
