import { List } from "@/common";

import { IWizardContext, IWizardStep } from "../interfaces";

export function canGoBack<TModel>(
  currentStep: IWizardStep<TModel>,
  previousSteps: List<IWizardStep<TModel>>
): boolean {
  const isFirstStep = !Boolean(previousSteps.length);
  return currentStep.canGoBack && !isFirstStep;
}

export function canGoForward<TModel>(
  currentStep: IWizardStep<TModel>,
  allSteps: List<IWizardStep<TModel>>
): boolean {
  const hasNextStep = Boolean(currentStep.nextStep);
  const currentStepIndex = getCurrentStepIndex(currentStep, allSteps);
  const isLastStep = currentStepIndex == allSteps.length - 1;
  return currentStep.canGoForward && (hasNextStep || !isLastStep);
}

export function getCurrentStepIndex<TModel>(
  currentStep: IWizardStep<TModel>,
  steps: List<IWizardStep<TModel>>
): number {
  return steps.indexOf(currentStep);
}

export function goBack<TModel>(
  currentStep: IWizardStep<TModel>,
  previousSteps: List<IWizardStep<TModel>>,
  setCurrentStep: (step: IWizardStep<TModel>) => void
): Promise<void> {
  return new Promise(async (resolve) => {
    if (currentStep.beforeGoBack) await currentStep.beforeGoBack();
    const previousStep = previousSteps.pop() as IWizardStep<TModel>;
    await setCurrentStep(previousStep);
    resolve();
  });
}

export function goForward<TModel>(
  currentStep: IWizardStep<TModel>,
  previousSteps: List<IWizardStep<TModel>>,
  allSteps: List<IWizardStep<TModel>>,
  setCurrentStep: (step: IWizardStep<TModel>) => void
): Promise<void> {
  return new Promise(async (resolve) => {
    if (currentStep.beforeGoForward) await currentStep.beforeGoForward();
    const currentStepIndex = getCurrentStepIndex(currentStep, allSteps);
    const nextStep = currentStep.nextStep || allSteps[currentStepIndex + 1];
    previousSteps.push(currentStep);
    await setCurrentStep(nextStep);
    resolve();
  });
}

export function setCurrentStep<TModel>(
  step: IWizardStep<TModel>,
  context: IWizardContext<TModel>,
  setStep: (step: IWizardStep<TModel>) => void
): Promise<void> {
  return new Promise(async (resolve) => {
    if (step.beforeEnter) await step.beforeEnter(context);
    setStep(step);
    resolve();
  });
}
