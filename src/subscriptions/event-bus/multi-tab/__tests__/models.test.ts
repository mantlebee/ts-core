import { InMemoryStorage } from "@/storage";

import { MultiTabEventBus } from "../models";

type Events = { signedOut: [number] };

const dispatchStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
  window.dispatchEvent(new StorageEvent("storage", { key }));
};

describe("subscriptions", () => {
  describe("event-bus", () => {
    describe("MultiTabEventBus", () => {
      afterEach(() => {
        localStorage.clear();
        jest.restoreAllMocks();
      });
      it("A storage event from another tab notifies the handlers with the stored arguments", async () => {
        const bus = new MultiTabEventBus<Events>();
        const handler = jest.fn();
        bus.on("signedOut", handler);
        dispatchStorage("signedOut", "[123]");
        expect(handler).toHaveBeenCalledWith(123);
        await bus.dispose();
      });
      it("'trigger' writes the arguments in localStorage, for the other tabs", async () => {
        const bus = new MultiTabEventBus<Events>();
        bus.trigger("signedOut", 5);
        expect(JSON.parse(localStorage.getItem("signedOut")!)).toEqual([5]);
        await bus.dispose();
      });
      it("By default 'trigger' doesn't notify the current tab", async () => {
        const bus = new MultiTabEventBus<Events>();
        const handler = jest.fn();
        bus.on("signedOut", handler);
        bus.trigger("signedOut", 1);
        expect(handler).not.toHaveBeenCalled();
        await bus.dispose();
      });
      it("With 'notifyCurrentTab', 'trigger' notifies the current tab too", async () => {
        const bus = new MultiTabEventBus<Events>({ notifyCurrentTab: true });
        const handler = jest.fn();
        bus.on("signedOut", handler);
        bus.trigger("signedOut", 2);
        expect(handler).toHaveBeenCalledWith(2);
        await bus.dispose();
      });
      it("Uses the storage given in the options", async () => {
        const storage = new InMemoryStorage();
        const bus = new MultiTabEventBus<Events>({ storage });
        bus.trigger("signedOut", 3);
        expect(storage.get("signedOut")).toEqual([3]);
        await bus.dispose();
      });
      it("'dispose' removes the 'storage' window listener", async () => {
        const remove = jest.spyOn(window, "removeEventListener");
        const bus = new MultiTabEventBus<Events>();
        const handler = jest.fn();
        bus.on("signedOut", handler);
        await bus.dispose();
        expect(remove).toHaveBeenCalledWith("storage", expect.any(Function));
        dispatchStorage("signedOut", "[1]");
        expect(handler).not.toHaveBeenCalled();
      });
      it("Values written by third parties on the same key are ignored", async () => {
        const bus = new MultiTabEventBus<Events>();
        const handler = jest.fn();
        bus.on("signedOut", handler);
        dispatchStorage("signedOut", "not-json");
        dispatchStorage("signedOut", '"not-a-list"');
        expect(handler).not.toHaveBeenCalled();
        await bus.dispose();
      });
    });
  });
});
