export type WizardContext = {
  readonly canAbort?: boolean;
  readonly canComplete: boolean;
  abort?(): Promise<void>;
  complete(): Promise<void>;
};
