import { WizardOperations, WizardStatuses } from "../constants";
import {
  AbortNotAllowedException,
  CompleteNotAllowedException,
  EmptyStepsException,
  GoBackNotAllowedException,
  GoForwardNotAllowedException,
  InvalidOperationForStatusException,
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
          it("Throws exception if steps is an empty array", () => {
            expect(() => new Wizard(genericContext, [])).toThrow(
              new EmptyStepsException()
            );
          });
        });
        describe("abort", () => {
          it("Calls context `abort` method", async () => {
            const wizard = new Wizard(canContext, [genericStep]);
            await wizard.start();
            await wizard.abort();
            expect(canContext.abort).toBeCalled();
          });
          it("Throws exception if wizard isn't in idle", async () => {
            const wizard = new Wizard(genericContext, [genericStep]);
            await expect(wizard.abort.bind(wizard)).toThrow(
              new InvalidOperationForStatusException(
                WizardOperations.abort,
                wizard.status
              )
            );
          });
          it("Throws exception if context doesn't allow to abort", async () => {
            const wizard = new Wizard(canNotContext, [genericStep]);
            await wizard.start();
            await expect(wizard.abort.bind(wizard)).toThrow(
              new AbortNotAllowedException()
            );
          });
        });
        describe("complete", () => {
          it("Calls context `complete` method", async () => {
            const wizard = new Wizard(canContext, [genericStep]);
            await wizard.start();
            await wizard.complete();
            expect(canContext.complete).toBeCalled();
          });
          it("Throws exception if wizard isn't in idle", async () => {
            const wizard = new Wizard(genericContext, [genericStep]);
            await expect(wizard.complete.bind(wizard)).toThrow(
              new InvalidOperationForStatusException(
                WizardOperations.complete,
                wizard.status
              )
            );
          });
          it("Throws exception if context doesn't allow to complete", async () => {
            const wizard = new Wizard(canNotContext, [genericStep]);
            await wizard.start();
            await expect(wizard.complete.bind(wizard)).toThrow(
              new CompleteNotAllowedException()
            );
          });
        });
        describe("goBack", () => {
          it("Throws exception if wizard isn't in idle", async () => {
            const wizard = new Wizard(genericContext, [genericStep]);
            await expect(wizard.goBack.bind(wizard)).toThrow(
              new InvalidOperationForStatusException(
                WizardOperations.goBack,
                wizard.status
              )
            );
          });
          it("Throws exception if context doesn't allow to go back", async () => {
            const wizard = new Wizard(genericContext, [canNotGoStep]);
            await wizard.start();
            await expect(wizard.goBack.bind(wizard)).toThrow(
              new GoBackNotAllowedException()
            );
          });
          it("Status goes to 'goingBack' while 'goBack' is called", async () => {
            const wizard = new Wizard(genericContext, [canGoStep, canGoStep]);
            await wizard.start();
            await wizard.goForward();
            wizard.goBack();
            expect(wizard.status).toBe(WizardStatuses.goingBack);
          });
          it("Status goes back to 'idle' if 'beforeGoBack' fails", async () => {
            const wizard = new Wizard(genericContext, [
              canGoStep,
              {
                canGoBack: true,
                canGoForward: true,
                beforeGoBack: () => Promise.reject(),
              },
            ]);
            await wizard.start();
            await wizard.goForward();
            await wizard.goBack();
            expect(wizard.status).toBe(WizardStatuses.idle);
          });
        });
        describe("goForward", () => {
          it("Throws exception if wizard isn't in idle", async () => {
            const wizard = new Wizard(genericContext, [genericStep]);
            await expect(wizard.goForward.bind(wizard)).toThrow(
              new InvalidOperationForStatusException(
                WizardOperations.goForward,
                wizard.status
              )
            );
          });
          it("Throws exception if context doesn't allow to go forward", async () => {
            const wizard = new Wizard(genericContext, [canNotGoStep]);
            await wizard.start();
            await expect(wizard.goForward.bind(wizard)).toThrow(
              new GoForwardNotAllowedException()
            );
          });
          it("Status goes to 'goingForward' while 'goForward' is called", async () => {
            const wizard = new Wizard(genericContext, [canGoStep, genericStep]);
            await wizard.start();
            wizard.goForward();
            expect(wizard.status).toBe(WizardStatuses.goingForward);
          });
          it("Status goes back to 'idle' if 'beforeGoForward' fails", async () => {
            const wizard = new Wizard(genericContext, [
              {
                canGoBack: true,
                canGoForward: true,
                beforeGoForward: () => Promise.reject(),
              },
              genericStep,
            ]);
            await wizard.start();
            await wizard.goForward();
            expect(wizard.status).toBe(WizardStatuses.idle);
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
          // it("Throws exception if wizard isn't ready to start", async () => {
          //   const wizard = new Wizard(genericContext, [genericStep]);
          //   await wizard.start();
          //   await expect(wizard.start.bind(wizard)).toThrow(
          //     new InvalidOperationForStatusException(
          //       WizardOperations.start,
          //       wizard.status
          //     )
          //   );
          // });
        });
      });
    });
  });
});
