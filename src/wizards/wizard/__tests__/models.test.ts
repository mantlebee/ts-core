import { Wizard } from "../models";
import { canGoStep, genericContext, genericStep } from "./constants";
import { Model } from "./types";

describe("wizards", () => {
  describe("Wizard", () => {
    describe("models", () => {
      describe("Wizard", () => {
        describe("start", () => {
          it("`step` is the first step", async () => {
            const steps = [genericStep, canGoStep];
            const wizard = new Wizard<Model>(steps);
            await wizard.start(genericContext);
            expect(wizard.step).toBe(steps[0]);
          });
        });
      });
    });
  });
});
