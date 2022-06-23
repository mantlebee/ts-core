import { Subscribable } from "../models";

describe("Subscriptions", () => {
  describe("Subscribable", () => {
    describe("models", () => {
      describe("Subscribable", () => {
        it("'subscribe' generates an incremental numeric id", () => {
          const subscribable = new Subscribable();
          const first = subscribable.subscribe(() => {});
          const second = subscribable.subscribe(() => {});
          subscribable.unsubscribe(second);
          const third = subscribable.subscribe(() => {});
          expect(third).toBe(3);
        });
        it("Calls subscriptions", () => {
          const result = { first: false, second: false, third: false };
          const subscribable = new Subscribable<typeof result>();
          const first = subscribable.subscribe((a) => {
            a.first = true;
          });
          const second = subscribable.subscribe((a) => {
            a.second = true;
          });
          const third = subscribable.subscribe((a) => {
            a.third = true;
          });
          subscribable.unsubscribe(second);
          subscribable.notifyData(result);
          expect(result).toEqual({ first: true, second: false, third: true });
        });
      });
    });
  });
});
