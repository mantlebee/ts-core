/**
 * @jest-environment node
 */
import { TestTimeout } from "@test/index";

import { DebouncedDelegate } from "../models";

describe("delegates", () => {
  describe("debounced-delegate", () => {
    describe("models", () => {
      describe("DebouncedDelegate (Node environment, no window)", () => {
        it("runs in an environment where window is not defined", () => {
          expect(typeof window).toBe("undefined");
        });
        it("call() does not throw and runs the delegate once the delay expires", () => {
          const fakeTimeout = new TestTimeout();
          const delegate = jest.fn();
          const debouncedDelegate = new DebouncedDelegate(delegate, 1000);
          expect(() => debouncedDelegate.call("value")).not.toThrow();
          expect(debouncedDelegate.isPending).toBe(true);
          fakeTimeout.runPending();
          expect(delegate).toHaveBeenCalledTimes(1);
          expect(delegate).toHaveBeenCalledWith("value");
          expect(debouncedDelegate.isPending).toBe(false);
        });
        it("abort() cancels the pending execution", () => {
          const fakeTimeout = new TestTimeout();
          const delegate = jest.fn();
          const debouncedDelegate = new DebouncedDelegate(delegate, 1000);
          debouncedDelegate.call();
          debouncedDelegate.abort();
          fakeTimeout.runPending();
          expect(delegate).not.toHaveBeenCalled();
          expect(debouncedDelegate.isPending).toBe(false);
        });
      });
    });
  });
});
