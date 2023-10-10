import { Enablable } from "../models";

describe("common", () => {
  describe("classes", () => {
    describe("enablable", () => {
      describe("models", () => {
        describe("Enablable", () => {
          describe("constructor", () => {
            it("is initialized not enabled, if instantiated without arg", () => {
              const enablable = new Enablable();
              expect(enablable.isEnabled).toBeFalsy();
            });
            it("is initialized enabled, if instantiated without arg = true", () => {
              const enablable = new Enablable(true);
              expect(enablable.isEnabled).toBeTruthy();
            });
          });
          describe("disable", () => {
            it("isEnabled is false, after disable", () => {
              const enablable = new Enablable(true);
              expect(enablable.isEnabled).toBeTruthy();
              enablable.disable();
              expect(enablable.isEnabled).toBeFalsy();
            });
            it("isEnabled is true, after enable", () => {
              const enablable = new Enablable();
              expect(enablable.isEnabled).toBeFalsy();
              enablable.enable();
              expect(enablable.isEnabled).toBeTruthy();
            });
          });
        });
      });
    });
  });
});
