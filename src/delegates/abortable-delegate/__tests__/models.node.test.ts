/**
 * @jest-environment node
 */
import { AbortedException, isAbortedException } from "../exceptions";
import { AbortableDelegate } from "../models";

type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
};
function defer<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe("delegates", () => {
  describe("abortable-delegate", () => {
    describe("models", () => {
      describe("AbortableDelegate (Node environment, no window)", () => {
        it("runs in an environment where window is not defined", () => {
          expect(typeof window).toBe("undefined");
        });
        it("call() works with the Node AbortSignal: the latest call wins", async () => {
          const deferreds = { a: defer<string>(), b: defer<string>() };
          const signals: AbortSignal[] = [];
          const delegate = new AbortableDelegate(async (signal, name: "a" | "b") => {
            signals.push(signal);
            return deferreds[name].promise;
          });
          const a = delegate.call("a");
          const b = delegate.call("b");
          await expect(a).rejects.toBeInstanceOf(AbortedException);
          expect(signals[0]).toBeInstanceOf(AbortSignal);
          deferreds.b.resolve("B");
          await expect(b).resolves.toBe("B");
        });
        it("the reason of the aborted signal is the AbortedException", async () => {
          let signal!: AbortSignal;
          const delegate = new AbortableDelegate(async (s) => {
            signal = s;
            return defer<string>().promise;
          });
          const a = delegate.call();
          const rejection = expect(a).rejects.toBeInstanceOf(AbortedException);
          delegate.abort();
          await rejection;
          expect(signal.aborted).toBe(true);
          expect(signal.reason).toBeInstanceOf(AbortedException);
          expect(isAbortedException(signal.reason)).toBe(true);
        });
      });
    });
  });
});
