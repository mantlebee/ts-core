import { InMemoryCache } from "../in-memory-cache";
import { InMemoryExpirableCache } from "../in-memory-expirable-cache";

describe("cache", () => {
  describe("InMemoryCache", () => {
    it("'exists' is false for a key never written", () => {
      expect(new InMemoryCache().exists("missing")).toBe(false);
    });
    it("'read' returns falsy values too (0, '', false)", () => {
      const cache = new InMemoryCache<unknown>();
      cache.write("zero", 0);
      cache.write("empty", "");
      cache.write("no", false);
      expect(cache.read("zero")).toBe(0);
      expect(cache.read("empty")).toBe("");
      expect(cache.read("no")).toBe(false);
      expect(cache.exists("zero")).toBe(true);
    });
    it("'clear' removes the key", () => {
      const cache = new InMemoryCache();
      cache.write("a", 1);
      cache.clear("a");
      expect(cache.exists("a")).toBe(false);
      expect(cache.read("a")).toBeNull();
    });
  });
  describe("InMemoryExpirableCache", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2024, 0, 1, 12, 0, 0));
    });
    afterEach(() => jest.useRealTimers());
    it("Returns the value before the expiration", () => {
      const cache = new InMemoryExpirableCache<number>(60);
      cache.write("a", 1);
      jest.advanceTimersByTime(30_000);
      expect(cache.read("a")).toBe(1);
    });
    it("The value is not available after the expiration", () => {
      const cache = new InMemoryExpirableCache<number>(60);
      cache.write("a", 1);
      jest.advanceTimersByTime(61_000);
      expect(cache.read("a")).toBeNull();
      expect(cache.exists("a")).toBe(false);
    });
    it("Writing a key again renews the expiration", () => {
      const cache = new InMemoryExpirableCache<number>(60);
      cache.write("a", 1);
      jest.advanceTimersByTime(50_000);
      cache.write("a", 2);
      jest.advanceTimersByTime(50_000);
      expect(cache.read("a")).toBe(2);
    });
    it("'clear' removes the expiration too: a new write starts from zero", () => {
      const cache = new InMemoryExpirableCache<number>(60);
      cache.write("a", 1);
      jest.advanceTimersByTime(50_000);
      cache.clear("a");
      cache.write("a", 2);
      jest.advanceTimersByTime(50_000);
      expect(cache.read("a")).toBe(2);
    });
    it("Values never expire when 'expiresAfter' is 0", () => {
      const cache = new InMemoryExpirableCache<number>(0);
      cache.write("a", 1);
      jest.advanceTimersByTime(1_000_000);
      expect(cache.read("a")).toBe(1);
    });
  });
});
