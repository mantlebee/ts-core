/**
 * Represents all properties and methods useful to manage a wizard.
 */
export interface IWizard {
  /** `true` when {@link abort} is allowed in the current state. */
  readonly canAbort: boolean;
  /** `true` when {@link complete} is allowed in the current state. */
  readonly canComplete: boolean;
  /** `true` when {@link goBack} is allowed in the current state. */
  readonly canGoBack: boolean;
  /** `true` when {@link goForward} is allowed in the current state. */
  readonly canGoForward: boolean;
  /** The step currently displayed by the wizard. */
  readonly step: IWizardStep;
  /**
   * Aborts the wizard. No other action is callable afterwards.
   * Rejects/throws when {@link canAbort} is `false`.
   */
  abort(): Promise<void>;
  /**
   * Completes the wizard. No other action is callable afterwards.
   * Rejects/throws when {@link canComplete} is `false`.
   */
  complete(): Promise<void>;
  /**
   * Moves to the previous step. Rejects/throws when {@link canGoBack} is `false`.
   */
  goBack(): Promise<void>;
  /**
   * Moves to the next step. Rejects/throws when {@link canGoForward} is `false`.
   */
  goForward(): Promise<void>;
  /**
   * Initializes the wizard. Rejects/throws if called more than once.
   * @param skipReadySteps When `true`, skips every leading step that can already
   * go forward, stopping on the first one that cannot.
   */
  start(skipReadySteps?: boolean): Promise<void>;
}

/**
 * Represents all properties and methods useful to manage a single wizard step.
 */
export interface IWizardStep {
  /** `true` when the wizard is allowed to leave this step backwards. */
  readonly canGoBack: boolean;
  /** `true` when the wizard is allowed to leave this step forwards. */
  readonly canGoForward: boolean;
  /** Explicit next step; when omitted, the next step in declaration order is used. */
  readonly nextStep?: IWizardStep;
  /** Hook awaited right before this step becomes the current one. */
  beforeEnter?(): Promise<void>;
  /** Hook awaited right before the wizard goes back from this step. */
  beforeGoBack?(): Promise<void>;
  /** Hook awaited right before the wizard goes forward from this step. */
  beforeGoForward?(): Promise<void>;
}
