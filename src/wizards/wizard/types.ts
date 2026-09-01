/**
 * Host-provided behaviour a {@link Wizard} needs: whether it may abort/complete
 * and what to run when it does.
 */
export type WizardContext = {
  /** Whether the wizard may be aborted. Defaults to `true` when omitted. */
  readonly canAbort?: boolean;
  /** Whether the wizard may be completed. */
  readonly canComplete: boolean;
  /** Work to perform when the wizard is aborted. Defaults to a no-op. */
  abort?(): Promise<void>;
  /** Work to perform when the wizard is completed. */
  complete(): Promise<void>;
};
