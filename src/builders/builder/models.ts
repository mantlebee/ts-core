import { IFactory } from "@/builders";
import { DebugMode } from "@/debug";

import { IBuilder } from "./interfaces";

/**
 * This is a builder implementation that uses a {@link IFactory}
 * and instantiates the right object according to the {@link DebugMode}.
 * @typeParam T Type of the object the builder creates.
 */
export class Builder<T> implements IBuilder<T> {
  private _factory: IFactory<T>;

  /**
   * @param factory Factory used to create the debug or release instance.
   */
  constructor(factory: IFactory<T>) {
    this._factory = factory;
  }

  /**
   * Creates an object, delegating to the factory's debug or release method
   * depending on whether {@link DebugMode} is enabled.
   * @returns an instance of T.
   */
  public build(): T {
    if (DebugMode.isEnabled) return this._factory.createDebug();
    else return this._factory.createRelease();
  }
}
