/**
 * Props for specifying the emphasized appearance of the component.
 * 
 * Accepts an optional `emphasized`, defaulting to a default when not provided.
 */
export interface EmphasizedVariantProps {
    /**
     * Specifies the desired emphasized appearance of the component:
     * - `true`     : emphasizes the component
     * - `false`    : does not emphasize the component
     * - `'inherit'`: inherits emphasized appearance from a parent context
     * - `'invert'` : flips the inherited emphasized appearance (`true` ⇄ `false`)
     * 
     * Defaults to `'inherit'` (inherits from parent context).
     */
    emphasized          ?: boolean | 'inherit' | 'invert'
}

/**
 * Optional configuration options for specifying the default emphasized appearance.
 * 
 * Applied when the component does not explicitly provide the `emphasized` prop.
 */
export interface EmphasizedVariantOptions {
    /**
     * Specifies the default emphasized appearance when no `emphasized` prop is explicitly provided:
     * - `true`     : emphasizes the component
     * - `false`    : does not emphasize the component
     * - `'inherit'`: inherits emphasized appearance from a parent context
     * - `'invert'` : flips the inherited emphasized appearance (`true` ⇄ `false`)
     * 
     * Defaults to `'inherit'` (inherits from parent context).
     */
    defaultEmphasized   ?: boolean | 'inherit' | 'invert'
    
    /**
     * Specifies the fallback emphasized appearance when no effective emphasized value can be resolved:
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
 * Represents the final resolved emphasized state of the component, along with its associated CSS classname.
 */
export interface EmphasizedVariant {
    /**
     * Indicates whether the component should appear emphasized.
     * 
     * Possible values:
     * - `true`  : emphasizes the component
     * - `false` : does not emphasize the component
     */
    emphasized           : boolean
    
    /**
     * A CSS classname for toggling the emphasized state.
     * 
     * Possible values:
     * - `'is-emphasized'`
     * - `'not-emphasized'`
     */
    emphasizedClassname  : 'is-emphasized' | 'not-emphasized'
}
