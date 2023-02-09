export class TestTimeout {
  public constructor() {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
  }
  public runPending() {
    jest.runOnlyPendingTimers();
  }
}
