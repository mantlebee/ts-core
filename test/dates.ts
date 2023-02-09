import { Nullable } from "@/common";

export class TestDateNow {
  private dateNowSpy: Nullable<jest.SpyInstance> = null;
  public constructor(private readonly value: Date) {}
  public disable() {
    if (this.dateNowSpy) this.dateNowSpy.mockRestore();
  }
  public enable() {
    this.dateNowSpy = jest
      .spyOn(Date, "now")
      .mockImplementation(() => this.value.getTime());
  }
}
