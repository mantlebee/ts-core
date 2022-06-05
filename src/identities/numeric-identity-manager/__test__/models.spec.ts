import { NumericIdentityManager } from "../models";

describe("identities", () => {
  describe("NumericIdentityManager", () => {
    it("Without last value, newValue starts with 1", () => {
      const manager = new NumericIdentityManager();
      const newValue = manager.newValue();
      expect(newValue).toBe(1);
    });
    it("With last value, newValue starts from lastValue + 1", () => {
      const manager = new NumericIdentityManager(22);
      const newValue = manager.newValue();
      expect(newValue).toBe(23);
    });
    it("With last value less than 0, newValue starts 1", () => {
      const manager = new NumericIdentityManager(-8);
      const newValue = manager.newValue();
      expect(newValue).toBe(1);
    });
    it("Every time newValue is called, newValue is 1 unit more than lastValue", () => {
      const manager = new NumericIdentityManager();
      manager.newValue();
      const lastValue = manager.lastValue;
      const newValue = manager.newValue();
      expect(newValue - lastValue).toBe(1);
    });
    it("Last value is always equal to the new one, after newValue is called", () => {
      const manager = new NumericIdentityManager();
      const newValue = manager.newValue();
      expect(manager.lastValue).toBe(newValue);
    });
  });
});
