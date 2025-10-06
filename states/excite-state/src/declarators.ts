// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
    states,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ExciteStateVars,
    type CssExciteStateOptions,
    type CssExciteState,
}                           from './types.js'

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



/**
 * A CSS selector targeting excited elements.
 */
export const isExcitedSelector    : CssSelectorCollection = '.is-excited';

/**
 * A CSS selector targeting non-excited elements.
 */
export const isNotExcitedSelector : CssSelectorCollection = '.not-excited';



/**
 * Applies the given `styles` to excited elements.
 * 
 * @param styles The styles applied to excited elements.
 * @returns A `CssRule` that applies the given `styles` for excited elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifExcited({
 *         backgroundColor: 'yellow',
 *         color: 'darkorange',
 *     }),
 * });
 * ```
 */
export const ifExcited    = (styles: CssStyleCollection): CssRule => rule(isExcitedSelector    , styles);

/**
 * Applies the given `styles` to non-excited elements.
 * 
 * @param styles The styles applied to non-excited elements.
 * @returns A `CssRule` that applies the given `styles` for non-excited elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifNotExcited({
 *         backgroundColor: 'lightblue',
 *         color: 'darkblue',
 *     }),
 * });
 * ```
 */
export const ifNotExcited = (styles: CssStyleCollection): CssRule => rule(isNotExcitedSelector , styles);



/**
 * A strongly typed global mapping of excitement-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [exciteStateVars] = cssVars<ExciteStateVars>({ prefix: 'ex', minify: false });

// Register the excitement animation globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(exciteStateVars.animationExciting);

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
export const usesExciteState = (options?: CssExciteStateOptions): CssExciteState => {
    // Extract options and assign defaults:
    const {
        animationExciting = 'none', // Defaults to `none`.
    } = options ?? {};
    
    
    
    return {
        exciteStateRule : () => style({
            ...states({
                ...ifExcited(
                    vars({
                        [exciteStateVars.animationExciting] : animationExciting, // Activate the animation (if provided).
                    })
                ),
            }),
        }),
        
        exciteStateVars,
    } satisfies CssExciteState;
};
