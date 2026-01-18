// Reusable-ui states:
import {
    // Types:
    type AnimationCase,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Defines a single activity animation case for *visual effects* whenever a state is still active.
 * 
 * Automatically runs the animation whenever the specified state condition is met.
 * 
 * @example
 * ```ts
 * const preparingCase : ActivityCase = {
 *     ifState   : ifPreparing,
 *     variable  : orderStateVars.animationPreparing,
 *     animation : options.animationPreparing,
 * };
 * ```
 */
export interface ActivityCase
    extends
        // Bases:
        AnimationCase
{
    /**
     * Determines when the animation applies.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifPreparing`, `ifShipping`, `ifDelivering`
     * - A custom function using `rule()`, e.g. `(styles) => rule('.is-preparing', styles)`
     * - Any function with signature: `(styles: CssStyleCollection) => CssRule`
     */
    ifState    : AnimationCase['ifState']
    
    /**
     * Specifies the CSS variable to assign when the state condition is met.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-var)`
     * - A strongly typed reference, e.g. `orderStateVars.animationPreparing` (recommended)
     */
    variable   : AnimationCase['variable']
    
    /**
     * Specifies the animation value or reference to apply to the variable.
     * 
     * Accepts:
     * - A hard-coded CSS variable reference, e.g. `var(--my-animation)`
     * - A hard-coded CSS variable reference with fallback, e.g. `var(--my-animation, var(--fallback))`
     * - A literal animation value, e.g. `[['0.2s', 'ease', 'both', 'alternate', 5, 'preparing']]`
     * - A strongly typed reference, e.g. `options.animationPreparing` (recommended)
     * 
     * Defaults to `'none'`.
     */
    animation ?: AnimationCase['animation']
}
