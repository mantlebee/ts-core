import { LogTypes } from "@/loggers";

import { Notifier } from "../models";

describe("notifications", () => {
  describe("notifier", () => {
    describe("Notifier", () => {
      it.each([
        ["notifyDebug", LogTypes.debug],
        ["notifyError", LogTypes.error],
        ["notifyInfo", LogTypes.info],
        ["notifySuccess", LogTypes.success],
        ["notifyWarning", LogTypes.warning],
      ] as const)("'%s' uses the right type", (method, type) => {
        const delegate = jest.fn();
        new Notifier(delegate)[method]("message", "title");
        expect(delegate).toHaveBeenCalledWith(type, "message", "title");
      });
    });
  });
});
