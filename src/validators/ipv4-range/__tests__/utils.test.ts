import { Ipv4ValidationMessages } from "../../ipv4";
import { Ipv4RangeValidationMessages } from "../constants";
import { Ipv4RangeValidator } from "../models";
import { ipv4RangeValidatorDelegate } from "../utils";

const lowerThanStart = {
  isValid: false,
  messages: [Ipv4RangeValidationMessages.endIpLowerThanStart],
};

describe("validators", () => {
  describe("ipv4-range", () => {
    describe("ipv4RangeValidatorDelegate", () => {
      it("Valid, if equal to or greater than the start address", async () => {
        await expect(
          ipv4RangeValidatorDelegate("127.0.0.1", () => "127.0.0.0")
        ).resolves.toEqual({ isValid: true });
        await expect(
          ipv4RangeValidatorDelegate("127.0.0.1", () => "127.0.0.1")
        ).resolves.toEqual({ isValid: true });
      });
      it("Valid, if a higher octet is greater even when a lower one is smaller", async () => {
        await expect(
          ipv4RangeValidatorDelegate("11.0.0.1", () => "10.0.0.5")
        ).resolves.toEqual({ isValid: true });
      });
      it("Invalid, if lower than the start address", async () => {
        await expect(
          ipv4RangeValidatorDelegate("127.0.0.1", () => "128.0.0.1")
        ).resolves.toEqual(lowerThanStart);
        await expect(
          ipv4RangeValidatorDelegate("10.0.0.4", () => "10.0.0.5")
        ).resolves.toEqual(lowerThanStart);
      });
      it("Invalid, if the start address is not valid", async () => {
        await expect(
          ipv4RangeValidatorDelegate("127.0.0.1", () => "abc")
        ).resolves.toEqual({
          isValid: false,
          messages: [Ipv4RangeValidationMessages.invalidStartIp],
        });
      });
      it("Invalid, if the end address is not valid", async () => {
        await expect(
          ipv4RangeValidatorDelegate("abc", () => "127.0.0.1")
        ).resolves.toEqual({
          isValid: false,
          messages: [Ipv4ValidationMessages.invalidIp],
        });
      });
      it("Valid, if empty and not required", async () => {
        await expect(
          ipv4RangeValidatorDelegate("", () => "127.0.0.1")
        ).resolves.toEqual({ isValid: true });
      });
    });
    describe("Ipv4RangeValidator", () => {
      it("Reads the start address on every validation", async () => {
        let start = "10.0.0.1";
        const validator = new Ipv4RangeValidator(() => start);
        await expect(validator.validate("10.0.0.2")).resolves.toEqual({
          isValid: true,
        });
        start = "10.0.0.3";
        await expect(validator.validate("10.0.0.2")).resolves.toEqual(
          lowerThanStart
        );
      });
    });
  });
});
