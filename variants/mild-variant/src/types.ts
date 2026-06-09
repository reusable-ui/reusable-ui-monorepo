/**
 * Props for specifying the mild (reading friendly) appearance of the component.
 * 
 * Accepts an optional `mild`, defaulting to a default when not provided.
 */
export interface MildVariantProps {
    /**
     * Specifies the desired mild appearance of the component:
     * - `true`     : softens (reading friendly) the component
     * - `false`    : does not soften the component
     * - `'inherit'`: inherits mild appearance from a parent context
     * - `'invert'` : flips the inherited mild appearance (`true` ⇄ `false`)
     * 
     * Defaults to `'inherit'` (inherits from parent context).
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
     * Specifies the default mild appearance when no `mild` prop is explicitly provided:
     * - `true`     : softens (reading friendly) the component
     * - `false`    : does not soften the component
     * - `'inherit'`: inherits mild appearance from a parent context
     * - `'invert'` : flips the inherited mild appearance (`true` ⇄ `false`)
     * 
     * Defaults to `'inherit'` (inherits from parent context).
     */
    defaultMild   ?: boolean | 'inherit' | 'invert'
    
    /**
     * Specifies the fallback mild appearance when no effective mild value can be resolved:
     * - `true`  : softens (reading friendly) the component
     * - `false` : does not soften the component
     * 
     * This fallback applies when `mild` prop is set to `'inherit'` or `'invert'` but no context is available.
     * 
     * Defaults to `false` (does not soften the component).
     */
    fallbackMild  ?: boolean
}

/**
 * Represents the final resolved mild state of the component, along with its associated CSS class name.
 */
export interface MildVariant {
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
