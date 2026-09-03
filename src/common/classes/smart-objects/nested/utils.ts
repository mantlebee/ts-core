import { Any, Dictionary, isDefined, NestedObjectOptions } from "@/common";

//#region Private

//#region Options
function getCreateIfMissing(options?: NestedObjectOptions): boolean {
  return Boolean(options?.createIfMissing);
}

function getPathSeparator(options?: NestedObjectOptions): string {
  return options?.pathSeparator ?? ".";
}

function getReplaceIfExists(options?: NestedObjectOptions): boolean {
  return Boolean(options?.replaceIfExists);
}
//#endregion

//#region Traversing
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
 * Walks `obj` through `keys`, stopping as soon as a segment is not traversable.
 * @returns the container the walk ended on, or `undefined` if it was cut short.
 */
function walkTo(obj: Dictionary, keys: string[]): Any {
  let target: Any = obj;
  for (const key of keys) {
    if (!canTraverse(target)) return undefined;
    target = target[key];
  }
  return target;
}
//#endregion
//#endregion

/**
 * Reads the value reached by following `path` through `obj`.
 * @typeParam TValue Expected type of the value; not checked at runtime.
 * @param obj Object to read from.
 * @param path Path to the value.
 * @returns the value at `path`, or `undefined` if a segment is missing or not
 * traversable.
 */
export function getNestedPropertyValue<TValue = Any>(
  obj: Dictionary,
  path: string,
  options?: NestedObjectOptions,
): TValue {
  const pathSeparator = getPathSeparator(options);
  const { leaf, parents } = parsePath(path, pathSeparator);
  const parent = walkTo(obj, parents);
  return (canTraverse(parent) ? parent[leaf] : undefined) as TValue;
}

/**
 * Tells whether `path` resolves to a key that is physically present on its
 * parent, regardless of the value stored there (including `undefined`).
 * @param obj Object to inspect.
 * @param path Path whose final key is checked.
 * @param pathSeparator Separator used to split `path` into segments.
 * @returns true when the final key exists on its parent.
 */
export function hasNestedProperty(
  obj: Dictionary,
  path: string,
  options?: NestedObjectOptions,
): boolean {
  const pathSeparator = getPathSeparator(options);
  const { leaf, parents } = parsePath(path, pathSeparator);
  const parent = walkTo(obj, parents);
  return canTraverse(parent) && leaf in parent;
}

/**
 * Writes `value` at `path` inside `obj`, mutating it in place.
 *
 * The parent chain is validated first: when an intermediate segment cannot be
 * traversed and the options do not allow fixing it (`createIfMissing` for an
 * absent segment, `replaceIfExists` for a present-but-non-traversable one), the
 * write is abandoned and `obj` is left **completely** untouched — never
 * partially mutated. A container created to fill a gap is an array when the
 * following segment is a numeric index, otherwise a plain object.
 * @typeParam TValue Type of the value to write.
 * @param obj Object to write into.
 * @param path Path to write to.
 * @param value Value to store at `path`.
 */
export function setNestedPropertyValue<TValue = Any>(
  obj: Dictionary,
  path: string,
  value: TValue,
  options?: NestedObjectOptions,
): void {
  const createIfMissing = getCreateIfMissing(options);
  const pathSeparator = getPathSeparator(options);
  const replaceIfExists = getReplaceIfExists(options);
  const { leaf, parents } = parsePath(path, pathSeparator);

  // Phase 1 — make sure every parent segment can be reached (by descending,
  // creating or replacing, as the options permit) without touching `obj`, so a
  // write that cannot reach its leaf stays a no-op.
  let probe: Any = obj;
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
  let target: Any = obj;
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
 * Deletes the key reached by `path` from `obj`; does nothing when an
 * intermediate segment cannot be traversed.
 * @param obj Object to delete from.
 * @param path Path whose final key is deleted.
 * @param pathSeparator Separator used to split `path` into segments.
 */
export function unsetNestedProperty(
  obj: Dictionary,
  path: string,
  options?: NestedObjectOptions,
): void {
  const pathSeparator = getPathSeparator(options);
  const { leaf, parents } = parsePath(path, pathSeparator);
  const parent = walkTo(obj, parents);
  if (canTraverse(parent)) delete parent[leaf];
}
