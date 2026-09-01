import { Any } from "@/common";

/**
 * The `resolve` / `reject` functions of a single `Promise`, captured so the
 * promise can be settled from elsewhere.
 * @typeParam TValue Type the promise resolves with.
 */
export type PromiseResolvers<TValue = Any> = {
  /** Rejects the promise with the given reason. */
  reject(reason?: Any): void;
  /** Resolves the promise with the given value. */
  resolve(value: TValue): void;
};
