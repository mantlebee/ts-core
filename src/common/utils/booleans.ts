import { Any } from "@/common";

/**
 * Generates a random boolean value.
 * @returns a random boolean value.
 */
export function generateRandomBoolean(): boolean {
  return Math.random() >= 0.5;
}

/**
 * Checks if arg is a boolean.
 * @param arg Item to check.
 * @returns true if arg is a boolean.
 */
export function isBoolean(arg: Any): boolean {
  return typeof arg === "boolean";
}
