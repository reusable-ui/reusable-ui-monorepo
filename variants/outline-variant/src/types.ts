/**
 * Props for specifying the outlined appearance of the component.
 * 
 * Accepts an optional `outlined`, falling back to a default when not provided.
 */
export interface OutlineVariantProps {
    /**
     * Specifies the desired outlined appearance of the component:
     * - `true`     : outlines the component
     * - `false`    : does not outline the component
     * - `'inherit'`: inherits outlined appearance from a parent context
     * - `'invert'` : flips the inherited outlined appearance (`true` ⇄ `false`)
     */
    outlined          ?: boolean | 'inherit' | 'invert'
}

/**
 * Optional configuration options for specifying the default outlined appearance.
 * 
 * Applied when the component does not explicitly provide the `outlined` prop.
 */
export interface OutlineVariantOptions {
    /**
     * The default outlined state to apply when no `outlined` prop is explicitly provided.
     */
    defaultOutlined   ?: boolean
}

/**
 * Represents the final resolved outlined state of the component, along with its associated CSS class name.
 */
export interface ResolvedOutlineVariant {
    /**
     * Indicates whether the component should appear outlined.
     * 
     * Possible values:
     * - `true`  : outlines the component
     * - `false` : does not outline the component
     */
    outlined           : boolean
    
    /**
     * A CSS class name reflecting the resolved outlined state.
     * 
     * Possible values:
     * - `'is-outlined'`
     * - `'not-outlined'`
     */
    outlinedClassname  : 'is-outlined' | 'not-outlined'
}
