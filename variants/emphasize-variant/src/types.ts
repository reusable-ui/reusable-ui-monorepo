/**
 * Props for specifying the visual emphasis of the component.
 * 
 * Accepts an optional `emphasized`, falling back to a default when not provided.
 */
export interface EmphasizeVariantProps {
    /**
     * Specifies the desired emphasized state of the component:
     * - `true`     : visually emphasizes the component
     * - `false`    : does not emphasize the component
     * - `'inherit'`: inherits visual emphasis from a parent context
     * - `'invert'` : flips the inherited visual emphasis (`false` ⇄ `true`)
     */
    emphasized          ?: boolean | 'inherit' | 'invert'
}

/**
 * Optional configuration options for specifying the default visual emphasis.
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
 * Represents the final resolved emphasized state for the component, along with its associated CSS class name.
 */
export interface ResolvedEmphasizeVariant {
    /**
     * Indicates whether the component should appear visually emphasized.
     * 
     * Possible values:
     * - `true`  : visually emphasizes the component
     * - `false` : does not emphasize the component
     */
    emphasized           : boolean
    
    /**
     * CSS class name corresponding to the resolved emphasized state.
     * 
     * Possible values:
     * - `'is-emphasized'`
     * - `'not-emphasized'`
     */
    emphasizedClassname  : 'is-emphasized' | 'not-emphasized'
}
