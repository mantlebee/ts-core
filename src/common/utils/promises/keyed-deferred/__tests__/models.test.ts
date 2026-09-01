import { TestTimeout } from "@test/index";

import { KeyedDeferred } from "../models";

describe("common", () => {
  describe("utils", () => {
    describe("promises", () => {
      describe("keyed-deferred", () => {
        describe("models", () => {
          describe("KeyedDeferred", () => {
            describe("wait", () => {
              it("stays pending until it is settled", async () => {
                const deferred = new KeyedDeferred<number, string>(
                  "wait-pending"
                );
                const pending = deferred.wait();
                const state = await Promise.race([
                  pending,
                  Promise.resolve("still-pending"),
                ]);
                expect(state).toBe("still-pending");
              });
              it("resolves with the value passed to resolve()", async () => {
                const deferred = new KeyedDeferred<number, string>(
                  "wait-resolve"
                );
                const pending = deferred.wait();
                deferred.resolve(42);
                await expect(pending).resolves.toBe(42);
              });
              it("rejects with the reason passed to reject()", async () => {
                const deferred = new KeyedDeferred<number, string>("wait-reject");
                const pending = deferred.wait();
                const assertion = expect(pending).rejects.toBe("nope");
                deferred.reject("nope");
                await assertion;
              });
              it("can be settled by a different instance created with the same key", async () => {
                const key = "wait-shared";
                const consumer = new KeyedDeferred<string, string>(key);
                const producer = new KeyedDeferred<string, string>(key);
                const pending = consumer.wait();
                producer.resolve("done");
                await expect(pending).resolves.toBe("done");
              });
              it("keeps different keys independent from each other", async () => {
                const a = new KeyedDeferred<number, string>("wait-key-a");
                const b = new KeyedDeferred<number, string>("wait-key-b");
                const pendingA = a.wait();
                const pendingB = b.wait();
                a.resolve(1);
                b.resolve(2);
                await expect(pendingA).resolves.toBe(1);
                await expect(pendingB).resolves.toBe(2);
              });
              it("replaces the previous pending promise when called again for the same key", async () => {
                const deferred = new KeyedDeferred<number, string>(
                  "wait-replace"
                );
                const first = deferred.wait();
                const second = deferred.wait();
                deferred.resolve(7);
                await expect(second).resolves.toBe(7);
                const firstState = await Promise.race([
                  first,
                  Promise.resolve("still-pending"),
                ]);
                expect(firstState).toBe("still-pending");
              });
            });
            describe("resolve", () => {
              it("does nothing when no promise is pending for the key", () => {
                const deferred = new KeyedDeferred<number, string>(
                  "resolve-noop"
                );
                expect(() => deferred.resolve(1)).not.toThrow();
              });
            });
            describe("reject", () => {
              it("does nothing when no promise is pending for the key", () => {
                const deferred = new KeyedDeferred<void, string>("reject-noop");
                expect(() => deferred.reject("whatever")).not.toThrow();
              });
            });
            describe("timeoutAfter", () => {
              it("auto-rejects wait() with the key once the timeout elapses", async () => {
                const fakeTimeout = new TestTimeout();
                const deferred = new KeyedDeferred<void, string>(
                  "timeout-key",
                  1000
                );
                const pending = deferred.wait();
                const assertion = expect(pending).rejects.toBe("timeout-key");
                expect(setTimeout).toHaveBeenCalledTimes(1);
                expect(setTimeout).toHaveBeenLastCalledWith(
                  expect.any(Function),
                  1000
                );
                fakeTimeout.runPending();
                await assertion;
              });
              it("does not schedule a timeout when timeoutAfter is omitted", () => {
                const fakeTimeout = new TestTimeout();
                const deferred = new KeyedDeferred<void, string>(
                  "no-timeout-key"
                );
                deferred.wait();
                expect(setTimeout).not.toHaveBeenCalled();
                fakeTimeout.runPending();
              });
            });
          });
        });
      });
    });
  });
});
