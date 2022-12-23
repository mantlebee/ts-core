import { IWizardContext, IWizardStep } from "../../interfaces";
import { Model } from "./types";

export const model: Model = {};

//#region Contexts
export const canCompleteContext: IWizardContext<Model> = {
  canComplete: true,
  complete: () => Promise.resolve(model),
  model,
};
export const canNotCompleteContext: IWizardContext<Model> = {
  canComplete: false,
  complete: () => Promise.resolve(model),
  model,
};
export const genericContext: IWizardContext<Model> = {
  canComplete: false,
  complete: () => Promise.resolve(model),
  model,
};
//#endregion

//#region Steps
export const canGoStep: IWizardStep<Model> = {
  canGoBack: true,
  canGoForward: true,
};

export const canGoStepWithBefore: IWizardStep<Model> = {
  canGoBack: true,
  canGoForward: true,
  beforeEnter: jest.fn(),
  beforeGoBack: jest.fn(),
  beforeGoForward: jest.fn(),
};

export const canGoStepWithNext: IWizardStep<Model> = {
  canGoBack: true,
  canGoForward: true,
  nextStep: canGoStep,
};

export const canNotGoStep: IWizardStep<Model> = {
  canGoBack: false,
  canGoForward: false,
};

export const genericStep: IWizardStep<Model> = {
  canGoBack: false,
  canGoForward: false,
};
//#endregion
