import { IFactory } from "@/builders";
import { DebugMode } from "@/debug";

import { Builder } from "../models";

describe("builders", () => {
  describe("builder", () => {
    describe("models", () => {
      describe("Builder", () => {
        describe("build", () => {
          const factory: IFactory<boolean> = {
            createDebug: jest.fn(),
            createRelease: jest.fn(),
          };
          it("If DebugMode is enabled, instantiates the debug version", () => {
            const builder = new Builder(factory);
            expect(factory.createDebug).not.toBeCalled();
            expect(factory.createRelease).not.toBeCalled();
            DebugMode.enable();
            builder.build();
            expect(factory.createDebug).toBeCalled();
            expect(factory.createRelease).not.toBeCalled();
          });
          it("If DebugMode is disabled, instantiates the release version", () => {
            const builder = new Builder(factory);
            expect(factory.createDebug).not.toBeCalled();
            expect(factory.createRelease).not.toBeCalled();
            DebugMode.disable();
            builder.build();
            expect(factory.createDebug).not.toBeCalled();
            expect(factory.createRelease).toBeCalled();
          });
        });
      });
    });
  });
});
