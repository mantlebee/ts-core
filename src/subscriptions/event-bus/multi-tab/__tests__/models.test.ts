import { InMemoryStorage } from "@/storage";

import { MultiTabEventBus, MultiTabEventBusKeyPrefixDefault } from "../models";
import { MultiTabEventBusMessage } from "../types";

type Events = { signedOut: [number] };

const signedOutKey = `${MultiTabEventBusKeyPrefixDefault}signedOut`;

const dispatchStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
  window.dispatchEvent(new StorageEvent("storage", { key }));
};
const dispatchMessage = (key: string, args: unknown[], id = "id") =>
  dispatchStorage(key, JSON.stringify({ args, id }));
const readMessage = (key: string): MultiTabEventBusMessage =>
  JSON.parse(localStorage.getItem(key)!);

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
        dispatchMessage(signedOutKey, [123]);
        expect(handler).toHaveBeenCalledWith(123);
        await bus.dispose();
      });
      it("'trigger' writes the arguments in localStorage, under the prefixed key", async () => {
        const bus = new MultiTabEventBus<Events>();
        bus.trigger("signedOut", 5);
        expect(readMessage(signedOutKey).args).toEqual([5]);
        expect(localStorage.getItem("signedOut")).toBeNull();
        await bus.dispose();
      });
      it("'trigger' writes a different value every time, so repeated events reach the other tabs", async () => {
        const bus = new MultiTabEventBus<Events>();
        bus.trigger("signedOut", 5);
        const first = localStorage.getItem(signedOutKey);
        bus.trigger("signedOut", 5);
        const second = localStorage.getItem(signedOutKey);
        expect(second).not.toBe(first);
        await bus.dispose();
      });
      it("Uses the key prefix given in the options", async () => {
        const bus = new MultiTabEventBus<Events>({ keyPrefix: "app:" });
        const handler = jest.fn();
        bus.on("signedOut", handler);
        bus.trigger("signedOut", 4);
        expect(readMessage("app:signedOut").args).toEqual([4]);
        dispatchMessage("app:signedOut", [9]);
        expect(handler).toHaveBeenCalledWith(9);
        await bus.dispose();
      });
      it("Ignores the storage keys without the prefix", async () => {
        const bus = new MultiTabEventBus<Events>();
        const handler = jest.fn();
        bus.on("signedOut", handler);
        dispatchMessage("signedOut", [1]);
        expect(handler).not.toHaveBeenCalled();
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
        expect(storage.get<MultiTabEventBusMessage>(signedOutKey)?.args).toEqual(
          [3]
        );
        await bus.dispose();
      });
      it("'dispose' removes the 'storage' window listener", async () => {
        const remove = jest.spyOn(window, "removeEventListener");
        const bus = new MultiTabEventBus<Events>();
        const handler = jest.fn();
        bus.on("signedOut", handler);
        await bus.dispose();
        expect(remove).toHaveBeenCalledWith("storage", expect.any(Function));
        dispatchMessage(signedOutKey, [1]);
        expect(handler).not.toHaveBeenCalled();
      });
      it("Values written by third parties on the same key are ignored", async () => {
        const bus = new MultiTabEventBus<Events>();
        const handler = jest.fn();
        bus.on("signedOut", handler);
        dispatchStorage(signedOutKey, "not-json");
        dispatchStorage(signedOutKey, '"not-a-message"');
        dispatchStorage(signedOutKey, "[1]");
        expect(handler).not.toHaveBeenCalled();
        await bus.dispose();
      });
    });
  });
});
