// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'          // Writes css in javascript.



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



/**
 * A list of outline-related CSS variables used to enable conditional styling.
 * 
 * These variables act as boolean switches that control whether outline-specific styles
 * should be applied.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface OutlineVariantVars {
    /**
     * Applies when the component is outlined.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is outlined:
     *     fontWeight     : `${outlineVariantVars.isOutlined} bold`,
     *     textDecoration : `${outlineVariantVars.isOutlined} underline`,
     * });
     * ```
     */
    isOutlined  : unknown
    
    /**
     * Applies when the component is not outlined.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is not outlined:
     *     fontWeight     : `${outlineVariantVars.notOutlined} normal`,
     *     textDecoration : `${outlineVariantVars.notOutlined} none`,
     * });
     * ```
     */
    notOutlined : unknown
}



/**
 * Provides a CSS API for enabling conditional styling based on outlined state.
 */
export interface CssOutlineVariant {
    /**
     * Generates CSS rules that toggle outline-related CSS variables based on the current outlined state.
     * 
     * These rules are scoped using `ifOutlined()` and `ifNotOutlined()` to toggle outline-related CSS variables.
     */
    outlineVariantRule : Lazy<CssRule>
    
    /**
     * Exposes outline-related CSS variables for conditional styling.
     * 
     * Includes:
     * - `isOutlined`  : active when outlined
     * - `notOutlined` : active when not outlined
     * 
     * These variables act as conditional switches:
     * - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
     * - If declared with an empty value, they **reactivate** dependent properties without altering their values.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    outlineVariantVars : CssVars<OutlineVariantVars>
}
