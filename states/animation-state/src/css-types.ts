// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomSimpleRef,
    type CssKnownProps,
    type CssRule,
    type CssStyleCollection,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * Defines a single animation case.
 * 
 * Runs the animation automatically when the specified state condition is met.
 * 
 * @example
 * ```ts
 * const validatingCase : AnimationCase = {
 *     ifState   : ifValidating,
 *     variable  : validityStateVars.animationValidating,
 *     animation : options.animationValidating,
 * };
 * ```
 */
export interface AnimationCase {
    /**
     * Determines when the animation applies.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifValidating`, `ifInvalidating`, `ifUnvalidating`
     * - A custom function using `rule()`, e.g. `(styles) => rule('.is-validating', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState    : (styles: CssStyleCollection) => CssRule
    
    /**
     * Specifies the CSS variable to assign when the state condition is met.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `validityStateVars.animationValidating` (recommended)
     */
    variable   : CssCustomSimpleRef
    
    /**
     * Specifies the animation value or reference to apply to the variable.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-animation)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-animation, var(--fallback))`
     * - A literal animation value, e.g. `[['0.2s', 'ease', 'both', 'alternate', 5, 'validating']]`
     * - A strongly typed reference, e.g. `options.animationValidating` (recommended)
     * 
     * Defaults to `'none'`.
     */
    animation ?: CssKnownProps['animation']
}
