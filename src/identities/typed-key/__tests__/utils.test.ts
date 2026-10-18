import { TypedKey } from "../types";
import { createTypedKey } from "../utils";

describe("identities", () => {
  describe("typed-key", () => {
    describe("createTypedKey", () => {
      it("creates a unique symbol every time", () => {
        const a = createTypedKey<string>();
        const b = createTypedKey<string>();
        expect(typeof a).toBe("symbol");
        expect(a).not.toBe(b);
      });
      it("keys of different types are not assignable to each other", () => {
        const stringKey: TypedKey<string> = createTypedKey<string>();
        // @ts-expect-error a TypedKey<string> is not a TypedKey<number>
        const numberKey: TypedKey<number> = stringKey;
        expect(numberKey).toBe(stringKey);
      });
    });
  });
});
