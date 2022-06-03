import { IFactory } from "@/builders";
import { debug } from "@/debug";

import { IBuilder } from "./interfaces";

/**
 * This is a builder implementation that use a factory and instances
 * the right object according to debug.isEnabled flag.
 */
export class Builder<T> implements IBuilder<T> {
  /** Factory used to build objects. */
  private _factory: IFactory<T>;

  /**
   * Constructor with one parameter, intialize the builder with the
   * factory passed.
   * @param factory - Factory to use to build the object.
   */
  constructor(factory: IFactory<T>) {
    this._factory = factory;
  }

  /** @inheritdoc */
  public create(): T {
    if (debug.isEnabled) {
      return this._factory.createDebug();
    } else {
      return this._factory.createRelease();
    }
  }
}
