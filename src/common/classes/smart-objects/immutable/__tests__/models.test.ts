import { Dictionary } from "@/common";

import { FlatObject } from "../../flat";
import { ISmartObject } from "../../interfaces";
import { NestedObject } from "../../nested";
import { ImmutableObject } from "../models";

const nestedFactory = (obj: Dictionary): ISmartObject =>
  new NestedObject(obj, { createIfMissing: true, replaceIfExists: true });

describe("common", () => {
  describe("classes", () => {
    describe("smart-objects", () => {
      describe("immutable", () => {
        describe("models", () => {
          describe("ImmutableObject", () => {
            describe("reads", () => {
              it("reads through to the base object", () => {
                const obj = new ImmutableObject(
                  { a: { b: 1 } },
                  nestedFactory,
                );
                expect(obj.get("a.b")).toBe(1);
                expect(obj.has("a.b")).toBe(true);
                expect(obj.has("a.c")).toBe(false);
              });
            });

            describe("writes never mutate the input", () => {
              it("leaves the constructor dictionary untouched on set", () => {
                const base = { a: { b: 1 }, keep: true };
                const obj = new ImmutableObject(base, nestedFactory);
                obj.set("a.b", 99);
                expect(obj.get("a.b")).toBe(99);
                expect(base).toEqual({ a: { b: 1 }, keep: true });
              });
              it("leaves the constructor dictionary untouched on unset", () => {
                const base = { a: 1, b: 2 };
                const obj = new ImmutableObject(base, nestedFactory);
                obj.unset("a");
                expect(obj.has("a")).toBe(false);
                expect(obj.get("b")).toBe(2);
                expect(base).toEqual({ a: 1, b: 2 });
              });
              it("carries over untouched keys of a modified branch", () => {
                const base = { user: { name: "John", role: "admin" } };
                const obj = new ImmutableObject(base, nestedFactory);
                obj.set("user.name", "Jane");
                expect(obj.get("user.role")).toBe("admin");
                expect(obj.get("user")).toEqual({ name: "Jane", role: "admin" });
              });
            });

            describe("clone / version chain", () => {
              it("does not leak a fork's changes back to its parent", () => {
                const v1 = new ImmutableObject({ a: 1 }, nestedFactory);
                const v2 = v1.clone();
                v2.set("b", 2);
                expect(v1.has("b")).toBe(false);
                expect(v2.get("b")).toBe(2);
                expect(v2.get("a")).toBe(1);
              });
              it("inherits changes down a chain of clones", () => {
                const v1 = new ImmutableObject({ a: 1 }, nestedFactory);
                const v2 = v1.clone();
                v2.set("b", 2);
                const v3 = v2.clone();
                v3.set("c", 3);
                expect(v3.get("a")).toBe(1);
                expect(v3.get("b")).toBe(2);
                expect(v3.get("c")).toBe(3);
                expect(v2.has("c")).toBe(false);
                expect(v1.has("b")).toBe(false);
              });
            });

            describe("copy-on-write laziness", () => {
              it("shares nested references until the first write", () => {
                const base = { a: { b: 1 } };
                const v1 = new ImmutableObject(base, nestedFactory);
                const v2 = v1.clone();
                expect(v2.get("a")).toBe(v1.get("a")); // same reference, no copy yet
                v2.set("a.b", 2);
                expect(v2.get("a")).not.toBe(v1.get("a")); // v2 copied on write
                expect(v1.get("a.b")).toBe(1);
              });
            });

            describe("generic over the ISmartObject implementation", () => {
              it("works with a non-NestedObject implementation", () => {
                const base = { x: 1, y: 2 };
                const flatFactory = (obj: Dictionary): ISmartObject =>
                  new FlatObject(obj);
                const v1 = new ImmutableObject(base, flatFactory);
                const v2 = v1.clone();
                v2.set("x", 10);
                v2.unset("y");
                expect(v2.get("x")).toBe(10);
                expect(v2.has("y")).toBe(false);
                expect(v1.get("x")).toBe(1);
                expect(v1.get("y")).toBe(2);
                expect(base).toEqual({ x: 1, y: 2 });
              });
            });
          });
        });
      });
    });
  });
});
