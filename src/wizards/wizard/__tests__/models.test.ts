import {
  AbortNotAllowedException,
  CompleteNotAllowedException,
  GoBackNotAllowedException,
  GoForwardNotAllowedException,
} from "../exceptions";
import { Wizard } from "../models";
import {
  canContext,
  canGoStep,
  canGoStepWithBefore,
  canNotContext,
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
        describe("abort", () => {
          it("Calls context `abort` method", async () => {
            const wizard = new Wizard(canContext, []);
            await wizard.abort();
            expect(canContext.abort).toBeCalled();
          });
          it("Throws exception if context doesn't allow to abort", async () => {
            const wizard = new Wizard(canNotContext, []);
            await expect(wizard.abort.bind(wizard)).toThrow(
              new AbortNotAllowedException()
            );
          });
        });
        describe("complete", () => {
          it("Calls context `complete` method", async () => {
            const wizard = new Wizard(canContext, []);
            await wizard.complete();
            expect(canContext.complete).toBeCalled();
          });
          it("Throws exception if context doesn't allow to complete", async () => {
            const wizard = new Wizard(canNotContext, []);
            await expect(wizard.complete.bind(wizard)).toThrow(
              new CompleteNotAllowedException()
            );
          });
        });
        describe("goBack", () => {
          it("Throws exception if context doesn't allow to go back", async () => {
            const wizard = new Wizard(genericContext, [canNotGoStep]);
            await expect(wizard.goBack.bind(wizard)).toThrow(
              new GoBackNotAllowedException()
            );
          });
        });
        describe("goForward", () => {
          it("Throws exception if context doesn't allow to go forward", async () => {
            const wizard = new Wizard(genericContext, [canNotGoStep]);
            await expect(wizard.goForward.bind(wizard)).toThrow(
              new GoForwardNotAllowedException()
            );
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
