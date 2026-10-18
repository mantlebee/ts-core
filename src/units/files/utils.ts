import { HumanFileSize } from "./types";

/**
 * Formats a number of bytes as a human-readable size.
 * See https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
 * @example
 * ```ts
 * getHumanFileSize(1500)          // { unit: "kB", value: "1.50" }
 * getHumanFileSize(1024, 1, true) // { unit: "KiB", value: "1.0" }
 * ```
 * @param bytes Number of bytes.
 * @param decimals Number of decimal places.
 * @param useIEC If true, uses binary (IEC) units, powers of 1024; otherwise
 * metric (SI) units, powers of 1000.
 * @returns the formatted size.
 */
export function getHumanFileSize(
  bytes: number,
  decimals = 2,
  useIEC = false
): HumanFileSize {
  const thresh = useIEC ? 1024 : 1000;
  if (Math.abs(bytes) < thresh) return { unit: "B", value: bytes.toFixed(decimals) };

  const units = useIEC
    ? ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
    : ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const r = 10 ** decimals;
  let value = bytes;
  let u = -1;
  do {
    value /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(value) * r) / r >= thresh &&
    u < units.length - 1
  );
  return { unit: units[u], value: value.toFixed(decimals) };
}
