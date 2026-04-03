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
 * // Excitement state:
 * import { usesExciteState } from '@reusable-ui/excite-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes } from '@cssfn/core';
 * 
 * export const highlightCardStyle = () => {
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     const {
 *         exciteStateRule,
 *     } = usesExciteState({
 *         animationExciting: 'var(--highlight-exciting)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply excitement state rules:
 *         ...exciteStateRule(),
 *         
 *         // Define exciting animation:
 *         ...vars({
 *             '--highlight-exciting': [
 *                 ['0.3s', 'ease-in-out', 'both', 'alternate', 4, 'pulse-highlight'],
 *             ],
 *         }),
 *         ...keyframes('pulse-highlight', {
 *             from: {
 *                 transform: 'scale(1)',
 *                 backgroundColor: 'transparent',
 *             },
 *             to: {
 *                 transform: 'scale(1.05)',
 *                 backgroundColor: 'gold',
 *             },
 *         }),
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * }
 * ```
 */
export const usesExciteState = (options?: CssExciteStateOptions): CssExciteState => ({
    exciteStateRule : () => usesActivityState({
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
