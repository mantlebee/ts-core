import { readFileAsDataUrl, readFileAsText } from "../utils";

describe("files", () => {
  describe("utils", () => {
    const file = new Blob(["hello"], { type: "text/plain" });
    describe("readFileAsDataUrl", () => {
      it("Resolves with the data URL of the file", async () => {
        const dataUrl = await readFileAsDataUrl(file);
        expect(dataUrl).toBe(`data:text/plain;base64,${btoa("hello")}`);
      });
    });
    describe("readFileAsText", () => {
      it("Resolves with the text of the file", async () => {
        expect(await readFileAsText(file)).toBe("hello");
      });
      it("Rejects if the file can't be read", async () => {
        const spy = jest
          .spyOn(FileReader.prototype, "readAsText")
          .mockImplementation(function (this: FileReader) {
            this.dispatchEvent(new ProgressEvent("error"));
          });
        await expect(readFileAsText(file)).rejects.toBeDefined();
        spy.mockRestore();
      });
    });
  });
});
