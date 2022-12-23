import { IWizardStep } from "../../interfaces";
import { WizardContext } from "../types";

//#region Contexts
export const canCompleteContext: WizardContext = {
  canComplete: true,
  complete: () => Promise.resolve(),
};
export const canNotCompleteContext: WizardContext = {
  canComplete: false,
  complete: () => Promise.resolve(),
};
export const genericContext: WizardContext = {
  canComplete: false,
  complete: () => Promise.resolve(),
};
//#endregion

//#region Steps
export const canGoStep: IWizardStep = {
  canGoBack: true,
  canGoForward: true,
};

export const canGoStepWithBefore: IWizardStep = {
  canGoBack: true,
  canGoForward: true,
  beforeEnter: jest.fn(),
  beforeGoBack: jest.fn(),
  beforeGoForward: jest.fn(),
};

export const canGoStepWithNext: IWizardStep = {
  canGoBack: true,
  canGoForward: true,
  nextStep: canGoStep,
};

export const canNotGoStep: IWizardStep = {
  canGoBack: false,
  canGoForward: false,
};

export const genericStep: IWizardStep = {
  canGoBack: false,
  canGoForward: false,
};
//#endregion
