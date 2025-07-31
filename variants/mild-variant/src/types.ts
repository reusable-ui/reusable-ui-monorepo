/**
 * Props for specifying the mild appearance of the component.
 * 
 * Accepts an optional `mild`, falling back to a default when not provided.
 */
export interface MildVariantProps {
    /**
     * Specifies the desired mild appearance of the component:
     * - `true`     : softens (reading friendly) the component
     * - `false`    : does not soften the component
     * - `'inherit'`: inherits mild appearance from a parent context
     * - `'invert'` : flips the inherited mild appearance (`true` ⇄ `false`)
     */
    mild          ?: boolean | 'inherit' | 'invert'
}

/**
 * Optional configuration options for specifying the default mild appearance.
 * 
 * Applied when the component does not explicitly provide the `mild` prop.
 */
export interface MildVariantOptions {
    /**
     * The default mild state to apply when no `mild` prop is explicitly provided.
     */
    defaultMild   ?: boolean
}

/**
 * Represents the final resolved mild state of the component, along with its associated CSS class name.
 */
export interface ResolvedMildVariant {
    /**
     * Indicates whether the component should appear in a mild (reading friendly).
     * 
     * Possible values:
     * - `true`  : softens (reading friendly) the component
     * - `false` : does not soften the component
     */
    mild           : boolean
    
    /**
     * A CSS class name reflecting the resolved mild state.
     * 
     * Possible values:
     * - `'is-mild'`
     * - `'not-mild'`
     */
    mildClassname  : 'is-mild' | 'not-mild'
}
