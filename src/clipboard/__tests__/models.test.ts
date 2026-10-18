import { WebClipboard } from "../models";

const mockClipboard = () => {
  let text = "";
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: {
      readText: jest.fn(() => Promise.resolve(text)),
      writeText: jest.fn((value: string) => {
        text = value;
        return Promise.resolve();
      }),
    },
  });
};

describe("clipboard", () => {
  describe("WebClipboard", () => {
    beforeEach(mockClipboard);
    afterEach(() => {
      delete (navigator as { clipboard?: Clipboard }).clipboard;
    });
    it("An object is read back as an object", async () => {
      await WebClipboard.write({ a: 1 });
      await expect(WebClipboard.read()).resolves.toEqual({ a: 1 });
    });
    it("A non JSON text is read back as a string", async () => {
      await WebClipboard.write("hello");
      await expect(WebClipboard.read()).resolves.toBe("hello");
    });
    it("'clear' empties the clipboard", async () => {
      await WebClipboard.write("hello");
      await WebClipboard.clear();
      await expect(WebClipboard.read()).resolves.toBe("");
    });
  });
});
