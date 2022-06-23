let debug = false;
export function isDebug(value?: boolean): boolean {
  if (value !== undefined) debug = value;
  return debug;
}
