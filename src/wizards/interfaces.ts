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

export interface IWizardStep {
  readonly canGoBack: boolean;
  readonly canGoForward: boolean;
  readonly nextStep?: IWizardStep;
  beforeEnter?(): Promise<void>;
  beforeGoBack?(): Promise<void>;
  beforeGoForward?(): Promise<void>;
}
