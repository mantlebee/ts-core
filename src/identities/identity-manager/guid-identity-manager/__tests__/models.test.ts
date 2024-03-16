import { isGuid } from "@/common";

import { GuidIdentityManager } from "../models";

describe("identities", () => {
  describe("GuidIdentityManager", () => {
    it("Last value starts as null", () => {
      const manager = new GuidIdentityManager();
      expect(manager.lastValue).toBeNull();
    });
    it("New value is a GUID", () => {
      const manager = new GuidIdentityManager();
      const newValue = manager.newValue();
      expect(isGuid(newValue)).toBeTruthy();
    });
    it("Last value is always equal to the new one, after newValue is called", () => {
      const manager = new GuidIdentityManager();
      const newValue = manager.newValue();
      expect(manager.lastValue).toBe(newValue);
    });
  });
});
