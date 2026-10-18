import { LogTypes } from "../../contants";
import { SubscribableLogger } from "../models";

describe("loggers", () => {
  describe("subscribable-logger", () => {
    describe("models", () => {
      describe("SubscribableLogger", () => {
        it("Raises the 'log' event for every entry", () => {
          const logger = new SubscribableLogger();
          const handler = jest.fn();
          logger.on("log", handler);
          logger.logInfo("message", { id: 1 });
          expect(handler).toHaveBeenCalledWith({
            type: LogTypes.info,
            message: "message",
            data: { id: 1 },
          });
        });
        it("Disposing the subscription stops the notifications", async () => {
          const logger = new SubscribableLogger();
          const handler = jest.fn();
          const subscription = logger.on("log", handler);
          await subscription.dispose();
          logger.logError("message");
          expect(handler).not.toHaveBeenCalled();
        });
        it("Disposing the logger removes every handler", async () => {
          const logger = new SubscribableLogger();
          const handler = jest.fn();
          logger.on("log", handler);
          await logger.dispose();
          logger.logWarning("message");
          expect(handler).not.toHaveBeenCalled();
        });
      });
    });
  });
});
