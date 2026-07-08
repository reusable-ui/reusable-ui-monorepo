/**
 * Props for specifying the outline appearance of the component.
 * 
 * Accepts an optional `outlined`, defaulting to a default when not provided.
 */
export interface OutlineVariantProps {
    /**
     * Specifies the desired outline appearance of the component:
     * - `true`     : outlines the component
     * - `false`    : does not outline the component
     * - `'inherit'`: inherits outline appearance from a parent context
     * - `'invert'` : flips the inherited outline appearance (`true` ⇄ `false`)
     * 
     * Defaults to `'inherit'` (inherits from parent context).
     */
    outlined          ?: boolean | 'inherit' | 'invert'
}

/**
 * Optional configuration options for specifying the default outline appearance.
 * 
 * Applied when the component does not explicitly provide the `outlined` prop.
 */
export interface OutlineVariantOptions {
    /**
     * Specifies the default outline appearance when no `outlined` prop is explicitly provided:
     * - `true`     : outlines the component
     * - `false`    : does not outline the component
     * - `'inherit'`: inherits outline appearance from a parent context
     * - `'invert'` : flips the inherited outline appearance (`true` ⇄ `false`)
     * 
     * Defaults to `'inherit'` (inherits from parent context).
     */
    defaultOutlined   ?: boolean | 'inherit' | 'invert'
    
    /**
     * Specifies the fallback outline appearance when no effective outlined value can be resolved:
     * - `true`  : outlines the component
     * - `false` : does not outline the component
     * 
     * This fallback applies when `outlined` prop is set to `'inherit'` or `'invert'` but no context is available.
     * 
     * Defaults to `false` (does not outline the component).
     */
    fallbackOutlined  ?: boolean
}

/**
 * Represents the final resolved outlined state of the component, along with its associated CSS class name.
 */
export interface OutlineVariant {
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
    outlineClassname   : 'is-outlined' | 'not-outlined'
}
