export interface IWizard<TModel> {
  readonly canAbort: boolean;
  readonly canComplete: boolean;
  readonly canGoBack: boolean;
  readonly canGoForward: boolean;
  readonly step: IWizardStep<TModel>;
  abort(): Promise<void>;
  complete(): Promise<TModel>;
  goBack(): Promise<void>;
  goForward(): Promise<void>;
  start(
    context: IWizardContext<TModel>,
    skipReadySteps?: boolean
  ): Promise<void>;
}

export interface IWizardContext<TModel> {
  readonly canAbort?: boolean;
  readonly canComplete: boolean;
  readonly model: TModel;
  abort?(): Promise<void>;
  complete(model: TModel): Promise<TModel>;
}

export interface IWizardStep<TModel> {
  readonly canGoBack: boolean;
  readonly canGoForward: boolean;
  readonly nextStep?: IWizardStep<TModel>;
  beforeEnter?(context: IWizardContext<TModel>): Promise<void>;
  beforeGoBack?(): Promise<void>;
  beforeGoForward?(): Promise<void>;
}
