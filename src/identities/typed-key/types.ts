/**
 * Symbol that defines a key and the type that the key represents.
 * @typeParam T The type the key represents. It is a phantom type: it is not
 * used structurally, only to keep the key and its value type associated.
 */
export interface TypedKey<T> extends Symbol {}
