import { IException } from "./interfaces";

export class Exception extends Error implements IException {
  public constructor(
    public readonly code: string,
    public readonly message: string
  ) {
    super(message);
  }
}
