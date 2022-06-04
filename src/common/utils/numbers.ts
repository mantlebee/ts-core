/**
 * Generates a random integer number between the given min and max values.
 * @param min Minimum number that can be generated.
 * @param max Maximum number that can be generated.
 * @returns a random number between min and max.
 */
export function generateRandomNumber(min = 0, max = 1): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
