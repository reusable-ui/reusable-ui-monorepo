// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomProps,
    type CssRule,
    
    
    
    // Writes css in javascript:
    atRule,
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
 * - **Animation variables** for *visual effect* whenever a state changes
 * - **Flag variables** for *discrete switches* for conditional styling
 * - **Factor variables** for *gradual drivers* for smooth transitions
 * 
 * @param transitionBehavior - The desired transitional styling behaviors.
 * @returns A `CssRule` that makes transitional styling work correctly and dynamically.
 * 
 * @example
 * ```ts
 * // Describe how transitional validity state should behave:
 * const validityStateRule : CssRule = usesTransitionState({
 *     // Transitional animations for visual effect whenever a state changes:
 *     transitions     : [
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
 *     // Flags for discrete switches for conditional styling:
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
 *     // Factor variables for gradual drivers for smooth transitions:
 *     factorVar       : validityStateVars.validityFactor,
 *     factorCondVar   : validityStateVars.validityFactorCond,
 *     ifInactiveState : ifUnvalidated,
 *     factors         : [
 *         {
 *             ifState : ifValid,
 *             factor  : 1,
 *         },
 *         {
 *             ifState : ifInvalid,
 *             factor  : -1,
 *         },
 *         // Not needed: Defaults to 0 when no case matches:
 *         // {
 *         //     ifState : ifUnvalidated,
 *         //     factor  : 0,
 *         // },
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
        transitions     = [],
        
        flags           = [],
        
        factorVar,
        factorCondVar,
        ifInactiveState,
        factors         = [],
    } = transitionBehavior;
    
    
    
    // Build composite style from transition behavior:
    return style({
        // Apply transition cases:
        ...usesAnimationState(transitions),
        
        
        
        // Apply flag variables (boolean-like CSS switches):
        
        // Pre-reset all flags to `unset` to avoid accidental inheritance:
        ...fallback( // `fallback()` ensures these resets are emitted before any other declarations.
            vars(
                Object.fromEntries(
                    flags.map(({ variable }) =>
                        // Reset each flag variable to `unset`.
                        // - [variable, 'unset'] => ['var(--var-name)', 'unset'] → normalized internally to ['--var-name', 'unset']
                        [variable, 'unset']
                    )
                ) as CssCustomProps
            )
        ),
        
        // Conditionally set flags when their state condition matches:
        ...states(
            flags.map(({ ifState, variable }) =>
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
        
        
        
        // Apply primary factor variable:
        
        // Register `factorVar` as an animatable custom property:
        // - `initialValue: 0` ensures baseline resolves to `0` when not explicitly defined (`unset`).
        ...atRule(`@property ${factorVar.slice(4, -1)}`, { // fix: var(--customProp) => --customProp
            // @ts-ignore - `csstype` doesn't yet recognize `syntax` @property descriptor.
            syntax       : '"<number>"', // Restrict to numeric values.
            
            // @ts-ignore - `csstype` doesn't yet recognize `inherits` @property descriptor.
            inherits     : true,         // Allow inheritance into nested elements.
            
            // @ts-ignore - `csstype` doesn't yet recognize `initialValue` @property descriptor.
            initialValue : 0,            // Default baseline factor = 0 (inactive).
        }),
        
        // Conditionally assign discrete factor values when states are fully settled:
        ...states(
            factors.map(({ ifState, factor }) =>
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
        
        
        
        // Apply conditional factor variable:
        
        // Mirror `factorVar` into `factorCondVar` by default:
        // - During transitions and active states, `factorCondVar` follows `factorVar`.
        ...vars({
            [factorCondVar]: factorVar,
        }),
        
        // Drop `factorCondVar` when baseline inactive state is reached:
        // - Explicitly set to `unset` so dependent declarations fall back cleanly.
        ...states(
            // Only unset the variable if the baseline inactive state condition is met:
            ifInactiveState(
                vars({
                    [factorCondVar]: 'unset',
                })
            )
        ),
    });
};
