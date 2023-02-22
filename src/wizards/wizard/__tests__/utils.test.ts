import { isNumber, List, Nullable } from "@/common";

import { IWizardStep } from "../../interfaces";
import { WizardStatuses } from "../constants";
import {
  canGoBack,
  canGoForward,
  goBack,
  goForward,
  setCurrentStep,
} from "../utils";
import {
  canGoStep,
  canGoStepWithBefore,
  canGoStepWithNext,
  canNotGoStep,
  genericStep,
} from "./constants";

const idleStatus = WizardStatuses.idle;

describe("wizards", () => {
  describe("Wizard", () => {
    describe("utils", () => {
      // canGoBack
      describe("canGoBack", () => {
        it("True if step allows to go back and it's not the first step and status is idle", () => {
          const previousSteps = [genericStep];
          expect(canGoBack(idleStatus, canGoStep, previousSteps)).toBeTruthy();
        });
        it("False if step doesn't allow to go back", () => {
          const previousSteps = [genericStep];
          expect(
            canGoBack(idleStatus, canNotGoStep, previousSteps)
          ).toBeFalsy();
        });
        it("False if it is the first step", () => {
          const previousSteps = [] as List<IWizardStep>;
          expect(canGoBack(idleStatus, canGoStep, previousSteps)).toBeFalsy();
        });
        it("False if it is the first step", () => {
          const previousSteps = [] as List<IWizardStep>;
          expect(canGoBack(idleStatus, canGoStep, previousSteps)).toBeFalsy();
        });
        it("False if status is not idle", () => {
          const previousSteps = [] as List<IWizardStep>;
          Object.values(WizardStatuses)
            .filter((a) => isNumber(a) && a !== idleStatus)
            .forEach((a) => {
              expect(
                canGoBack(a as WizardStatuses, canGoStep, previousSteps)
              ).toBeFalsy();
            });
        });
      });
      // canGoForward
      describe("canGoForward", () => {
        const startingStatus = WizardStatuses.starting;
        it("True if step allows to go forward and it has a next step and status is idle", () => {
          expect(canGoForward(idleStatus, canGoStepWithNext, [])).toBeTruthy();
        });
        it("True if step allows to go forward and it has a next step and status is starting", () => {
          expect(
            canGoForward(startingStatus, canGoStepWithNext, [])
          ).toBeTruthy();
        });
        it("True if step allows to go forward and it's not the last step and status is idle", () => {
          const allSteps = [canGoStep, genericStep];
          expect(canGoForward(idleStatus, canGoStep, allSteps)).toBeTruthy();
        });
        it("True if step allows to go forward and it's not the last step and status is idle", () => {
          const allSteps = [canGoStep, genericStep];
          expect(
            canGoForward(startingStatus, canGoStep, allSteps)
          ).toBeTruthy();
        });
        it("False if it hasn't a next step and it is the last step", () => {
          const allSteps = [genericStep, canGoStep];
          expect(canGoForward(idleStatus, canGoStep, allSteps)).toBeFalsy();
        });
        it("False if status is not idle", () => {
          Object.values(WizardStatuses)
            .filter(
              (a) => isNumber(a) && a !== idleStatus && a !== startingStatus
            )
            .forEach((a) => {
              expect(
                canGoForward(a as WizardStatuses, canGoStepWithNext, [])
              ).toBeFalsy();
            });
        });
      });
      // goBack
      describe("goBack", () => {
        it("Updates current step and remove the last step from the previous steps", async () => {
          let currentStep = canGoStep;
          const previousSteps = [genericStep];
          await goBack(currentStep, previousSteps, (a) => {
            currentStep = a;
          });
          expect(currentStep).toBe(genericStep);
          expect(previousSteps).toHaveLength(0);
        });
        it("Calls `beforeGoBack` before updating current step", async () => {
          let currentStep = canGoStepWithBefore;
          await goBack(currentStep, [], (a) => {
            currentStep = a;
          });
          expect(canGoStepWithBefore.beforeGoBack).toBeCalled();
        });
      });
      // goForward
      describe("goForward", () => {
        it("Updates current step and remove the last step from the previous steps", async () => {
          let currentStep = canGoStep;
          const allSteps = [canGoStep, genericStep];
          const previousSteps = [] as List<IWizardStep>;
          await goForward(currentStep, previousSteps, allSteps, (a) => {
            currentStep = a;
          });
          expect(currentStep).toBe(genericStep);
          expect(previousSteps).toHaveLength(1);
          expect(previousSteps[0]).toBe(canGoStep);
        });
        it("Calls `beforeGoBack` before updating current step", async () => {
          let currentStep = canGoStepWithBefore;
          await goForward(currentStep, [], [], (a) => {
            currentStep = a;
          });
          expect(canGoStepWithBefore.beforeGoForward).toBeCalled();
        });
      });
      // setCurrentStep
      describe("setCurrentStep", () => {
        it("Sets the current step", async () => {
          let currentStep: Nullable<IWizardStep> = null;
          await setCurrentStep(genericStep, (a) => {
            currentStep = a;
          });
          expect(currentStep).toBe(genericStep);
        });
        it("Calls `beforeEnter` before setting current step", async () => {
          let currentStep: Nullable<IWizardStep> = null;
          await setCurrentStep(canGoStepWithBefore, (a) => {
            currentStep = a;
          });
          expect(canGoStepWithBefore.beforeGoForward).toBeCalled();
        });
      });
    });
  });
});
