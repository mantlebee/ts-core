/** @jest-environment node */
import { BaseException } from "@/exceptions";

import {
  BadRequestException,
  HttpResponseException,
  InvalidCredentialsException,
  NotAuthorizedException,
} from "../exceptions";

describe("http", () => {
  describe("exceptions", () => {
    it("Every HTTP exception is a BaseException named after its class", () => {
      const response = new Response(null, { status: 500 });
      const exceptions = [
        new BadRequestException(),
        new InvalidCredentialsException(),
        new NotAuthorizedException(),
        new HttpResponseException(response),
      ];
      exceptions.forEach((a) => {
        expect(a).toBeInstanceOf(BaseException);
        expect(a.name).toBe(a.constructor.name);
      });
    });
    it("HttpResponseException exposes status, status text and code", () => {
      const cause = new Error("read error");
      const exception = new HttpResponseException(
        new Response(null, { status: 502, statusText: "Bad Gateway" }),
        cause
      );
      expect(exception.status).toBe(502);
      expect(exception.statusText).toBe("Bad Gateway");
      expect(exception.code).toBe("http-502");
      expect(exception.message).toBe("HTTP 502 Bad Gateway");
      expect(exception.cause).toBe(cause);
    });
  });
});
