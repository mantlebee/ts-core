/**
 * Callback invoked with the payload every time a {@link ISubscribable} notifies.
 * @typeParam TData Type of the payload delivered to the subscriber.
 */
export type Subscription<TData> = (data: TData) => void;
