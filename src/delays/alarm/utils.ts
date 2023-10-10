/**
 * Get the time delta between an expiration date and now.
 * @param expiration Expiration date.
 * @returns the time delta between expiration and now.
 */
export function getExpirationDelta(expiration: Date): number {
  return expiration.getTime() - Date.now();
}
