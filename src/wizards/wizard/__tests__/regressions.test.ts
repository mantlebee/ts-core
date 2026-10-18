import { IWizardStep } from "../../interfaces";
import { WizardStatuses } from "../constants";
import { Wizard } from "../models";
import { canContext } from "./constants";

const createStep = (overrides: Partial<IWizardStep> = {}): IWizardStep => ({
  canGoBack: true,
  canGoForward: true,
  ...overrides,
});

describe("wizards", () => {
  describe("Wizard", () => {
    describe("regressions", () => {
      it("'abort' works when the context has no 'abort'", async () => {
        const wizard = new Wizard(
          { canComplete: true, complete: () => Promise.resolve() },
          [createStep(), createStep()]
        );
        await wizard.start();
        await expect(wizard.abort()).resolves.toBeUndefined();
        expect(wizard.status).toBe(WizardStatuses.aborted);
      });
      it("A rejected 'beforeEnter' while going forward leaves the history untouched", async () => {
        const first = createStep();
        const second = createStep({
          beforeEnter: () => Promise.reject(new Error("nope")),
        });
        const wizard = new Wizard(canContext, [first, second]);
        await wizard.start();
        await expect(wizard.goForward()).rejects.toThrow("nope");
        expect(wizard.step).toBe(first);
        expect(wizard.canGoBack).toBe(false);
        expect(wizard.status).toBe(WizardStatuses.idle);
      });
      it("A rejected 'beforeEnter' while going back leaves the history untouched", async () => {
        let failOnEnter = false;
        const first = createStep({
          beforeEnter: () =>
            failOnEnter ? Promise.reject(new Error("nope")) : Promise.resolve(),
        });
        const second = createStep();
        const wizard = new Wizard(canContext, [first, second]);
        await wizard.start();
        await wizard.goForward();
        failOnEnter = true;
        await expect(wizard.goBack()).rejects.toThrow("nope");
        expect(wizard.step).toBe(second);
        failOnEnter = false;
        await wizard.goBack();
        expect(wizard.step).toBe(first);
      });
      it("A step outside the steps list, without 'nextStep', can't go forward", async () => {
        const outside = createStep();
        const first = createStep({ nextStep: outside });
        const wizard = new Wizard(canContext, [first, createStep()]);
        await wizard.start();
        await wizard.goForward();
        expect(wizard.step).toBe(outside);
        expect(wizard.canGoForward).toBe(false);
      });
      it("A failed 'start' can be retried", async () => {
        let fail = true;
        const first = createStep({
          beforeEnter: () =>
            fail ? Promise.reject(new Error("nope")) : Promise.resolve(),
        });
        const wizard = new Wizard(canContext, [first, createStep()]);
        await expect(wizard.start()).rejects.toThrow("nope");
        expect(wizard.status).toBe(WizardStatuses.needToStart);
        fail = false;
        await wizard.start();
        expect(wizard.status).toBe(WizardStatuses.idle);
      });
    });
  });
});
