import { Any, Dictionary, isDefined } from "@/common";

/** True when `value` is a non-null object or array: something we can index into. */
function canTraverse(value: Any): value is Dictionary {
  return value !== null && typeof value === "object";
}

/** True when `key` reads as a non-negative integer, i.e. an array index. */
function isArrayIndex(key: string | undefined): boolean {
  return key !== undefined && /^\d+$/.test(key);
}

/**
 * Splits `path` into the intermediate segments to walk through (`parents`) and
 * the final segment to act on (`leaf`).
 */
function parsePath(
  path: string,
  pathSeparator: string,
): { leaf: string; parents: string[] } {
  const segments = path.split(pathSeparator);
  const leaf = segments.pop() as string;
  return { leaf, parents: segments };
}

/**
 * Walks `data` through `keys`, stopping as soon as a segment is not traversable.
 * @returns the container the walk ended on, or `undefined` if it was cut short.
 */
function walkTo(data: Dictionary, keys: string[]): Any {
  let target: Any = data;
  for (const key of keys) {
    if (!canTraverse(target)) return undefined;
    target = target[key];
  }
  return target;
}

/**
 * Reads the value reached by following `path` through `data`.
 * @typeParam TValue Expected type of the value; not checked at runtime.
 * @param data Object to read from.
 * @param path Path to the value.
 * @param pathSeparator Separator used to split `path` into segments.
 * @returns the value at `path`, or `undefined` if a segment is missing or not
 * traversable.
 */
export function getDataValue<TValue = Any>(
  data: Dictionary,
  path: string,
  pathSeparator: string,
): TValue {
  const { leaf, parents } = parsePath(path, pathSeparator);
  const parent = walkTo(data, parents);
  return (canTraverse(parent) ? parent[leaf] : undefined) as TValue;
}

/**
 * Tells whether `path` resolves to a key that is physically present on its
 * parent, regardless of the value stored there (including `undefined`).
 * @param data Object to inspect.
 * @param path Path whose final key is checked.
 * @param pathSeparator Separator used to split `path` into segments.
 * @returns true when the final key exists on its parent.
 */
export function hasDataValue(
  data: Dictionary,
  path: string,
  pathSeparator: string,
): boolean {
  const { leaf, parents } = parsePath(path, pathSeparator);
  const parent = walkTo(data, parents);
  return canTraverse(parent) && leaf in parent;
}

/**
 * Writes `value` at `path` inside `data`, mutating it in place.
 *
 * The parent chain is validated first: when an intermediate segment cannot be
 * traversed and the options do not allow fixing it (`createIfMissing` for an
 * absent segment, `replaceIfExists` for a present-but-non-traversable one), the
 * write is abandoned and `data` is left **completely** untouched — never
 * partially mutated. A container created to fill a gap is an array when the
 * following segment is a numeric index, otherwise a plain object.
 * @typeParam TValue Type of the value to write.
 * @param data Object to write into.
 * @param path Path to write to.
 * @param value Value to store at `path`.
 * @param pathSeparator Separator used to split `path` into segments.
 * @param createIfMissing Whether to create missing intermediate containers.
 * @param replaceIfExists Whether to replace an existing non-traversable segment.
 */
export function setDataValue<TValue = Any>(
  data: Dictionary,
  path: string,
  value: TValue,
  pathSeparator: string,
  createIfMissing: boolean,
  replaceIfExists: boolean,
): void {
  const { leaf, parents } = parsePath(path, pathSeparator);

  // Phase 1 — make sure every parent segment can be reached (by descending,
  // creating or replacing, as the options permit) without touching `data`, so a
  // write that cannot reach its leaf stays a no-op.
  let probe: Any = data;
  for (let i = 0; i < parents.length; i++) {
    const child = canTraverse(probe) ? probe[parents[i]] : undefined;
    if (canTraverse(child)) {
      probe = child;
      continue;
    }
    const isMissing = !isDefined(child);
    if (isMissing ? !createIfMissing : !replaceIfExists) return;
    // This segment will be (re)created as an empty container, so every deeper
    // segment is missing too and would itself need `createIfMissing`.
    if (!createIfMissing && i < parents.length - 1) return;
    probe = undefined;
  }

  // Phase 2 — descend for real, creating the containers phase 1 approved.
  let target: Any = data;
  for (let i = 0; i < parents.length; i++) {
    const key = parents[i];
    if (!canTraverse(target[key])) {
      target[key] = isArrayIndex(parents[i + 1] ?? leaf) ? [] : {};
    }
    target = target[key];
  }
  target[leaf] = value;
}

/**
 * Deletes the key reached by `path` from `data`; does nothing when an
 * intermediate segment cannot be traversed.
 * @param data Object to delete from.
 * @param path Path whose final key is deleted.
 * @param pathSeparator Separator used to split `path` into segments.
 */
export function unsetDataValue(
  data: Dictionary,
  path: string,
  pathSeparator: string,
): void {
  const { leaf, parents } = parsePath(path, pathSeparator);
  const parent = walkTo(data, parents);
  if (canTraverse(parent)) delete parent[leaf];
}
