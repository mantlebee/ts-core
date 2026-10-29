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
const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

describe("delegates", () => {
  describe("abortable-delegate", () => {
    describe("models", () => {
      describe("AbortableDelegate", () => {
        it("resolves with the result of the function, forwarding the arguments after the signal", async () => {
          const fn = jest.fn(async (_signal: AbortSignal, _text: string, _number: number) => "result");
          const delegate = new AbortableDelegate(fn);
          await expect(delegate.call("a", 1)).resolves.toBe("result");
          expect(fn).toHaveBeenCalledTimes(1);
          expect(fn.mock.calls[0][0]).toBeInstanceOf(AbortSignal);
          expect(fn.mock.calls[0][1]).toBe("a");
          expect(fn.mock.calls[0][2]).toBe(1);
        });
        it("latest wins: a new call aborts the running one and rejects its promise immediately", async () => {
          const deferreds = { a: defer<string>(), b: defer<string>() };
          const signals: AbortSignal[] = [];
          const delegate = new AbortableDelegate(async (signal, name: "a" | "b") => {
            signals.push(signal);
            return deferreds[name].promise;
          });
          const a = delegate.call("a");
          const b = delegate.call("b");
          // The deferred of the first call is still pending: the rejection does not wait for it.
          const rejection = await a.then(
            () => undefined,
            (error: unknown) => error,
          );
          expect(rejection).toBeInstanceOf(AbortedException);
          expect(signals[0].aborted).toBe(true);
          // The reason of the signal is the very exception the promise rejected with.
          expect(signals[0].reason).toBe(rejection);
          expect(signals[1].aborted).toBe(false);
          deferreds.b.resolve("B");
          await expect(b).resolves.toBe("B");
        });
        it("invokes the function synchronously: there is no implicit debounce", () => {
          const fn = jest.fn(async () => "result");
          const delegate = new AbortableDelegate(fn);
          delegate.call();
          expect(fn).toHaveBeenCalledTimes(1);
          expect(delegate.isRunning).toBe(true);
        });
        it("a function that ignores the signal cannot win: its late result is discarded", async () => {
          const deferreds = { a: defer<string>(), b: defer<string>() };
          const delegate = new AbortableDelegate(async (_signal, name: "a" | "b") => deferreds[name].promise);
          const a = delegate.call("a");
          a.catch(() => undefined);
          const b = delegate.call("b");
          deferreds.a.resolve("A");
          await flush();
          expect(delegate.isRunning).toBe(true);
          deferreds.b.resolve("B");
          await expect(b).resolves.toBe("B");
          await expect(a).rejects.toBeInstanceOf(AbortedException);
          expect(delegate.isRunning).toBe(false);
        });
        // Jest fails a test on an unhandled rejection: these two specs pass only
        // if the late rejection of the superseded function is swallowed.
        it("a late rejection of a superseded call is swallowed", async () => {
          const deferreds = { a: defer<string>(), b: defer<string>() };
          const delegate = new AbortableDelegate(async (_signal, name: "a" | "b") => deferreds[name].promise);
          const a = delegate.call("a");
          a.catch(() => undefined);
          const b = delegate.call("b");
          deferreds.a.reject(new Error("late"));
          await flush();
          deferreds.b.resolve("B");
          await expect(b).resolves.toBe("B");
          await flush();
        });
        it("a cooperative function stops early by checking signal.aborted", async () => {
          const deferreds = { a: defer<void>(), b: defer<void>() };
          const sideEffect = jest.fn();
          const delegate = new AbortableDelegate(async (signal, name: "a" | "b") => {
            await deferreds[name].promise;
            if (signal.aborted) return "skipped";
            sideEffect(name);
            return "done";
          });
          const a = delegate.call("a");
          a.catch(() => undefined);
          const b = delegate.call("b");
          deferreds.a.resolve();
          await flush();
          expect(sideEffect).not.toHaveBeenCalled();
          deferreds.b.resolve();
          await expect(b).resolves.toBe("done");
          expect(sideEffect).toHaveBeenCalledTimes(1);
          expect(sideEffect).toHaveBeenCalledWith("b");
        });
        it("a cooperative function can use signal.throwIfAborted()", async () => {
          const deferreds = { a: defer<void>(), b: defer<void>() };
          const thrown: unknown[] = [];
          const delegate = new AbortableDelegate(async (signal, name: "a" | "b") => {
            await deferreds[name].promise;
            try {
              signal.throwIfAborted();
            } catch (error) {
              thrown.push(error);
              throw error;
            }
            return name;
          });
          const a = delegate.call("a");
          const rejection = a.then(
            () => undefined,
            (error: unknown) => error,
          );
          const b = delegate.call("b");
          deferreds.a.resolve();
          await flush();
          // throwIfAborted() threw the reason of the signal: the AbortedException the call rejected with.
          expect(thrown).toHaveLength(1);
          expect(thrown[0]).toBeInstanceOf(AbortedException);
          expect(thrown[0]).toBe(await rejection);
          deferreds.b.resolve();
          await expect(b).resolves.toBe("b");
          expect(thrown).toHaveLength(1);
        });
        it("the signal can be passed to anything that takes an AbortSignal", async () => {
          const listener = jest.fn();
          const deferred = defer<string>();
          const delegate = new AbortableDelegate(async (signal, _name: string) => {
            signal.addEventListener("abort", listener);
            return deferred.promise;
          });
          const a = delegate.call("a");
          a.catch(() => undefined);
          expect(listener).not.toHaveBeenCalled();
          const b = delegate.call("b");
          b.catch(() => undefined);
          expect(listener).toHaveBeenCalledTimes(1);
          delegate.abort();
          expect(listener).toHaveBeenCalledTimes(2);
          await flush();
        });
        it("isRunning is true from the first call until the latest call settles; a superseded call ending does not clear it", async () => {
          const deferreds = { a: defer<string>(), b: defer<string>() };
          const delegate = new AbortableDelegate(async (_signal, name: "a" | "b") => deferreds[name].promise);
          expect(delegate.isRunning).toBe(false);
          const a = delegate.call("a");
          a.catch(() => undefined);
          expect(delegate.isRunning).toBe(true);
          const b = delegate.call("b");
          expect(delegate.isRunning).toBe(true);
          deferreds.a.resolve("A");
          await flush();
          expect(delegate.isRunning).toBe(true);
          deferreds.b.resolve("B");
          await b;
          expect(delegate.isRunning).toBe(false);
        });
        it("abort() rejects the running call with AbortedException and clears isRunning", async () => {
          const deferred = defer<string>();
          let signal!: AbortSignal;
          const delegate = new AbortableDelegate(async (s) => {
            signal = s;
            return deferred.promise;
          });
          const a = delegate.call();
          const rejection = expect(a).rejects.toBeInstanceOf(AbortedException);
          delegate.abort();
          await rejection;
          expect(delegate.isRunning).toBe(false);
          expect(signal.aborted).toBe(true);
          expect(isAbortedException(signal.reason)).toBe(true);
        });
        it("abort() with nothing running is a no-op", () => {
          const delegate = new AbortableDelegate(async () => "value");
          expect(() => delegate.abort()).not.toThrow();
          expect(delegate.isRunning).toBe(false);
        });
        it("a rejection of the function rejects the call with that error and the delegate is reusable", async () => {
          const error = new Error("failure");
          let shouldFail = true;
          const delegate = new AbortableDelegate(async () => {
            if (shouldFail) throw error;
            return "ok";
          });
          await expect(delegate.call()).rejects.toBe(error);
          expect(delegate.isRunning).toBe(false);
          shouldFail = false;
          await expect(delegate.call()).resolves.toBe("ok");
        });
        it("a synchronous throw of the function rejects the call instead of escaping call()", async () => {
          const error = new Error("sync failure");
          let shouldFail = true;
          const delegate = new AbortableDelegate((): Promise<string> => {
            if (shouldFail) throw error;
            return Promise.resolve("ok");
          });
          let promise!: Promise<string>;
          expect(() => {
            promise = delegate.call();
          }).not.toThrow();
          await expect(promise).rejects.toBe(error);
          expect(delegate.isRunning).toBe(false);
          shouldFail = false;
          await expect(delegate.call()).resolves.toBe("ok");
        });
        it("a call made from inside the function supersedes the outer call", async () => {
          const deferreds = { outer: defer<string>(), inner: defer<string>() };
          let invocations = 0;
          let innerPromise!: Promise<string>;
          const delegate: AbortableDelegate<["outer" | "inner"], string> = new AbortableDelegate(
            async (_signal, name: "outer" | "inner") => {
              invocations++;
              if (name === "outer") innerPromise = delegate.call("inner");
              return deferreds[name].promise;
            },
          );
          const outer = delegate.call("outer");
          await expect(outer).rejects.toBeInstanceOf(AbortedException);
          deferreds.inner.resolve("INNER");
          await expect(innerPromise).resolves.toBe("INNER");
          expect(invocations).toBe(2);
        });
        it("a call made from an abort listener of the superseded signal supersedes the call that aborted it", async () => {
          const deferreds = { a: defer<string>(), b: defer<string>(), c: defer<string>() };
          const invoked: string[] = [];
          const delegate: AbortableDelegate<["a" | "b" | "c"], string> = new AbortableDelegate(
            async (signal, name: "a" | "b" | "c") => {
              invoked.push(name);
              if (name === "a") signal.addEventListener("abort", () => void delegate.call("c").then(cResolved));
              return deferreds[name].promise;
            },
          );
          const cResolved = jest.fn();
          const a = delegate.call("a");
          const aRejection = expect(a).rejects.toBeInstanceOf(AbortedException);
          // Aborting "a" fires its listener, which calls "c": "b" is superseded before it runs.
          const b = delegate.call("b");
          await aRejection;
          await expect(b).rejects.toBeInstanceOf(AbortedException);
          expect(invoked).toEqual(["a", "c"]);
          expect(delegate.isRunning).toBe(true);
          deferreds.c.resolve("C");
          await flush();
          expect(cResolved).toHaveBeenCalledWith("C");
          expect(delegate.isRunning).toBe(false);
        });
        it("the superseded promise rejects, it does not resolve with the result of the replacing call", async () => {
          const delegate = new AbortableDelegate(async (_signal, name: string) => name.toUpperCase());
          const a = delegate.call("a");
          const settled = jest.fn();
          a.then(settled, () => undefined);
          const b = delegate.call("b");
          await expect(a).rejects.toBeInstanceOf(AbortedException);
          await expect(b).resolves.toBe("B");
          expect(settled).not.toHaveBeenCalled();
        });
        describe("read through a membrane proxy", () => {
          // A membrane wraps every object it returns in a proxy of its own,
          // as reactive and observable libraries do: a raw object kept in a
          // closure is never identical to the same object read back from `this`.
          const membrane = <T extends object>(target: T): T =>
            new Proxy(target, {
              get(obj, key, receiver) {
                const value = Reflect.get(obj, key, receiver);
                return typeof value === "object" && value !== null ? membrane(value) : value;
              },
            });
          it("a call settles and isRunning goes back to false", async () => {
            const delegate = membrane(new AbortableDelegate(async () => "ok"));
            await expect(delegate.call()).resolves.toBe("ok");
            expect(delegate.isRunning).toBe(false);
          });
          it("latest wins: a new call aborts the running one and rejects its promise immediately", async () => {
            const deferreds = { a: defer<string>(), b: defer<string>() };
            const signals: AbortSignal[] = [];
            const delegate = membrane(
              new AbortableDelegate(async (signal, name: "a" | "b") => {
                signals.push(signal);
                return deferreds[name].promise;
              }),
            );
            const a = delegate.call("a");
            const b = delegate.call("b");
            const rejection = await a.then(
              () => undefined,
              (error: unknown) => error,
            );
            expect(rejection).toBeInstanceOf(AbortedException);
            expect(signals[0].aborted).toBe(true);
            expect(signals[1].aborted).toBe(false);
            expect(delegate.isRunning).toBe(true);
            deferreds.b.resolve("B");
            await expect(b).resolves.toBe("B");
            expect(delegate.isRunning).toBe(false);
          });
          it("a rejection of the function rejects the call and the delegate is reusable", async () => {
            const error = new Error("failure");
            let shouldFail = true;
            const delegate = membrane(
              new AbortableDelegate(async () => {
                if (shouldFail) throw error;
                return "ok";
              }),
            );
            await expect(delegate.call()).rejects.toBe(error);
            expect(delegate.isRunning).toBe(false);
            shouldFail = false;
            await expect(delegate.call()).resolves.toBe("ok");
            expect(delegate.isRunning).toBe(false);
          });
        });
      });
      describe("isAbortedException", () => {
        it("is true for an AbortedException", () => {
          expect(isAbortedException(new AbortedException())).toBe(true);
        });
        it("is true for a plain Error named AbortedException (cross-bundle case)", () => {
          const error = new Error("from another bundle");
          error.name = "AbortedException";
          expect(isAbortedException(error)).toBe(true);
        });
        it("is false for other errors and non-error values", () => {
          expect(isAbortedException(new Error("x"))).toBe(false);
          expect(isAbortedException("AbortedException")).toBe(false);
          expect(isAbortedException(null)).toBe(false);
          expect(isAbortedException(undefined)).toBe(false);
        });
      });
    });
  });
});
