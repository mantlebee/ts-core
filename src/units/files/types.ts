/**
 * File size formatted for humans.
 */
export type HumanFileSize = {
  /** Unit of measure (`B`, `kB`, `MB`, … or `KiB`, `MiB`, … for IEC). */
  unit: string;
  /** Size in the unit, with the requested decimals. */
  value: string;
};
