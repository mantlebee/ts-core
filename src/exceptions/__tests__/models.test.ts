import {
  BaseException,
  Exception,
  GenericException,
  MethodNotImplementedException,
  UnmanagedCaseException,
} from "../models";

describe("exceptions", () => {
  describe("models", () => {
    describe("BaseException", () => {
      it("Is an Error with name, code and cause", () => {
        const cause = new Error("origin");
        const exception = new BaseException("message", { cause, code: "code" });
        expect(exception).toBeInstanceOf(Error);
        expect(exception.name).toBe("BaseException");
        expect(exception.message).toBe("message");
        expect(exception.code).toBe("code");
        expect(exception.cause).toBe(cause);
      });
    });
    describe("Exception", () => {
      it("Is a BaseException with a required code", () => {
        const cause = new Error("origin");
        const exception = new Exception("E1", "message", cause);
        expect(exception).toBeInstanceOf(BaseException);
        expect(exception.name).toBe("Exception");
        expect(exception.code).toBe("E1");
        expect(exception.message).toBe("message");
        expect(exception.cause).toBe(cause);
      });
    });
    describe("Subclasses", () => {
      it.each([
        [new GenericException(), "GenericException", "Generic error"],
        [
          new MethodNotImplementedException(),
          "MethodNotImplementedException",
          "Not implemented",
        ],
        [new UnmanagedCaseException(), "UnmanagedCaseException", "Unmanaged case"],
      ])("%s has default name and message", (exception, name, message) => {
        expect(exception).toBeInstanceOf(BaseException);
        expect(exception.name).toBe(name);
        expect(exception.message).toBe(message);
      });
    });
  });
});
