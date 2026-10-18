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
  return (
    (currentStatus === WizardStatuses.idle ||
      currentStatus === WizardStatuses.starting) &&
    currentStep.canGoForward &&
    Boolean(getNextStep(currentStep, allSteps))
  );
}

export function getCurrentStepIndex(
  currentStep: IWizardStep,
  steps: List<IWizardStep>
): number {
  return steps.indexOf(currentStep);
}

/**
 * Returns the step that follows `currentStep`: its explicit `nextStep`, or the
 * following one in `allSteps`. A step outside `allSteps` without an explicit
 * `nextStep` has no next step.
 */
export function getNextStep(
  currentStep: IWizardStep,
  allSteps: List<IWizardStep>
): IWizardStep | undefined {
  if (currentStep.nextStep) return currentStep.nextStep;
  const currentStepIndex = getCurrentStepIndex(currentStep, allSteps);
  return currentStepIndex < 0 ? undefined : allSteps[currentStepIndex + 1];
}

/**
 * Moves to the last of `previousSteps`. The history is changed only once the
 * step has been entered: if a hook rejects, the wizard state is left untouched.
 */
export async function goBack(
  currentStep: IWizardStep,
  previousSteps: List<IWizardStep>,
  setCurrentStep: (step: IWizardStep) => Promise<void>
): Promise<void> {
  await currentStep.beforeGoBack?.();
  const previousStep = previousSteps[previousSteps.length - 1];
  await setCurrentStep(previousStep);
  previousSteps.pop();
}

/**
 * Moves to the next step (see {@link getNextStep}). The history is changed
 * only once the step has been entered: if a hook rejects, the wizard state is
 * left untouched.
 */
export async function goForward(
  currentStep: IWizardStep,
  previousSteps: List<IWizardStep>,
  allSteps: List<IWizardStep>,
  setCurrentStep: (step: IWizardStep) => Promise<void>
): Promise<void> {
  await currentStep.beforeGoForward?.();
  const nextStep = getNextStep(currentStep, allSteps) as IWizardStep;
  await setCurrentStep(nextStep);
  previousSteps.push(currentStep);
}

export async function setCurrentStep(
  step: IWizardStep,
  setStep: (step: IWizardStep) => void
): Promise<void> {
  await step.beforeEnter?.();
  setStep(step);
}
