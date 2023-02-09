export function getExpirationDelta(expiration: Date): number {
  return expiration.getTime() - Date.now();
}
