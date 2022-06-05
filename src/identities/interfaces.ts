export interface IIdentityManager<T> {
  readonly lastValue: T;
  newValue(): T;
}
