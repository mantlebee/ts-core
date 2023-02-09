export class FakeTimeout {
  public constructor() {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
  }
  public runPending() {
    jest.runOnlyPendingTimers();
  }
}
