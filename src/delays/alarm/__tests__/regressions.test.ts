import { Alarm } from "../models";

describe("delays", () => {
  describe("alarm", () => {
    describe("regressions", () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });
      afterEach(() => {
        jest.useRealTimers();
      });
      it("'snooze' before the alarm goes off replaces the pending alert", () => {
        const delegate = jest.fn();
        const alarm = new Alarm(new Date(Date.now() + 1000), delegate);
        alarm.snooze(3000);
        jest.advanceTimersByTime(1000);
        expect(delegate).not.toHaveBeenCalled();
        jest.advanceTimersByTime(2000);
        expect(delegate).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(10000);
        expect(delegate).toHaveBeenCalledTimes(1);
      });
      it("'stop' after a 'snooze' prevents every alert", () => {
        const delegate = jest.fn();
        const alarm = new Alarm(new Date(Date.now() + 1000), delegate);
        alarm.snooze(10);
        alarm.stop();
        jest.advanceTimersByTime(5000);
        expect(delegate).not.toHaveBeenCalled();
        expect(jest.getTimerCount()).toBe(0);
      });
      it("expirations beyond the setTimeout limit don't go off immediately", () => {
        const day = 24 * 60 * 60 * 1000;
        const delegate = jest.fn();
        new Alarm(new Date(Date.now() + 30 * day), delegate);
        jest.advanceTimersByTime(29 * day);
        expect(delegate).not.toHaveBeenCalled();
        jest.advanceTimersByTime(day);
        expect(delegate).toHaveBeenCalledTimes(1);
      });
    });
  });
});
