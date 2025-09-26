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



/**
 * A list of emphasis-related CSS variables used to enable conditional styling.
 * 
 * These variables act as boolean switches that control whether emphasis-specific styles
 * should be applied.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface EmphasisVariantVars {
    /**
     * Applies when the component is emphasized.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is emphasized:
     *     fontWeight     : `${emphasisVariantVars.isEmphasized} bold`,
     *     textDecoration : `${emphasisVariantVars.isEmphasized} underline`,
     * });
     * ```
     */
    isEmphasized  : unknown
    
    /**
     * Applies when the component is not emphasized.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is not emphasized:
     *     fontWeight     : `${emphasisVariantVars.notEmphasized} normal`,
     *     textDecoration : `${emphasisVariantVars.notEmphasized} none`,
     * });
     * ```
     */
    notEmphasized : unknown
}



/**
 * Provides a CSS API for enabling conditional styling based on emphasized state.
 */
export interface CssEmphasisVariant {
    /**
     * Generates CSS rules that toggle emphasis-related CSS variables based on the current emphasized state.
     * 
     * These rules are scoped using `ifEmphasized()` and `ifNotEmphasized()` to toggle emphasis-related CSS variables.
     */
    emphasisVariantRule : Lazy<CssRule>
    
    /**
     * Exposes emphasis-related CSS variables for conditional styling.
     * 
     * Includes:
     * - `isEmphasized`  : active when emphasized
     * - `notEmphasized` : active when not emphasized
     * 
     * These variables act as conditional switches:
     * - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
     * - If declared with an empty value, they **reactivate** dependent properties without altering their values.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    emphasisVariantVars : CssVars<EmphasisVariantVars>
}
