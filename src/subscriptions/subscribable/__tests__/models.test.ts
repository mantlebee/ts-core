import { Subscribable } from "../models";

type CounterEvents = { changed: [value: number] };

class Counter extends Subscribable<CounterEvents> {
  private value = 0;
  public increment() {
    this._eventBus.trigger("changed", ++this.value);
  }
}

describe("subscriptions", () => {
  describe("subscribable", () => {
    describe("models", () => {
      describe("Subscribable", () => {
        it("Calls the handlers when the event is raised", () => {
          const counter = new Counter();
          const handler = jest.fn();
          counter.on("changed", handler);
          counter.increment();
          counter.increment();
          expect(handler).toHaveBeenNthCalledWith(1, 1);
          expect(handler).toHaveBeenNthCalledWith(2, 2);
        });
        it("Disposing the subscription removes only its handler", async () => {
          const counter = new Counter();
          const first = jest.fn();
          const second = jest.fn();
          const subscription = counter.on("changed", first);
          counter.on("changed", second);
          await subscription.dispose();
          counter.increment();
          expect(first).not.toHaveBeenCalled();
          expect(second).toHaveBeenCalledWith(1);
        });
        it("Disposing the subscribable removes every handler", async () => {
          const counter = new Counter();
          const handler = jest.fn();
          counter.on("changed", handler);
          await counter.dispose();
          counter.increment();
          expect(handler).not.toHaveBeenCalled();
        });
      });
    });
  });
});
