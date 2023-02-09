import { TestDateNow, TestTimeout } from "@test/index";

import { Alarm } from "../models";

describe("Delays", () => {
  describe("Alarm", () => {
    describe("models", () => {
      describe("Alarm", () => {
        describe("constructor", () => {
          it("is initialized not stopped", () => {
            const expiration = new Date(Date.now());
            const alarm = new Alarm(expiration, () => {});
            expect(alarm.stopped).toBeFalsy();
          });
        });
        describe("expired", () => {
          const fakeDateNow = new TestDateNow(new Date(2023, 0, 1, 12, 0, 0));
          beforeAll(() => {
            fakeDateNow.enable();
          });
          afterAll(() => {
            fakeDateNow.disable();
          });
          it("is expired if expiration date is in the future", () => {
            const expiration = new Date(2023, 0, 1, 13, 0, 0);
            const alarm = new Alarm(expiration, () => {});
            expect(alarm.expired).toBeFalsy();
          });
          it("is expired if expiration date is in the past", () => {
            const expiration = new Date(2023, 0, 1, 11, 0, 0);
            const alarm = new Alarm(expiration, () => {});
            expect(alarm.expired).toBeTruthy();
          });
        });
        describe("stopped", () => {
          it("is stopped when the alarm is manually stopped", () => {
            const expiration = new Date(Date.now());
            const alarm = new Alarm(expiration, () => {});
            alarm.stop();
            expect(alarm.stopped).toBeTruthy();
          });
          it("is stopped when the delegate stop it", () => {
            const fakeTimeout = new TestTimeout();
            const expiration = new Date(Date.now() + 1000);
            const alarm = new Alarm(expiration, (a) => a());
            fakeTimeout.runPending();
            expect(alarm.stopped).toBeTruthy();
          });
        });
        describe("delegate", () => {
          it("triggers the delegate on expiration", () => {
            const fakeTimeout = new TestTimeout();
            const expiration = new Date(Date.now() + 1000);
            const delegate = jest.fn();
            new Alarm(expiration, delegate);
            expect(delegate).not.toBeCalled();
            expect(setTimeout).toHaveBeenCalledTimes(1);
            expect(setTimeout).toHaveBeenLastCalledWith(
              expect.any(Function),
              1000
            );
            fakeTimeout.runPending();
            expect(delegate).toHaveBeenCalledTimes(1);
          });
          it("doesn't trigger the delegate on expiration, if stopped before", () => {
            const fakeTimeout = new TestTimeout();
            const expiration = new Date(Date.now() + 1000);
            const delegate = jest.fn();
            const alarm = new Alarm(expiration, delegate);
            alarm.stop();
            fakeTimeout.runPending();
            expect(delegate).not.toBeCalled();
          });
          it("can stop the alarm", () => {
            const fakeTimeout = new TestTimeout();
            const expiration = new Date(Date.now() + 1000);
            const alarm = new Alarm(expiration, (stop) => stop());
            fakeTimeout.runPending();
            expect(alarm.stopped).toBeTruthy();
          });
          it("triggers the delegate again, if snoozed (from alarm)", () => {
            const fakeTimeout = new TestTimeout();
            const expiration = new Date(Date.now() + 1000);
            const delegate = jest.fn();
            const alarm = new Alarm(expiration, delegate);
            fakeTimeout.runPending();
            alarm.snooze(2000);
            expect(setTimeout).toHaveBeenCalledTimes(2);
            expect(setTimeout).toHaveBeenLastCalledWith(
              expect.any(Function),
              2000
            );
            fakeTimeout.runPending();
            expect(delegate).toHaveBeenCalledTimes(2);
          });
          it("triggers the delegate again, if snoozed (from delegate)", () => {
            const fakeTimeout = new TestTimeout();
            const expiration = new Date(Date.now() + 1000);
            new Alarm(expiration, (stop, snooze) => snooze(2000));
            fakeTimeout.runPending();
            expect(setTimeout).toHaveBeenCalledTimes(2);
            expect(setTimeout).toHaveBeenLastCalledWith(
              expect.any(Function),
              2000
            );
          });
        });
        describe("snooze", () => {
          it("doesn't trigger the delegate again, if the alarm is stopped", () => {
            const fakeTimeout = new TestTimeout();
            const expiration = new Date(Date.now() + 1000);
            const delegate = jest.fn();
            const alarm = new Alarm(expiration, delegate);
            alarm.stop();
            alarm.snooze(1000);
            fakeTimeout.runPending();
            expect(delegate).not.toBeCalled();
          });
        });
      });
    });
  });
});
