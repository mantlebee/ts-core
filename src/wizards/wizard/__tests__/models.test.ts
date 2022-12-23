import { Wizard } from "../models";
import {
  canGoStep,
  canGoStepWithBefore,
  canNotGoStep,
  genericContext,
  genericStep,
} from "./constants";

describe("wizards", () => {
  describe("Wizard", () => {
    describe("models", () => {
      describe("Wizard", () => {
        describe("constructor", () => {
          it("`step` is the first step", () => {
            const steps = [genericStep, canGoStep];
            const wizard = new Wizard(genericContext, steps);
            expect(wizard.step).toBe(steps[0]);
          });
        });
        describe("start", () => {
          it("Calls `beforeEnter` of the first step", async () => {
            const steps = [canGoStepWithBefore];
            const wizard = new Wizard(genericContext, steps);
            await wizard.start();
            expect(canGoStepWithBefore.beforeEnter).toBeCalled();
          });
          it("Ready steps can be forwarded", async () => {
            const skipReadySteps = true;
            const steps = [canGoStep, canNotGoStep, genericStep];
            const wizard = new Wizard(genericContext, steps);
            await wizard.start(skipReadySteps);
            expect(wizard.step).toBe(canNotGoStep);
          });
        });
      });
    });
  });
});
