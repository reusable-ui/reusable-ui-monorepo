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
 * A list of stripped-related CSS variables used to enable conditional styling.
 * 
 * These variables act as boolean switches that control whether stripped-specific styles
 * should be applied.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 * 
 * @template TStripped - The extended type of the `stripped` prop, allowing `true` or custom string-based modes.
 */
export type StrippedVariantVars<TStripped extends true | string = true> =
    & {
        /**
         * Applies when the component is not stripped.
         * 
         * Acts as a conditional switch: when declared with an empty value,
         * any CSS property referencing this variable becomes valid and is applied.
         * If `unset`, the variable **poisons** dependent properties,
         * causing the browser to ignore them.
         * 
         * @example
         * ```ts
         * export const componentStyle = () => style({
         *     // These properties are only applied when the component is not stripped:
         *     fontWeight     : `${strippedVariantVars.notStripped} normal`,
         *     textDecoration : `${strippedVariantVars.notStripped} none`,
         * });
         * ```
         */
        notStripped : unknown
    }
    & {
        /**
         * Applies when the component is stripped.
         * 
         * Acts as a conditional switch: when declared with an empty value,
         * any CSS property referencing this variable becomes valid and is applied.
         * If `unset`, the variable **poisons** dependent properties,
         * causing the browser to ignore them.
         * 
         * @example
         * ```ts
         * export const componentStyle = () => style({
         *     // These properties are only applied when the component is stripped:
         *     fontWeight     : `${strippedVariantVars.isStripped} lighter`,
         *     textDecoration : `${strippedVariantVars.isStripped} underline`,
         * });
         * ```
         */
        isStripped  : TStripped extends true ? unknown : never
    }
    & {
        /**
         * Applies when the component is custom stripped.
         * 
         * Dynamically generated keys based on the string value of the `stripped` prop.
         * Each key follows the format `is${Mode}`, enabling semantic styling for
         * multiple stripped variants.
         * 
         * Acts as a conditional switch: when declared with an empty value,
         * any CSS property referencing this variable becomes valid and is applied.
         * If `unset`, the variable **poisons** dependent properties,
         * causing the browser to ignore them.
         * 
         * @example
         * ```ts
         * export const componentStyle = () => style({
         *     // These properties are only applied when the component is custom stripped:
         *     fontSize : `${strippedVariantVars.isMinimal} smaller`,
         *     padding  : `${strippedVariantVars.isCompact} 0.25rem`,
         * });
         * ```
         */
        [K in TStripped extends string ? `is${TStripped}` : never]: unknown
    }



/**
 * Configuration options for enabling stripped-aware styling component configuration.
 * 
 * @template TStripped - The extended type of the `stripped` prop, allowing `true` or custom string-based modes.
 */
export interface CssStrippedVariantOptions<TStripped extends true | string = true> {
    /**
     * The list of supported stripped values that the component can respond to.
     */
    supportedStrippedValues : TStripped[]
}

/**
 * Provides a CSS API for enabling conditional styling based on stripped mode.
 * 
 * @template TStripped - The extended type of the `stripped` prop, allowing `true` or custom string-based modes.
 */
export interface CssStrippedVariant<TStripped extends true | string = true> {
    /**
     * Generates CSS rules that toggle stripped-related CSS variables based on the current stripped mode.
     * 
     * These rules are scoped using `ifNotStripped()`, `ifStripped()`, and `ifStrippedOf()` to toggle stripped-related CSS variables.
     */
    strippedVariantRule : Lazy<CssRule>
    
    /**
     * Exposes stripped-related CSS variables for conditional styling.
     * 
     * Includes:
     * - `notStripped` : active when not stripped.
     * - `isStripped`  : active when stripped.
     * - `is${string}` : active when custom stripped.
     * 
     * These variables act as conditional switches:
     * - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
     * - If declared with an empty value, they **reactivate** dependent properties without altering their values.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    strippedVariantVars : CssVars<StrippedVariantVars<TStripped>>
}
