/**
 * Props for specifying the bare (frameless) layout of the component.
 * 
 * The `bare` prop controls whether the visual framing and spacing (such as
 * borders, paddings, and margins) are removed, allowing the component
 * to visually merge with its surrounding layout.
 * 
 * Accepts an optional `bare`, falling back to a default when not provided.
 * 
 * The type of `TBare` can be `true` or a string, depending
 * on the component's needs.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or string modes.
 */
export interface BareVariantProps<TBare extends true | string = true> {
    /**
     * Specifies the desired bare layout of the component:
     * - `true`  : strips out the visual framing (no borders, no paddings) for seamless embedding
     * - `false` : preserves full visual framing for standalone presentation
     */
    bare          ?: false | TBare
}

/**
 * Optional configuration options for specifying the default bare layout.
 * 
 * Applied when the component does not explicitly provide the `bare` prop.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or string modes.
 */
export interface BareVariantOptions<TBare extends true | string = true> {
    /**
     * The default bare state to apply when no `bare` prop is explicitly provided.
     */
    defaultBare   ?: false | TBare
}

/**
 * Represents the final resolved bare state of the component, along with its associated CSS class name.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or string modes.
 */
export interface ResolvedBareVariant<TBare extends true | string = true> {
    /**
     * Indicates whether the component should appear in a bare (frameless) layout.
     * 
     * Possible values:
     * - `true`  : strips out the visual framing (no borders, no paddings) for seamless embedding
     * - `false` : preserves full visual framing for standalone presentation
     */
    bare           : false | TBare
    
    /**
     * A CSS class name reflecting the resolved bare state.
     * 
     * Possible values:
     * - `'is-bare'`       — when `bare` is `true`
     * - `'not-bare'`      — when `bare` is `false`
     * - `'is-flat'`, etc. — when `bare` is `string`
     */
    bareClassname  :
        | 'is-bare'
        | 'not-bare'
        | (TBare extends string ? `is-${TBare}` : never)
}
