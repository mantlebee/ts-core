/** @jest-environment node */
import { MethodNotImplementedException } from "@/exceptions";

import { BlobAndFilenameHttpResponseReader } from "../blob-and-filename";
import { JsonHttpResponseReader } from "../json";
import { PureResponseHttpResponseReader } from "../pure-response";
import { WritableStreamHttpResponseReader } from "../writable-stream";

type GlobalWithPicker = { showSaveFilePicker?: jest.Mock };

const createFileHandle = () => {
  const written: Array<Uint8Array> = [];
  const fileStream = {
    abort: jest.fn(() => Promise.resolve()),
    close: jest.fn(() => Promise.resolve()),
    write: jest.fn((chunk: Uint8Array) => {
      written.push(chunk);
      return Promise.resolve();
    }),
  };
  const fileHandle = { createWritable: () => Promise.resolve(fileStream) };
  return { fileHandle, fileStream, written };
};

describe("http", () => {
  describe("response-readers", () => {
    it("JsonHttpResponseReader reads the body as JSON, undefined if empty", async () => {
      const reader = new JsonHttpResponseReader();
      await expect(reader.read(new Response('{"a":1}'))).resolves.toEqual({ a: 1 });
      await expect(reader.read(new Response(""))).resolves.toBeUndefined();
    });
    it("BlobAndFilenameHttpResponseReader reads the blob and the filename", async () => {
      const headers = { "Content-Disposition": "attachment; filename=a.txt" };
      const { blob, filename } = await new BlobAndFilenameHttpResponseReader().read(
        new Response("abc", { headers })
      );
      expect(await blob.text()).toBe("abc");
      expect(filename).toBe("a.txt");
    });
    it("PureResponseHttpResponseReader returns the response itself", async () => {
      const response = new Response("abc");
      await expect(new PureResponseHttpResponseReader().read(response)).resolves.toBe(
        response
      );
    });
    describe("WritableStreamHttpResponseReader", () => {
      afterEach(() => {
        delete (globalThis as GlobalWithPicker).showSaveFilePicker;
      });
      it("Writes the whole body into the chosen file, then resolves", async () => {
        const { fileHandle, fileStream, written } = createFileHandle();
        const picker = jest.fn(() => Promise.resolve(fileHandle));
        (globalThis as GlobalWithPicker).showSaveFilePicker = picker;
        const onStreamWrite = jest.fn();
        const headers = { "Content-Disposition": 'attachment; filename="a.txt"' };
        await new WritableStreamHttpResponseReader({ onStreamWrite }).read(
          new Response("hello", { headers })
        );
        expect(picker).toHaveBeenCalledWith({ suggestedName: "a.txt" });
        expect(Buffer.concat(written).toString()).toBe("hello");
        expect(onStreamWrite).toHaveBeenCalled();
        expect(fileStream.close).toHaveBeenCalled();
      });
      it("Uses the given file picker options", async () => {
        const { fileHandle } = createFileHandle();
        const picker = jest.fn(() => Promise.resolve(fileHandle));
        (globalThis as GlobalWithPicker).showSaveFilePicker = picker;
        const getFilePickerOptions = jest.fn(() => ({ id: "downloads" }));
        await new WritableStreamHttpResponseReader({ getFilePickerOptions }).read(
          new Response("x", { headers: { "Content-Type": "text/plain" } })
        );
        expect(getFilePickerOptions).toHaveBeenCalledWith("", "text/plain");
        expect(picker).toHaveBeenCalledWith({ id: "downloads" });
      });
      it("Rejects if the user dismisses the picker", async () => {
        const abort = new Error("AbortError");
        (globalThis as GlobalWithPicker).showSaveFilePicker = jest.fn(() =>
          Promise.reject(abort)
        );
        await expect(
          new WritableStreamHttpResponseReader().read(new Response("x"))
        ).rejects.toBe(abort);
      });
      it("Rejects if the save file picker is not supported", async () => {
        await expect(
          new WritableStreamHttpResponseReader().read(new Response("x"))
        ).rejects.toBeInstanceOf(MethodNotImplementedException);
      });
      it("Rejects if the response has no body", async () => {
        await expect(
          new WritableStreamHttpResponseReader().read(new Response(null))
        ).rejects.toBeDefined();
      });
    });
  });
});
