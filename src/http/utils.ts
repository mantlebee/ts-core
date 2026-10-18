import { List } from "@/common";

/**
 * Joins path segments with the `/` symbol. Each segment is cleaned of leading
 * and trailing `/` symbols before being joined; empty segments are ignored.
 * A leading `/` of the first segment is preserved.
 * @example
 * ```ts
 * createHttpRelativePath("/api/", undefined, "/users/") // "/api/users"
 * ```
 * @param segments Segments to join.
 * @returns a `segment1/segment2/.../segmentN` path.
 */
export function createHttpRelativePath(
  ...segments: List<string | undefined>
): string {
  const validSegments = segments.filter((a): a is string => Boolean(a));
  const path = validSegments
    .map((a) => a.replace(/^\/+/, "").replace(/\/+$/, ""))
    .join("/");
  return validSegments[0]?.startsWith("/") ? `/${path}` : path;
}
