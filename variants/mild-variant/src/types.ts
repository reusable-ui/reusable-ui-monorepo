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



/**
 * A list of mild-related CSS variables used to enable conditional styling.
 * 
 * These variables act as boolean switches that control whether mild-specific styles
 * should be applied.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface MildVariantVars {
    /**
     * Applies when the component is in mild mode.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is in mild mode:
     *     fontWeight     : `${mildVariantVars.isMild} lighter`,
     *     textDecoration : `${mildVariantVars.isMild} underline`,
     * });
     * ```
     */
    isMild  : unknown
    
    /**
     * Applies when the component is not in mild mode.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is not in mild mode:
     *     fontWeight     : `${mildVariantVars.notMild} normal`,
     *     textDecoration : `${mildVariantVars.notMild} none`,
     * });
     * ```
     */
    notMild : unknown
}



/**
 * Provides a CSS API for enabling conditional styling based on mild mode.
 */
export interface CssMildVariant {
    /**
     * Generates CSS rules that toggle mild-related CSS variables based on the current mild mode.
     * 
     * These rules are scoped using `ifMild()` and `ifNotMild()` to toggle mild-related CSS variables.
     */
    mildVariantRule : Lazy<CssRule>
    
    /**
     * Exposes mild-related CSS variables for conditional styling.
     * 
     * Includes:
     * - `isMild`  : active when mild mode is enabled.
     * - `notMild` : active when mild mode is disabled.
     * 
     * These variables act as conditional switches:
     * - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
     * - If declared with an empty value, they **reactivate** dependent properties without altering their values.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    mildVariantVars : CssVars<MildVariantVars>
}
