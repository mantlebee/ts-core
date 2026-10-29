import { AbortedException } from "@/delegates/abortable-delegate/exceptions";
import { AbortableDelegate } from "@/delegates/abortable-delegate/models";

import { AsyncLock } from "../models";

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
const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

describe("locks", () => {
  describe("async-lock", () => {
    describe("models", () => {
      describe("AsyncLock", () => {
        it("runs the functions one at a time, in FIFO order, each starting after the previous settled", async () => {
          const lock = new AsyncLock();
          const started: string[] = [];
          const deferreds = { a: defer<string>(), b: defer<string>(), c: defer<string>() };
          const task = (name: "a" | "b" | "c") => () => {
            started.push(name);
            return deferreds[name].promise;
          };
          const a = lock.run(task("a"));
          const b = lock.run(task("b"));
          const c = lock.run(task("c"));
          await flush();
          expect(started).toEqual(["a"]);
          deferreds.a.resolve("A");
          await flush();
          expect(started).toEqual(["a", "b"]);
          deferreds.b.resolve("B");
          await flush();
          expect(started).toEqual(["a", "b", "c"]);
          deferreds.c.resolve("C");
          await expect(c).resolves.toBe("C");
          await expect(b).resolves.toBe("B");
          await expect(a).resolves.toBe("A");
        });
        it("resolves or rejects with the outcome of fn", async () => {
          const lock = new AsyncLock();
          const error = new Error("failure");
          await expect(lock.run(async () => "value")).resolves.toBe("value");
          await expect(
            lock.run(async () => {
              throw error;
            }),
          ).rejects.toBe(error);
        });
        it("a failure does not block the lock", async () => {
          const lock = new AsyncLock();
          const a = lock.run(async () => {
            throw new Error("failure");
          });
          const aRejection = expect(a).rejects.toThrow("failure");
          const b = lock.run(async () => "B");
          await aRejection;
          await expect(b).resolves.toBe("B");
          expect(lock.isLocked).toBe(false);
        });
        it("a synchronous throw of fn behaves like a rejection", async () => {
          const lock = new AsyncLock();
          const error = new Error("sync failure");
          const a = lock.run((): Promise<string> => {
            throw error;
          });
          const aRejection = expect(a).rejects.toBe(error);
          const b = lock.run(async () => "B");
          await aRejection;
          await expect(b).resolves.toBe("B");
          expect(lock.isLocked).toBe(false);
        });
        it("isLocked is true while a function runs and false afterwards", async () => {
          const lock = new AsyncLock();
          const deferred = defer<string>();
          expect(lock.isLocked).toBe(false);
          const a = lock.run(() => deferred.promise);
          expect(lock.isLocked).toBe(true);
          deferred.resolve("A");
          await a;
          expect(lock.isLocked).toBe(false);
        });
        it("pendingCount counts the functions waiting for the lock", async () => {
          const lock = new AsyncLock();
          const deferreds = { a: defer<string>(), b: defer<string>(), c: defer<string>() };
          expect(lock.pendingCount).toBe(0);
          const a = lock.run(() => deferreds.a.promise);
          expect(lock.pendingCount).toBe(0);
          const b = lock.run(() => deferreds.b.promise);
          const c = lock.run(() => deferreds.c.promise);
          expect(lock.pendingCount).toBe(2);
          deferreds.a.resolve("A");
          await flush();
          expect(lock.pendingCount).toBe(1);
          deferreds.b.resolve("B");
          await flush();
          expect(lock.pendingCount).toBe(0);
          deferreds.c.resolve("C");
          await Promise.all([a, b, c]);
        });
        it("reentrancy is a deadlock (documented caller error)", async () => {
          const lock = new AsyncLock();
          const inner = jest.fn(async () => "inner");
          const outer = lock.run(async () => lock.run(inner));
          const state = () => Promise.race([outer, flush().then(() => "pending")]);
          await expect(state()).resolves.toBe("pending");
          await flush();
          await flush();
          await expect(state()).resolves.toBe("pending");
          expect(inner).not.toHaveBeenCalled();
          expect(lock.isLocked).toBe(true);
          expect(lock.pendingCount).toBe(1);
        });
        it("works with AbortableDelegate: a call superseded while waiting for the lock does nothing when it finally runs", async () => {
          const lock = new AsyncLock();
          const started: string[] = [];
          const deferreds = {
            pages: defer<string>(),
            a: defer<string>(),
            ab: defer<string>(),
            resolve: defer<string>(),
          };
          const guarded = (signal: AbortSignal, name: keyof typeof deferreds) =>
            lock.run(async () => {
              if (signal.aborted) return "skipped";
              started.push(name);
              return deferreds[name].promise;
            });
          const pages = new AbortableDelegate(async (signal) => guarded(signal, "pages"));
          const search = new AbortableDelegate(async (signal, query: "a" | "ab") => guarded(signal, query));
          const resolve = new AbortableDelegate(async (signal, _id: number) => guarded(signal, "resolve"));

          const pagesCall = pages.call();
          await flush();
          expect(started).toEqual(["pages"]);
          const searchA = search.call("a");
          await flush();
          expect(lock.pendingCount).toBe(1);
          const searchAb = search.call("ab");
          // Superseded while waiting for the lock: rejected at once.
          await expect(searchA).rejects.toBeInstanceOf(AbortedException);
          const resolveCall = resolve.call(42);
          await flush();
          expect(lock.pendingCount).toBe(3);

          deferreds.pages.resolve("pages");
          await expect(pagesCall).resolves.toBe("pages");
          await flush();
          // The first search took its turn, saw the aborted signal and returned at once.
          expect(started).toEqual(["pages", "ab"]);
          deferreds.ab.resolve("ab");
          await expect(searchAb).resolves.toBe("ab");
          await flush();
          expect(started).toEqual(["pages", "ab", "resolve"]);
          deferreds.resolve.resolve("42");
          await expect(resolveCall).resolves.toBe("42");
          expect(lock.isLocked).toBe(false);
          expect(lock.pendingCount).toBe(0);
        });
      });
    });
  });
});
