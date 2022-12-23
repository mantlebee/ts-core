import { IWizardStep } from "../../interfaces";
import { WizardContext } from "../types";

//#region Contexts
export const canContext: WizardContext = {
  canAbort: true,
  canComplete: true,
  abort: jest.fn(),
  complete: jest.fn(),
};
export const canNotContext: WizardContext = {
  canAbort: false,
  canComplete: false,
  abort: jest.fn(),
  complete: jest.fn(),
};
export const genericContext: WizardContext = {
  canComplete: false,
  complete: jest.fn(),
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
