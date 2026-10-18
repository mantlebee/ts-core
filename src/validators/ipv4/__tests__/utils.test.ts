import { Ipv4ValidationMessages } from "../constants";
import { Ipv4Validator } from "../models";
import { ipv4ValidatorDelegate } from "../utils";

describe("validators", () => {
  describe("ipv4", () => {
    describe("ipv4ValidatorDelegate", () => {
      it("Valid, if IPv4 address", async () => {
        await expect(ipv4ValidatorDelegate("127.0.0.1")).resolves.toEqual({
          isValid: true,
        });
        await expect(ipv4ValidatorDelegate("255.255.255.255")).resolves.toEqual(
          { isValid: true }
        );
      });
      it("Invalid, if not an IPv4 address", async () => {
        const invalid = {
          isValid: false,
          messages: [Ipv4ValidationMessages.invalidIp],
        };
        await expect(ipv4ValidatorDelegate("abc")).resolves.toEqual(invalid);
        await expect(ipv4ValidatorDelegate("256.0.0.1")).resolves.toEqual(
          invalid
        );
        await expect(ipv4ValidatorDelegate("1.2.3")).resolves.toEqual(invalid);
      });
      it("Valid, if empty and not required", async () => {
        await expect(ipv4ValidatorDelegate("")).resolves.toEqual({
          isValid: true,
        });
      });
      it("Invalid, if empty and required", async () => {
        await expect(
          ipv4ValidatorDelegate("", { required: true })
        ).resolves.toEqual({
          isValid: false,
          messages: [Ipv4ValidationMessages.required],
        });
      });
    });
    describe("Ipv4Validator", () => {
      it("Uses the given options", async () => {
        const validator = new Ipv4Validator({ required: true });
        const { isValid } = await validator.validate("");
        expect(isValid).toBe(false);
      });
    });
  });
});
