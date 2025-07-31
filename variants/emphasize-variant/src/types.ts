/**
 * Props for specifying the emphasized appearance of the component.
 * 
 * Accepts an optional `emphasized`, falling back to a default when not provided.
 */
export interface EmphasizeVariantProps {
    /**
     * Specifies the desired emphasized appearance of the component:
     * - `true`     : emphasizes the component
     * - `false`    : does not emphasize the component
     * - `'inherit'`: inherits emphasized appearance from a parent context
     * - `'invert'` : flips the inherited emphasized appearance (`true` ⇄ `false`)
     */
    emphasized          ?: boolean | 'inherit' | 'invert'
}

/**
 * Optional configuration options for specifying the default emphasized appearance.
 * 
 * Applied when the component does not explicitly provide the `emphasized` prop.
 */
export interface EmphasizeVariantOptions {
    /**
     * The default emphasized state to apply when no `emphasized` prop is explicitly provided.
     */
    defaultEmphasized   ?: boolean
}

/**
 * Represents the final resolved emphasized state of the component, along with its associated CSS class name.
 */
export interface ResolvedEmphasizeVariant {
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
    emphasizedClassname  : 'is-emphasized' | 'not-emphasized'
}
