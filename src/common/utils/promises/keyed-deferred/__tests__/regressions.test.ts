import { KeyedDeferred } from "../models";

describe("common", () => {
  describe("utils", () => {
    describe("promises", () => {
      describe("keyed-deferred", () => {
        describe("regressions", () => {
          beforeEach(() => {
            jest.useFakeTimers();
          });
          afterEach(() => {
            jest.useRealTimers();
          });
          it("the timeout of a settled wait() doesn't reject a later wait() with the same key", async () => {
            const first = new KeyedDeferred<number, string>("stale-timeout", 1000);
            const firstPending = first.wait();
            first.resolve(1);
            await expect(firstPending).resolves.toBe(1);

            const second = new KeyedDeferred<number, string>("stale-timeout");
            const secondPending = second.wait();
            const onRejected = jest.fn();
            secondPending.catch(onRejected);
            jest.advanceTimersByTime(2000);
            await Promise.resolve();
            expect(onRejected).not.toHaveBeenCalled();
            second.resolve(2);
            await expect(secondPending).resolves.toBe(2);
          });
          it("the timer is cleared once the promise is settled", async () => {
            const deferred = new KeyedDeferred<number, string>("cleared", 1000);
            const pending = deferred.wait();
            deferred.resolve(1);
            await pending;
            expect(jest.getTimerCount()).toBe(0);
          });
          it("a settled promise is removed from the registry", async () => {
            const deferred = new KeyedDeferred<number, string>("removed");
            const pending = deferred.wait();
            deferred.resolve(1);
            await pending;
            // A later resolve without a pending wait() must not settle anything.
            expect(() => deferred.resolve(2)).not.toThrow();
            const next = deferred.wait();
            const state = await Promise.race([
              next,
              Promise.resolve("still-pending"),
            ]);
            expect(state).toBe("still-pending");
          });
          it("'timeoutAfter' 0 still schedules the automatic rejection", async () => {
            const deferred = new KeyedDeferred<void, string>("zero-timeout", 0);
            const pending = deferred.wait();
            const assertion = expect(pending).rejects.toBe("zero-timeout");
            jest.runOnlyPendingTimers();
            await assertion;
          });
        });
      });
    });
  });
});
