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
 * Props for specifying the bare (frameless) layout of the component.
 * 
 * The `bare` prop controls whether the visual framing and spacing (such as
 * borders, paddings, and margins) are removed, allowing the component
 * to visually merge with its surrounding layout.
 * 
 * Accepts an optional `bare`, defaulting to a default when not provided.
 * 
 * The type of `TBare` can be `true` or a string, depending
 * on the component's needs.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or custom string-based modes.
 */
export interface BareVariantProps<TBare extends true | string = true> {
    /**
     * Specifies the desired bare layout of the component:
     * - `true`  : strips out the visual framing (no borders, no paddings) for seamless embedding
     * - `false` : preserves full visual framing for standalone presentation
     */
    bare          ?: false | TBare
}

/**
 * Optional configuration options for specifying the default bare layout.
 * 
 * Applied when the component does not explicitly provide the `bare` prop.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or custom string-based modes.
 */
export interface BareVariantOptions<TBare extends true | string = true> {
    /**
     * The default bare state to apply when no `bare` prop is explicitly provided.
     */
    defaultBare   ?: false | TBare
}

/**
 * Represents the final resolved bare state of the component, along with its associated CSS class name.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or custom string-based modes.
 */
export interface BareVariant<TBare extends true | string = true> {
    /**
     * Indicates whether the component should appear in a bare (frameless) layout.
     * 
     * Possible values:
     * - `true`  : strips out the visual framing (no borders, no paddings) for seamless embedding
     * - `false` : preserves full visual framing for standalone presentation
     */
    bare           : false | TBare
    
    /**
     * A CSS class name reflecting the resolved bare state.
     * 
     * Possible values:
     * - `'is-bare'`       — when `bare` is `true`
     * - `'not-bare'`      — when `bare` is `false`
     * - `'is-flat'`, etc. — when `bare` is `string`
     */
    bareClassname  :
        | 'is-bare'
        | 'not-bare'
        | (TBare extends string ? `is-${TBare}` : never)
}



/**
 * A list of bare-related CSS variables used to enable conditional styling.
 * 
 * These variables act as boolean switches that control whether bare-specific styles
 * should be applied.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or custom string-based modes.
 */
export type BareVariantVars<TBare extends true | string = true> =
    & {
        /**
         * Applies when the component is not in bare mode.
         * 
         * Acts as a conditional switch: when declared with an empty value,
         * any CSS property referencing this variable becomes valid and is applied.
         * If `unset`, the variable **poisons** dependent properties,
         * causing the browser to ignore them.
         * 
         * @example
         * ```ts
         * export const componentStyle = () => style({
         *     // These properties are only applied when the component is not in bare mode:
         *     fontWeight     : `${bareVariantVars.notBare} normal`,
         *     textDecoration : `${bareVariantVars.notBare} none`,
         * });
         * ```
         */
        notBare : unknown
    }
    & {
        /**
         * Applies when the component is in bare mode.
         * 
         * Acts as a conditional switch: when declared with an empty value,
         * any CSS property referencing this variable becomes valid and is applied.
         * If `unset`, the variable **poisons** dependent properties,
         * causing the browser to ignore them.
         * 
         * @example
         * ```ts
         * export const componentStyle = () => style({
         *     // These properties are only applied when the component is in bare mode:
         *     fontWeight     : `${bareVariantVars.isBare} lighter`,
         *     textDecoration : `${bareVariantVars.isBare} underline`,
         * });
         * ```
         */
        isBare : TBare extends true ? unknown : never
    }
    & {
        /**
         * Applies when the component is in a custom bare mode.
         * 
         * Dynamically generated keys based on the string value of the `bare` prop.
         * Each key follows the format `is${Mode}`, enabling semantic styling for
         * multiple bare variants.
         * 
         * Acts as a conditional switch: when declared with an empty value,
         * any CSS property referencing this variable becomes valid and is applied.
         * If `unset`, the variable **poisons** dependent properties,
         * causing the browser to ignore them.
         * 
         * @example
         * ```ts
         * export const componentStyle = () => style({
         *     // These properties are only applied when the component is in a custom bare mode:
         *     fontSize : `${bareVariantVars.isMinimal} smaller`,
         *     padding  : `${bareVariantVars.isCompact} 0.25rem`,
         * });
         * ```
         */
        [K in TBare extends string ? `is${TBare}` : never]: unknown
    }



/**
 * Configuration options for enabling bare-aware styling component configuration.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or custom string-based modes.
 */
export interface CssBareVariantOptions<TBare extends true | string = true> {
    /**
     * The list of supported bare values that the component can respond to.
     */
    supportedBareValues : TBare[]
}



/**
 * Provides a CSS API for enabling conditional styling based on bare mode.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or custom string-based modes.
 */
export interface CssBareVariant<TBare extends true | string = true> {
    /**
     * Generates CSS rules that toggle bare-related CSS variables based on the current bare mode.
     * 
     * These rules are scoped using `ifNotBare()`, `ifBare()`, and `ifBareOf()` to toggle bare-related CSS variables.
     */
    bareVariantRule : Lazy<CssRule>
    
    /**
     * Exposes bare-related CSS variables for conditional styling.
     * 
     * Includes:
     * - `notBare`     : active when bare mode is disabled.
     * - `isBare`      : active when bare mode is enabled.
     * - `is${string}` : active when bare mode is in a custom bare mode.
     * 
     * These variables act as conditional switches:
     * - If `unset`, they **poison** dependent properties, causing the browser to ignore them.
     * - If declared with an empty value, they **reactivate** dependent properties without altering their values.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    bareVariantVars : CssVars<BareVariantVars<TBare>>
}
