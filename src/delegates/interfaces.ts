export interface IDelegate<TReturn> {
  call(): TReturn;
}
