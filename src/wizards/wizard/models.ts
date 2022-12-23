import { List } from "@/common";

import { IWizard, IWizardStep } from "../interfaces";
import {
  AbortNotAllowedException,
  CompleteNotAllowedException,
  GoBackNotAllowedException,
  GoForwardNotAllowedException,
} from "./exceptions";
import { WizardContext } from "./types";
import {
  canGoBack,
  canGoForward,
  goBack,
  goForward,
  setCurrentStep,
} from "./utils";

export class Wizard implements IWizard {
  protected allSteps: List<IWizardStep>;
  protected currentStep: IWizardStep;
  protected context: WizardContext;
  protected previousSteps: List<IWizardStep> = [];

  public constructor(context: WizardContext, steps: List<IWizardStep>) {
    this.allSteps = steps;
    this.context = context;
    this.currentStep = steps[0];
  }

  public get canAbort(): boolean {
    const { canAbort = true } = this.context;
    return canAbort;
  }
  public get canComplete(): boolean {
    return this.context.canComplete;
  }
  public get canGoBack(): boolean {
    const { currentStep, previousSteps } = this;
    return canGoBack(currentStep, previousSteps);
  }
  public get canGoForward(): boolean {
    const { allSteps, currentStep } = this;
    return canGoForward(currentStep, allSteps);
  }
  public get step(): IWizardStep {
    return this.currentStep;
  }

  public abort(): Promise<void> {
    if (!this.canAbort) throw new AbortNotAllowedException();
    const { abort = Promise.resolve } = this.context;
    return abort();
  }
  public complete(): Promise<void> {
    if (!this.canComplete) throw new CompleteNotAllowedException();
    return this.context.complete();
  }
  public goBack(): Promise<void> {
    if (!this.canGoBack) throw new GoBackNotAllowedException();
    const { currentStep, previousSteps } = this;
    return goBack(currentStep, previousSteps, (a) => this.setCurrentStep(a));
  }
  public goForward(): Promise<void> {
    if (!this.canGoForward) throw new GoForwardNotAllowedException();
    const { allSteps, currentStep, previousSteps } = this;
    return goForward(currentStep, previousSteps, allSteps, (a) =>
      this.setCurrentStep(a)
    );
  }
  public start(skipReadySteps = false): Promise<void> {
    return new Promise(async (resolve) => {
      const { allSteps } = this;
      const firstStep = allSteps[0];
      await this.setCurrentStep(firstStep);
      if (skipReadySteps)
        while (this.canGoForward) {
          await this.goForward();
        }
      resolve();
    });
  }

  protected setCurrentStep(step: IWizardStep): Promise<void> {
    return setCurrentStep(step, (a) => {
      this.currentStep = a;
    });
  }
}
