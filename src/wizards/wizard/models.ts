import { List } from "@/common";

import { IWizard, IWizardContext, IWizardStep } from "../interfaces";
import {
  canGoBack,
  canGoForward,
  goBack,
  goForward,
  setCurrentStep,
} from "./utils";

export class Wizard<TModel> implements IWizard<TModel> {
  protected currentStep!: IWizardStep<TModel>;
  protected context!: IWizardContext<TModel>;
  protected previousSteps!: List<IWizardStep<TModel>>;
  protected allSteps!: List<IWizardStep<TModel>>;

  public constructor(steps: List<IWizardStep<TModel>>) {
    this.allSteps = steps;
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
  public get step(): IWizardStep<TModel> {
    return this.currentStep;
  }

  public abort(): Promise<void> {
    const { abort = Promise.resolve } = this.context;
    return abort();
  }
  public complete(): Promise<TModel> {
    const { canComplete, context } = this;
    if (!canComplete) return Promise.reject();
    return context.complete(context.model);
  }
  public goBack(): Promise<void> {
    const { canGoBack, currentStep, previousSteps } = this;
    if (!canGoBack) return Promise.reject();
    return goBack(currentStep, previousSteps, (a) => this.setCurrentStep(a));
  }
  public goForward(): Promise<void> {
    const { allSteps, canGoForward, currentStep, previousSteps } = this;
    if (!canGoForward) return Promise.reject();
    return goForward(currentStep, previousSteps, allSteps, (a) =>
      this.setCurrentStep(a)
    );
  }
  public start(
    context: IWizardContext<TModel>,
    skipReadySteps = false
  ): Promise<void> {
    this.context = context;
    this.previousSteps = [];
    return new Promise(async (resolve) => {
      const { allSteps } = this;
      const firstStep = allSteps[0];
      await this.setCurrentStep(firstStep);
      if (skipReadySteps) while (this.canGoForward) await this.goForward();
      resolve();
    });
  }

  protected setCurrentStep(step: IWizardStep<TModel>): Promise<void> {
    const { context } = this;
    return setCurrentStep(step, context, (a) => {
      this.currentStep = a;
    });
  }
}
