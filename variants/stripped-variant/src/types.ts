/**
 * Props for specifying the stripped (frameless) layout of the component.
 * 
 * The `stripped` prop controls whether the visual framing and spacing (such as
 * borders, paddings, and margins) are removed, allowing the component
 * to visually merge with its surrounding layout.
 * 
 * Accepts an optional `stripped`, defaulting to a default when not provided.
 * 
 * The type of `TStripped` can be `true` or a string, depending
 * on the component's needs.
 * 
 * @template TStripped - The extended type of the `stripped` prop, allowing `true` or custom string-based modes.
 */
export interface StrippedVariantProps<TStripped extends true | string = true> {
    /**
     * Specifies the desired stripped layout of the component:
     * - `true`  : strips out the visual framing (no borders, no paddings) for seamless embedding
     * - `false` : preserves full visual framing for standalone presentation
     * 
     * Defaults to `false` (full framing).
     */
    stripped         ?: false | TStripped
}

/**
 * Optional configuration options for specifying the default stripped layout.
 * 
 * Applied when the component does not explicitly provide the `stripped` prop.
 * 
 * @template TStripped - The extended type of the `stripped` prop, allowing `true` or custom string-based modes.
 */
export interface StrippedVariantOptions<TStripped extends true | string = true> {
    /**
     * Specifies the default stripped layout when no `stripped` prop is explicitly provided:
     * - `true`  : strips out the visual framing (no borders, no paddings) for seamless embedding
     * - `false` : preserves full visual framing for standalone presentation
     * 
     * Defaults to `false` (full framing).
     */
    defaultStripped  ?: false | TStripped
}

/**
 * Represents the final resolved stripped state of the component, along with its associated CSS class name.
 * 
 * @template TStripped - The extended type of the `stripped` prop, allowing `true` or custom string-based modes.
 */
export interface StrippedVariant<TStripped extends true | string = true> {
    /**
     * Indicates whether the component should appear stripped (frameless layout).
     * 
     * Possible values:
     * - `true`  : strips out the visual framing (no borders, no paddings) for seamless embedding
     * - `false` : preserves full visual framing for standalone presentation
     */
    stripped          : false | TStripped
    
    /**
     * A CSS class name reflecting the resolved stripped state.
     * 
     * Possible values:
     * - `'is-stripped'`   — when `stripped` is `true`
     * - `'not-stripped'`  — when `stripped` is `false`
     * - `'is-flat'`, etc. — when `stripped` is `string`
     */
    strippedClassname :
        | 'is-stripped'
        | 'not-stripped'
        | (TStripped extends string ? `is-${TStripped}` : never)
}
