import { List, Nullable } from "@/common";

import { IWizardStep } from "../../interfaces";
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
  genericContext,
  genericStep,
} from "./constants";
import { Model } from "./types";

describe("wizards", () => {
  describe("Wizard", () => {
    describe("utils", () => {
      // canGoBack
      describe("canGoBack", () => {
        it("True if step allows to go back and it's not the first step", () => {
          const previousSteps = [genericStep];
          expect(canGoBack(canGoStep, previousSteps)).toBeTruthy();
        });
        it("False if step doesn't allow to go back", () => {
          const previousSteps = [genericStep];
          expect(canGoBack(canNotGoStep, previousSteps)).toBeFalsy();
        });
        it("False if it is the first step", () => {
          const previousSteps = [] as List<IWizardStep<Model>>;
          expect(canGoBack(canGoStep, previousSteps)).toBeFalsy();
        });
      });
      // canGoForward
      describe("canGoForward", () => {
        it("True if step allows to go forward and it has a next step", () => {
          expect(canGoForward(canGoStepWithNext, [])).toBeTruthy();
        });
        it("True if step allows to go forward and it's not the last step", () => {
          const allSteps = [canGoStep, genericStep];
          expect(canGoForward(canGoStep, allSteps)).toBeTruthy();
        });
        it("False if it hasn't a next step and it is the last step", () => {
          const allSteps = [genericStep, canGoStep];
          expect(canGoForward(canGoStep, allSteps)).toBeFalsy();
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
          const previousSteps = [] as List<IWizardStep<Model>>;
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
          let currentStep: Nullable<IWizardStep<Model>> = null;
          await setCurrentStep(genericStep, genericContext, (a) => {
            currentStep = a;
          });
          expect(currentStep).toBe(genericStep);
        });
        it("Calls `beforeEnter` before setting current step", async () => {
          let currentStep: Nullable<IWizardStep<Model>> = null;
          await setCurrentStep(canGoStepWithBefore, genericContext, (a) => {
            currentStep = a;
          });
          expect(canGoStepWithBefore.beforeGoForward).toBeCalled();
        });
      });
    });
  });
});
