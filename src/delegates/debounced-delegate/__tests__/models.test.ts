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
          expect(delegate).not.toBeCalled();
          fakeTimeout.runPending();
          expect(delegate).toBeCalledTimes(1);
        });
      });
    });
  });
});
