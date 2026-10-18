import { IHttpAbortController } from "../interfaces";

/**
 * {@link IHttpAbortController} backed by an `AbortController`. Once aborted,
 * every request bound to it is aborted, the following ones too.
 */
export class HttpAbortController implements IHttpAbortController {
  protected readonly controller = new AbortController();

  public abort(): Promise<void> {
    this.controller.abort();
    return Promise.resolve();
  }
  public onRequestInit(init: RequestInit): void {
    init.signal = this.controller.signal;
  }
}
