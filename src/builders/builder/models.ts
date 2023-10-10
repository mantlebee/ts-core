import { IFactory } from "@/builders";
import { isDebug } from "@/debug";

import { IBuilder } from "./interfaces";

/**
 * This is a builder implementation that use a {@link IFactory}
 * and instances the right object according to isDebug() flag.
 */
export class Builder<T> implements IBuilder<T> {
  private _factory: IFactory<T>;

  constructor(factory: IFactory<T>) {
    this._factory = factory;
  }

  public build(): T {
    if (isDebug()) return this._factory.createDebug();
    else return this._factory.createRelease();
  }
}
