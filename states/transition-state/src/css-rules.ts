// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomProps,
    type CssRule,
    
    
    
    // Writes css in javascript:
    states,
    fallback,
    style,
    vars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui states:
import {
    // CSS hooks:
    usesAnimationState,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.

// Types:
import {
    type TransitionBehavior,
}                           from './css-types.js'



/**
 * Applies live CSS variables for transitional styling, including:
 * - **Animation variables** for *visual effects* whenever a transitional state changes
 * - **Flag variables** for *discrete switches* in conditional styling
 * - **Factor variables** for *gradual drivers* in transitional styling
 * 
 * @param transitionBehavior - The transitional styling behaviors to apply.
 * @returns A `CssRule` that enables transitional styling to work correctly and dynamically.
 * 
 * @example
 * ```ts
 * // Describe how transitional validity state should behave:
 * const validityStateRule : CssRule = usesTransitionState({
 *     // Transitional animations for visual effects whenever a transitional state changes:
 *     animations      : [
 *         {
 *             ifState   : ifValidating,
 *             variable  : validityStateVars.animationValidating,
 *             animation : options.animationValidating,
 *         },
 *         {
 *             ifState   : ifInvalidating,
 *             variable  : validityStateVars.animationInvalidating,
 *             animation : options.animationInvalidating,
 *         },
 *         {
 *             ifState   : ifUnvalidating,
 *             variable  : validityStateVars.animationUnvalidating,
 *             animation : options.animationUnvalidating,
 *         },
 *     ],
 *     
 *     // Flags for discrete switches in conditional styling:
 *     flags           : [
 *         // Current flags:
 *         {
 *             ifState  : ifValidatingOrValid,
 *             variable : validityStateVars.isValid,
 *         },
 *         {
 *             ifState  : ifInvalidatingOrInvalid,
 *             variable : validityStateVars.isInvalid,
 *         },
 *         {
 *             ifState  : ifUnvalidatingOrUnvalidated,
 *             variable : validityStateVars.isUnvalidated,
 *         },
 *         
 *         // Past flags:
 *         {
 *             ifState  : ifWasValid,
 *             variable : validityStateVars.wasValid,
 *         },
 *         {
 *             ifState  : ifWasInvalid,
 *             variable : validityStateVars.wasInvalid,
 *         },
 *         {
 *             ifState  : ifWasUnvalidated,
 *             variable : validityStateVars.wasUnvalidated,
 *         },
 *     ],
 *     
 *     // Factor variables for gradual drivers in transitional styling:
 *     factorVar       : validityStateVars.validityFactor,
 *     factorCondVar   : validityStateVars.validityFactorCond,
 *     ifInactiveState : ifUnvalidated,
 *     activeFactors   : [
 *         {
 *             ifState : ifValid,
 *             factor  : 1,
 *         },
 *         {
 *             ifState : ifInvalid,
 *             factor  : -1,
 *         },
 *     ],
 * });
 * 
 * // Apply validity states alongside other styles:
 * return style({
 *     display  : 'grid',
 *     fontSize : '1rem',
 *     
 *     // Apply validity state rule:
 *     ...validityStateRule,
 *     // `CssRule` is an object with a unique symbol property (`{ [Symbol()]: CssRuleData }`),
 *     // so it can be safely spread without risk of overriding other styles.
 * });
 * ```
 */
export const usesTransitionState = (transitionBehavior: TransitionBehavior): CssRule => {
    // Extract transition behavior and assign defaults:
    const {
        flags           = [],
        
        factorVar,
        activeFactors   = [],
    } = transitionBehavior;
    
    
    
    // Normalize input: always work with an array internally:
    const normalizedFlags = (
        Array.isArray(flags)
        ? flags
        : [flags]
    );
    const normalizedFactors = (
        Array.isArray(activeFactors)
        ? activeFactors
        : [activeFactors]
    );
    
    
    
    // Build composite style from transition behavior:
    return style({
        // Apply transition cases:
        ...usesAnimationState(transitionBehavior),
        
        
        
        // Apply flag variables (boolean-like CSS switches):
        
        // Pre-reset all flags to `unset` to avoid accidental inheritance:
        ...fallback( // `fallback()` ensures these resets are emitted before any other declarations.
            vars(
                Object.fromEntries(
                    normalizedFlags.map(({ variable }) =>
                        // Reset each flag variable to `unset`.
                        // - [variable, 'unset'] => ['var(--var-name)', 'unset'] → normalized internally to ['--var-name', 'unset']
                        [variable, 'unset']
                    )
                ) as CssCustomProps
            )
        ),
        
        // Conditionally set flags when their state condition matches:
        ...states(
            normalizedFlags.map(({ ifState, variable }) =>
                // Only set the variable if the state condition is met:
                ifState(
                    vars({
                        // Set the flag variable to an empty string (won't carry any meaningful value) → acts as an **active switch**:
                        // - [variable] => ['var(--var-name)'] → normalized internally to ['--var-name']
                        [variable]: '',
                    })
                )
            ),
        ),
        
        
        
        // Conditionally assign discrete factor values when states are fully settled:
        ...states(
            normalizedFactors.map(({ ifState, factor }) =>
                // Only assign the variable if the state condition is met:
                ifState(
                    vars({
                        // Set `factorVar` to the provided numeric value:
                        // - [factorVar] => ['var(--var-name)'] → normalized internally to ['--var-name']
                        [factorVar]: factor,
                    })
                )
            ),
        ),
    });
};
