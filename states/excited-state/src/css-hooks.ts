// Types:
import {
    type CssExcitedStateOptions,
    type CssExcitedState,
}                           from './css-types.js'

// CSS Variables:
import {
    excitedStateVars,
}                           from './css-internal-variables.js'

// CSS Selectors:
import {
    ifExcited,
    ifNotExcited,
}                           from './css-selectors.js'

// Reusable-ui states:
import {
    // Hooks:
    usingActivityState,
}                           from '@reusable-ui/activity-state'      // Reusable abstraction for representing state-driven animations in React components — indicating ongoing activity or draw user attention.



/**
 * Generates CSS rules that conditionally apply the excitement animation based on current excited state,
 * and exposes excitement-related CSS variables for conditional animation.
 * 
 * @param options An optional configuration for customizing excitement animation.
 * @returns A CSS API for conditionally apply the excitement animation based on current excited state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usingAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Excited state:
 * import { usingExcitedState } from '@reusable-ui/excited-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes } from '@cssfn/core';
 * 
 * export const highlightCardStyle = () => {
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usingAnimationFeature();
 *     
 *     // Feature: excitement animation
 *     const {
 *         excitedStateRule,
 *         excitedStateVars: { excitedFactor },
 *     } = usingExcitedState({
 *         excitingAnimation: 'var(--box-exciting)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply excited state rules:
 *         ...excitedStateRule(),
 *         
 *         // Exciting animation: oscillate excitedFactor between 0 ↔ 1 several times
 *         ...vars({
 *             '--box-exciting': [
 *                 ['0.3s', 'ease-in-out', 'both', 'alternate', 4, 'exciting'],
 *             ],
 *         }),
 *         ...keyframes('exciting', {
 *             from : { [excitedFactor]: 0 },
 *             to   : { [excitedFactor]: 1 },
 *         }),
 *         
 *         // Example usage:
 *         
 *         // Oscillates scale between 1 ↔ 1.05 several times:
 *         transform: `scale(calc(1 + 0.05 * ${excitedFactor}))`,
 *         
 *         // Oscillates background color between transparent ↔ gold several times:
 *         backgroundColor: `color-mix(in oklch, transparent calc((1 - ${excitedFactor}) * 100%), gold calc(${excitedFactor} * 100%))`,
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * }
 * ```
 */
export const usingExcitedState = (options?: CssExcitedStateOptions): CssExcitedState => ({
    excitedStateRule : () => usingActivityState({
        // Activity animations for visual effects when excited:
        animations : {
            ifState   : ifExcited,
            variable  : excitedStateVars.excitingAnimation,
            animation : options?.excitingAnimation,
        },
        
        // Factor variables for movement drivers of activity animation:
        factorVar       : excitedStateVars.excitedFactor,
        factorCondVar   : excitedStateVars.excitedFactorCond,
        ifInactiveState : ifNotExcited,
        baselineFactor  : 0,
    }),
    
    excitedStateVars,
}) satisfies CssExcitedState;
