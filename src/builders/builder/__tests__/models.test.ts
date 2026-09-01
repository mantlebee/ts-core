import { IFactory } from "@/builders";
import { DebugMode } from "@/debug";

import { Builder } from "../models";

describe("builders", () => {
  describe("builder", () => {
    describe("models", () => {
      describe("Builder", () => {
        describe("build", () => {
          it("If DebugMode is enabled, instantiates the debug version", () => {
            const factory: IFactory<boolean> = {
              createDebug: jest.fn(),
              createRelease: jest.fn(),
            };
            const builder = new Builder(factory);
            expect(factory.createDebug).not.toHaveBeenCalled();
            expect(factory.createRelease).not.toHaveBeenCalled();
            DebugMode.enable();
            builder.build();
            expect(factory.createDebug).toHaveBeenCalled();
            expect(factory.createRelease).not.toHaveBeenCalled();
          });
          it("If DebugMode is disabled, instantiates the release version", () => {
            const factory: IFactory<boolean> = {
              createDebug: jest.fn(),
              createRelease: jest.fn(),
            };
            const builder = new Builder(factory);
            expect(factory.createDebug).not.toHaveBeenCalled();
            expect(factory.createRelease).not.toHaveBeenCalled();
            DebugMode.disable();
            builder.build();
            expect(factory.createDebug).not.toHaveBeenCalled();
            expect(factory.createRelease).toHaveBeenCalled();
          });
        });
      });
    });
  });
});
