// Types:

/**
 * Unique branding symbol reserved for nominal typing.
 * Prevents accidental assignment of raw primitives
 * while avoiding noise in autocomplete tooltips.
 */
declare const CssBrandKey: unique symbol;

/**
 * Nominally brands a primitive or expression type.
 * 
 * @template TType The underlying base type (e.g. `string`, `number`).
 * @template TBrand A unique string literal identifying the branded domain.
 */
export type CssBranded<TType, TBrand extends string> = TType & {
    readonly [CssBrandKey]: TBrand;
};



/**
 * An algebraic boolean.
 * Represents a toggle *without altering* the carried value.
 * 
 * Domain:
 * - `1` → active
 * - `0` → inactive
 * - A CSS variable or expression resolving to `1` or `0`
 * 
 * Notes:
 * - `-1` is forbidden, since it would invert the carried value.
 */
export type CssAlgebraicBoolean =
    | 0
    | 1
    | CssBranded<string, 'CssAlgebraicBoolean'>

/**
 * A flippable boolean.
 * Represents a toggle that *can be inverted* by multiplying with `-1`.
 * Later converted to `CssAlgebraicBoolean` by clamping (`max(0, …)`).
 * 
 * Domain:
 * - `1`  → active
 * - `-1` → inactive
 * - A CSS variable or expression resolving to `1` or `-1`
 * 
 * Notes:
 * - `0` is forbidden, since it cannot be flipped.
 */
export type CssFlippableBoolean =
    | 1
    | -1
    | CssBranded<string, 'CssFlippableBoolean'>
