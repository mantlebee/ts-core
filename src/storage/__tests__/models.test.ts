import { createGlobalsStore } from "../globals";
import { InMemoryStorage, InMemoryStorer } from "../in-memory";
import { IStorage } from "../interfaces";
import { Storer } from "../models";
import { LocalStorage, SessionStorage } from "../web";

type Globals = { fallbackSrc: string; showClear: boolean };

const testStorage = (create: () => IStorage) => {
  it("Writes, reads and removes values", () => {
    const storage = create();
    expect(storage.has("a")).toBe(false);
    expect(storage.get("a")).toBeNull();
    storage.set("a", { id: 1 });
    expect(storage.has("a")).toBe(true);
    expect(storage.get("a")).toEqual({ id: 1 });
    storage.remove("a");
    expect(storage.has("a")).toBe(false);
  });
  it("Keeps falsy values", () => {
    const storage = create();
    storage.set("zero", 0);
    storage.set("no", false);
    expect(storage.get("zero")).toBe(0);
    expect(storage.get("no")).toBe(false);
  });
  it("Clears every value", () => {
    const storage = create();
    storage.set("a", 1);
    storage.set("b", 2);
    storage.clear();
    expect(storage.has("a")).toBe(false);
    expect(storage.has("b")).toBe(false);
  });
};

describe("storage", () => {
  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  describe("InMemoryStorage", () => testStorage(() => new InMemoryStorage()));
  describe("LocalStorage", () => {
    testStorage(() => new LocalStorage());
    it("Serializes values as JSON in localStorage", () => {
      new LocalStorage().set("a", { id: 1 });
      expect(localStorage.getItem("a")).toBe('{"id":1}');
    });
    it("Treats non JSON values as missing", () => {
      localStorage.setItem("a", "{not json");
      expect(new LocalStorage().get("a")).toBeNull();
    });
  });
  describe("SessionStorage", () => {
    testStorage(() => new SessionStorage());
    it("Serializes values as JSON in sessionStorage", () => {
      new SessionStorage().set("a", [1]);
      expect(sessionStorage.getItem("a")).toBe("[1]");
    });
  });
  describe("Storer", () => {
    it("Reads and writes a single key", () => {
      const storage = new InMemoryStorage();
      const storer = new Storer<number>(storage, "key");
      storer.set(5);
      expect(storer.get()).toBe(5);
      expect(storage.get("key")).toBe(5);
      storer.clear();
      expect(storer.get()).toBeNull();
    });
    it("InMemoryStorer has its own storage", () => {
      const storer = new InMemoryStorer<string>();
      storer.set("value");
      expect(storer.get()).toBe("value");
    });
  });
  describe("createGlobalsStore", () => {
    it("Returns the default value for a property never set", () => {
      const store = createGlobalsStore<Globals>("id", new InMemoryStorage());
      expect(store.getValue("showClear", false)).toBe(false);
    });
    it("Writes and reads values by property", () => {
      const storage = new InMemoryStorage();
      createGlobalsStore<Globals>("id", storage).setValue("fallbackSrc", "x.png");
      const store = createGlobalsStore<Globals>("id", storage);
      expect(store.getValue("fallbackSrc", "")).toBe("x.png");
      expect(store.getValue("showClear", true)).toBe(true);
    });
    it("Uses sessionStorage by default", () => {
      createGlobalsStore<Globals>("id").setValue("showClear", true);
      expect(JSON.parse(sessionStorage.getItem("id")!)).toEqual({
        showClear: true,
      });
    });
  });
});
