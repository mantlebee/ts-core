export function getCharsFromCharCodesRange(
  startIndex: number,
  length: number
): string {
  return Array(length)
    .fill(startIndex)
    .map((item, index) => String.fromCharCode(item + index))
    .join("");
}

export function getLowerCaseChars(): string {
  return getCharsFromCharCodesRange(97, 26);
}

export function getNumberChars(): string {
  return getCharsFromCharCodesRange(48, 10);
}

export function getUpperCaseChars(): string {
  return getCharsFromCharCodesRange(65, 26);
}

export function getSpecialChars(): string {
  return (
    getCharsFromCharCodesRange(123, 4) +
    getCharsFromCharCodesRange(94, 3) +
    getCharsFromCharCodesRange(58, 7) +
    getCharsFromCharCodesRange(32, 16)
  );
}
