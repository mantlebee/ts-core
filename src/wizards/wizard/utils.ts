import { List } from "@/common";

import { IWizardStep } from "../interfaces";
import { WizardStatuses } from "./constants";

export function canGoBack(
  currentStatus: WizardStatuses,
  currentStep: IWizardStep,
  previousSteps: List<IWizardStep>
): boolean {
  const isFirstStep = !Boolean(previousSteps.length);
  return (
    currentStatus === WizardStatuses.idle &&
    currentStep.canGoBack &&
    !isFirstStep
  );
}

export function canGoForward(
  currentStatus: WizardStatuses,
  currentStep: IWizardStep,
  allSteps: List<IWizardStep>
): boolean {
  const hasNextStep = Boolean(currentStep.nextStep);
  const currentStepIndex = getCurrentStepIndex(currentStep, allSteps);
  const isLastStep = currentStepIndex == allSteps.length - 1;
  return (
    (currentStatus === WizardStatuses.idle ||
      currentStatus === WizardStatuses.starting) &&
    currentStep.canGoForward &&
    (hasNextStep || !isLastStep)
  );
}

export function getCurrentStepIndex(
  currentStep: IWizardStep,
  steps: List<IWizardStep>
): number {
  return steps.indexOf(currentStep);
}

export function goBack(
  currentStep: IWizardStep,
  previousSteps: List<IWizardStep>,
  setCurrentStep: (step: IWizardStep) => Promise<void>
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const performGoBack = async () => {
      const previousStep = previousSteps.pop() as IWizardStep;
      await setCurrentStep(previousStep).then(resolve).catch(reject);
    };
    if (currentStep.beforeGoBack)
      await currentStep.beforeGoBack().then(performGoBack).catch(reject);
    else performGoBack();
  });
}

export function goForward(
  currentStep: IWizardStep,
  previousSteps: List<IWizardStep>,
  allSteps: List<IWizardStep>,
  setCurrentStep: (step: IWizardStep) => Promise<void>
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const performGoForward = async () => {
      const currentStepIndex = getCurrentStepIndex(currentStep, allSteps);
      const nextStep = currentStep.nextStep || allSteps[currentStepIndex + 1];
      previousSteps.push(currentStep);
      await setCurrentStep(nextStep).then(resolve).catch(reject);
    };
    if (currentStep.beforeGoForward)
      await currentStep.beforeGoForward().then(performGoForward).catch(reject);
    else performGoForward();
  });
}

export function setCurrentStep(
  step: IWizardStep,
  setStep: (step: IWizardStep) => void
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const performSetStep = async () => {
      setStep(step);
      resolve();
    };
    if (step.beforeEnter)
      await step.beforeEnter().then(performSetStep).catch(reject);
    else performSetStep();
  });
}
