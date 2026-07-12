/**
 * Props for specifying the outlined state of the component.
 * 
 * Accepts an optional `outlined`, defaulting to a default when not provided.
 */
export interface OutlinedVariantProps {
    /**
     * Specifies the desired outlined state of the component:
     * - `true`     : outlined
     * - `false`    : not outlined
     * - `'inherit'`: inherits outlined state from a parent context
     * - `'invert'` : flips the inherited outlined state (`true` ⇄ `false`)
     * 
     * Defaults to `'inherit'` (inherits from parent context).
     */
    outlined          ?: boolean | 'inherit' | 'invert'
}

/**
 * Optional configuration options for specifying the default outlined state.
 * 
 * Applied when the component does not explicitly provide the `outlined` prop.
 */
export interface OutlinedVariantOptions {
    /**
     * Specifies the default outlined state when no `outlined` prop is explicitly provided:
     * - `true`     : outlined
     * - `false`    : not outlined
     * - `'inherit'`: inherits outlined state from a parent context
     * - `'invert'` : flips the inherited outlined state (`true` ⇄ `false`)
     * 
     * Defaults to `'inherit'` (inherits from parent context).
     */
    defaultOutlined   ?: boolean | 'inherit' | 'invert'
    
    /**
     * Specifies the fallback outlined state when no effective outlined value can be resolved:
     * - `true`  : outlined
     * - `false` : not outlined
     * 
     * This fallback applies when `outlined` prop is set to `'inherit'` or `'invert'` but no context is available.
     * 
     * Defaults to `false` (not outlined).
     */
    fallbackOutlined  ?: boolean
}

/**
 * Represents the final resolved outlined state of the component, along with its associated CSS class name.
 */
export interface OutlinedVariant {
    /**
     * Indicates whether the component should appear outlined.
     * 
     * Possible values:
     * - `true`  : outlined
     * - `false` : not outlined
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
