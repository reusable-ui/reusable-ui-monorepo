// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomSimpleRef,
    type CssKnownProps,
    type CssRule,
    type CssStyleCollection,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * Represents a single animation case definition.
 * 
 * The animation is automatically applied when the state condition is met.
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
     * The state condition function that determines when the animation applies.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifValidating`, `ifInvalidating`, `ifUnvalidating`
     * - A custom function using `rule()`, e.g. `(styles) => rule('.is-validating', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState    : (styles: CssStyleCollection) => CssRule
    
    /**
     * The CSS variable to assign when the state condition is met.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `validityStateVars.animationValidating` (recommended)
     */
    variable   : CssCustomSimpleRef
    
    /**
     * The animation value or reference to apply to the variable.
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
