/**
 * Represents all properties and methods useful to manage a wizard.
 */
export interface IWizard {
  readonly canAbort: boolean;
  readonly canComplete: boolean;
  readonly canGoBack: boolean;
  readonly canGoForward: boolean;
  readonly step: IWizardStep;
  abort(): Promise<void>;
  complete(): Promise<void>;
  goBack(): Promise<void>;
  goForward(): Promise<void>;
  start(skipReadySteps?: boolean): Promise<void>;
}

/**
 * Represents all properties and methods useful to manage a single wizard step.
 */
export interface IWizardStep {
  readonly canGoBack: boolean;
  readonly canGoForward: boolean;
  readonly nextStep?: IWizardStep;
  beforeEnter?(): Promise<void>;
  beforeGoBack?(): Promise<void>;
  beforeGoForward?(): Promise<void>;
}
