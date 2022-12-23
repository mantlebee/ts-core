import { List } from "@/common";

import { IWizard, IWizardStep } from "../interfaces";
import { WizardOperations, WizardStatuses } from "./constants";
import {
  AbortNotAllowedException,
  CompleteNotAllowedException,
  EmptyStepsException,
  GoBackNotAllowedException,
  GoForwardNotAllowedException,
  InvalidOperationForStatusException,
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
  protected currentStatus: WizardStatuses;
  protected currentStep: IWizardStep;
  protected context: WizardContext;
  protected previousSteps: List<IWizardStep>;

  public constructor(context: WizardContext, steps: List<IWizardStep>) {
    if (!steps.length) throw new EmptyStepsException();
    this.allSteps = steps;
    this.currentStatus = WizardStatuses.needToStart;
    this.context = context;
    this.currentStep = steps[0];
    this.previousSteps = [];
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
  public get status(): WizardStatuses {
    return this.currentStatus;
  }
  public get step(): IWizardStep {
    return this.currentStep;
  }

  public abort(): Promise<void> {
    this.validateStatus(WizardOperations.abort, [WizardStatuses.idle]);
    if (!this.canAbort) throw new AbortNotAllowedException();
    this.setCurrentStatus(WizardStatuses.aborting);
    const { abort = Promise.resolve } = this.context;
    return abort().finally(() => {
      this.setCurrentStatus(WizardStatuses.aborted);
    });
  }
  public complete(): Promise<void> {
    this.validateStatus(WizardOperations.complete, [WizardStatuses.idle]);
    if (!this.canComplete) throw new CompleteNotAllowedException();
    this.setCurrentStatus(WizardStatuses.completing);
    return this.context.complete().finally(() => {
      this.setCurrentStatus(WizardStatuses.completed);
    });
  }
  public goBack(): Promise<void> {
    this.validateStatus(WizardOperations.goBack, [WizardStatuses.idle]);
    if (!this.canGoBack) throw new GoBackNotAllowedException();
    this.setCurrentStatus(WizardStatuses.changingStep);
    const { currentStep, previousSteps } = this;
    return goBack(currentStep, previousSteps, (a) =>
      this.setCurrentStep(a)
    ).finally(() => {
      this.setCurrentStatus(WizardStatuses.idle);
    });
  }
  public goForward(): Promise<void> {
    this.validateStatus(WizardOperations.goForward, [WizardStatuses.idle]);
    if (!this.canGoForward) throw new GoForwardNotAllowedException();
    this.setCurrentStatus(WizardStatuses.changingStep);
    return this.performGoForward().finally(() => {
      this.setCurrentStatus(WizardStatuses.idle);
    });
  }
  public async start(skipReadySteps = false): Promise<void> {
    this.validateStatus(WizardOperations.start, [WizardStatuses.needToStart]);
    this.setCurrentStatus(WizardStatuses.starting);
    const { allSteps } = this;
    const firstStep = allSteps[0];
    await this.setCurrentStep(firstStep);
    if (skipReadySteps)
      while (this.canGoForward) {
        await this.performGoForward();
      }
    this.setCurrentStatus(WizardStatuses.idle);
  }

  protected performGoForward(): Promise<void> {
    const { allSteps, currentStep, previousSteps } = this;
    return goForward(currentStep, previousSteps, allSteps, (a) =>
      this.setCurrentStep(a)
    );
  }
  protected setCurrentStatus(status: WizardStatuses): void {
    this.currentStatus = status;
  }
  protected setCurrentStep(step: IWizardStep): Promise<void> {
    return setCurrentStep(step, (a) => {
      this.currentStep = a;
    });
  }

  protected validateStatus(
    operationName: WizardOperations,
    allowedStatuses: List<WizardStatuses>
  ): void {
    const { currentStatus } = this;
    if (!allowedStatuses.includes(currentStatus))
      throw new InvalidOperationForStatusException(
        operationName,
        currentStatus
      );
  }
}
