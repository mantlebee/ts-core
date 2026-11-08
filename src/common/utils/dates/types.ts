/**
 * Date and time in ISO 8601 format, in UTC: `YYYY-MM-DDTHH:mm:ss.sssZ`, where
 * the milliseconds (`.sss`) are optional. This is the format of
 * `Date.prototype.toISOString` (for years 0–9999) and the one to use for
 * dates exchanged as JSON. It is a plain string at compile time: use
 * {@link isIsoDateTime} to check a value at runtime.
 * @example
 * ```ts
 * const createdAt: IsoDateTime = new Date().toISOString();
 * ```
 */
export type IsoDateTime = string;
