/** Type-only brand that ties a {@link TypedKey} to its value type. */
declare const typedKeyValue: unique symbol;

/**
 * Symbol that defines a key and the type that the key represents.
 *
 * `T` is carried by a type-only brand (no runtime property), so keys created
 * for different types are not assignable to each other:
 * `const k: TypedKey<number> = createTypedKey<string>()` doesn't compile.
 * @typeParam T The type the key represents.
 */
export type TypedKey<T> = symbol & { readonly [typedKeyValue]?: T };
