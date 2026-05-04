// Types:
import {
    type CssExciteStateOptions,
    type CssExciteState,
}                           from './types.js'

// CSS Variables:
import {
    exciteStateVars,
}                           from './css-variables.js'

// CSS Selectors:
import {
    ifExcited,
    ifNotExcited,
}                           from './css-selectors.js'

// Reusable-ui states:
import {
    // Hooks:
    usesActivityState,
}                           from '@reusable-ui/activity-state'      // Reusable abstraction for representing state-driven animations in React components — indicating ongoing activity or draw user attention.



/**
 * Generates CSS rules that conditionally apply the excitement animation based on current excited state,
 * and exposes excitement-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing excitement animation.
 * @returns A CSS API for conditionally apply the excitement animation based on current excited state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Excite state:
 * import { usesExciteState } from '@reusable-ui/excite-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes } from '@cssfn/core';
 * 
 * export const highlightCardStyle = () => {
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     // Feature: excite animation
 *     const {
 *         exciteStateRule,
 *         exciteStateVars: { exciteFactor },
 *     } = usesExciteState({
 *         animationExciting: 'var(--box-exciting)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply excite state rules:
 *         ...exciteStateRule(),
 *         
 *         // Exciting animation: oscillate exciteFactor between 0 ↔ 1 several times
 *         ...vars({
 *             '--box-exciting': [
 *                 ['0.3s', 'ease-in-out', 'both', 'alternate', 4, 'exciting'],
 *             ],
 *         }),
 *         ...keyframes('exciting', {
 *             from : { [exciteFactor]: 0 },
 *             to   : { [exciteFactor]: 1 },
 *         }),
 *         
 *         // Example usage:
 *         
 *         // Oscillates scale between 1 ↔ 1.05 several times:
 *         transform: `scale(calc(1 + 0.05 * ${exciteFactor}))`,
 *         
 *         // Oscillates background color between transparent ↔ gold several times:
 *         backgroundColor: `color-mix(in oklch, transparent calc((1 - ${exciteFactor}) * 100%), gold calc(${exciteFactor} * 100%))`,
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * }
 * ```
 */
export const usesExciteState = (options?: CssExciteStateOptions): CssExciteState => ({
    exciteStateRule : () => usesActivityState({
        // Activity animations for visual effects when excited:
        animations : {
            ifState   : ifExcited,
            variable  : exciteStateVars.animationExciting,
            animation : options?.animationExciting,
        },
        
        // Factor variables for movement drivers of activity animation:
        factorVar       : exciteStateVars.exciteFactor,
        factorCondVar   : exciteStateVars.exciteFactorCond,
        ifInactiveState : ifNotExcited,
        baselineFactor  : 0,
    }),
    
    exciteStateVars,
}) satisfies CssExciteState;
