/**
 * Props for specifying the emphasis appearance of the component.
 * 
 * Accepts an optional `emphasized`, defaulting to a default when not provided.
 */
export interface EmphasisVariantProps {
    /**
     * Specifies the desired emphasis appearance of the component:
     * - `true`     : emphasizes the component
     * - `false`    : does not emphasize the component
     * - `'inherit'`: inherits emphasis appearance from a parent context
     * - `'invert'` : flips the inherited emphasis appearance (`true` ⇄ `false`)
     * 
     * Defaults to `'inherit'` (inherits from parent context).
     */
    emphasized          ?: boolean | 'inherit' | 'invert'
}

/**
 * Optional configuration options for specifying the default emphasis appearance.
 * 
 * Applied when the component does not explicitly provide the `emphasized` prop.
 */
export interface EmphasisVariantOptions {
    /**
     * Specifies the default emphasis appearance when no `emphasized` prop is explicitly provided:
     * - `true`     : emphasizes the component
     * - `false`    : does not emphasize the component
     * - `'inherit'`: inherits emphasis appearance from a parent context
     * - `'invert'` : flips the inherited emphasis appearance (`true` ⇄ `false`)
     * 
     * Defaults to `'inherit'` (inherits from parent context).
     */
    defaultEmphasized   ?: boolean | 'inherit' | 'invert'
    
    /**
     * Specifies the fallback emphasis appearance when no effective emphasized value can be resolved:
     * - `true`  : emphasizes the component
     * - `false` : does not emphasize the component
     * 
     * This fallback applies when `emphasized` prop is set to `'inherit'` or `'invert'` but no context is available.
     * 
     * Defaults to `false` (does not emphasize the component).
     */
    fallbackEmphasized  ?: boolean
}

/**
 * Represents the final resolved emphasis state of the component, along with its associated CSS class name.
 */
export interface EmphasisVariant {
    /**
     * Indicates whether the component should appear emphasized.
     * 
     * Possible values:
     * - `true`  : emphasizes the component
     * - `false` : does not emphasize the component
     */
    emphasized           : boolean
    
    /**
     * A CSS class name reflecting the resolved emphasized state.
     * 
     * Possible values:
     * - `'is-emphasized'`
     * - `'not-emphasized'`
     */
    emphasisClassname   : 'is-emphasized' | 'not-emphasized'
}
