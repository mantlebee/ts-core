import { TestTimeout } from "@test/index";

import { DebouncedDelegate } from "../models";

describe("delegates", () => {
  describe("debounced-delegate", () => {
    describe("models", () => {
      describe("DebouncedDelegate", () => {
        it("runs the delegate only one time, if call() is called multiple times in a specific amount of time", () => {
          const fakeTimeout = new TestTimeout();
          const delegate = jest.fn();
          const debouncedDelegate = new DebouncedDelegate(delegate, 1000);
          debouncedDelegate.call();
          debouncedDelegate.call();
          debouncedDelegate.call();
          expect(delegate).not.toHaveBeenCalled();
          fakeTimeout.runPending();
          expect(delegate).toHaveBeenCalledTimes(1);
        });
        it("the delegate is invoked using the same params passed to the last call() invocation", () => {
          const fakeTimeout = new TestTimeout();
          const delegate = jest.fn();
          const debouncedDelegate = new DebouncedDelegate(delegate, 1000);
          debouncedDelegate.call(true);
          debouncedDelegate.call(123);
          debouncedDelegate.call("string");
          fakeTimeout.runPending();
          expect(delegate).toHaveBeenCalledWith("string");
        });
        describe("abort()", () => {
          it("prevents the delegate from running", () => {
            const fakeTimeout = new TestTimeout();
            const delegate = jest.fn();
            const debouncedDelegate = new DebouncedDelegate(delegate, 1000);
            debouncedDelegate.call();
            debouncedDelegate.abort();
            fakeTimeout.runPending();
            expect(delegate).not.toHaveBeenCalled();
          });
          it("does nothing when no call is pending", () => {
            new TestTimeout();
            const delegate = jest.fn();
            const debouncedDelegate = new DebouncedDelegate(delegate, 1000);
            expect(() => debouncedDelegate.abort()).not.toThrow();
            expect(debouncedDelegate.isPending).toBe(false);
          });
          it("does not prevent a following call() from running the delegate", () => {
            const fakeTimeout = new TestTimeout();
            const delegate = jest.fn();
            const debouncedDelegate = new DebouncedDelegate(delegate, 1000);
            debouncedDelegate.call("aborted");
            debouncedDelegate.abort();
            debouncedDelegate.call("executed");
            fakeTimeout.runPending();
            expect(delegate).toHaveBeenCalledTimes(1);
            expect(delegate).toHaveBeenCalledWith("executed");
          });
        });
        describe("isPending", () => {
          it("is false before any call()", () => {
            new TestTimeout();
            const debouncedDelegate = new DebouncedDelegate(jest.fn(), 1000);
            expect(debouncedDelegate.isPending).toBe(false);
          });
          it("is true after call() and false after the delegate runs", () => {
            const fakeTimeout = new TestTimeout();
            const debouncedDelegate = new DebouncedDelegate(jest.fn(), 1000);
            debouncedDelegate.call();
            expect(debouncedDelegate.isPending).toBe(true);
            fakeTimeout.runPending();
            expect(debouncedDelegate.isPending).toBe(false);
          });
          it("is false after abort()", () => {
            new TestTimeout();
            const debouncedDelegate = new DebouncedDelegate(jest.fn(), 1000);
            debouncedDelegate.call();
            debouncedDelegate.abort();
            expect(debouncedDelegate.isPending).toBe(false);
          });
        });
      });
    });
  });
});
