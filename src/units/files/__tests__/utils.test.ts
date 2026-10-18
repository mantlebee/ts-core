import { getHumanFileSize } from "../utils";

describe("units", () => {
  describe("files", () => {
    describe("getHumanFileSize", () => {
      it("SI (default): powers of 1000", () => {
        expect(getHumanFileSize(1000)).toEqual({ unit: "kB", value: "1.00" });
        expect(getHumanFileSize(999)).toEqual({ unit: "B", value: "999.00" });
        expect(getHumanFileSize(1500000)).toEqual({ unit: "MB", value: "1.50" });
      });
      it("IEC: powers of 1024", () => {
        expect(getHumanFileSize(1024, 2, true)).toEqual({
          unit: "KiB",
          value: "1.00",
        });
        expect(getHumanFileSize(1023, 2, true)).toEqual({
          unit: "B",
          value: "1023.00",
        });
      });
      it("Uses the given decimals", () => {
        expect(getHumanFileSize(1234, 1)).toEqual({ unit: "kB", value: "1.2" });
      });
    });
  });
});
