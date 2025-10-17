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
    type HoverStateVars,
    type CssHoverStateOptions,
    type CssHoverState,
}                           from './types.js'

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



/**
 * A CSS selector targeting elements in the fully hovered state.
 * 
 * Excludes elements currently in the hovering transition.
 */
export const isHoveredSelector           : CssSelectorCollection = '.is-hovered';

/**
 * A CSS selector targeting elements in the fully leaved state.
 * 
 * Excludes elements currently in the leaving transition.
 */
export const isLeavedSelector            : CssSelectorCollection = '.is-leaved';

/**
 * A CSS selector targeting elements currently in the hovering transition.
 * 
 * Excludes elements that have already reached the hovered state.
 */
export const isHoveringSelector          : CssSelectorCollection = '.is-hovering';

/**
 * A CSS selector targeting elements currently in the leaving transition.
 * 
 * Excludes elements that have already reached the leaved state.
 */
export const isLeavingSelector           : CssSelectorCollection = '.is-leaving';

/**
 * A CSS selector targeting elements that are either hovering or fully hovered.
 */
export const isHoveringOrHoveredSelector : CssSelectorCollection = ':is(.is-hovering, .is-hovered)';

/**
 * A CSS selector targeting elements that are either leaving or fully leaved.
 */
export const isLeavingOrLeavedSelector   : CssSelectorCollection = ':is(.is-leaving, .is-leaved)';



/**
 * Applies the given `styles` to elements in the fully hovered state.
 * 
 * Excludes elements currently in the hovering transition.
 * 
 * @param styles The styles applied to elements in the fully hovered state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully hovered state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifHovered({
 *         outline: '2px solid blue',
 *     }),
 * });
 * ```
 */
export const ifHovered           = (styles: CssStyleCollection): CssRule => rule(isHoveredSelector           , styles);

/**
 * Applies the given `styles` to elements in the fully leaved state.
 * 
 * Excludes elements currently in the leaving transition.
 * 
 * @param styles The styles applied to elements in the fully leaved state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully leaved state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifLeaved({
 *         outline: 'none',
 *     }),
 * });
 * ```
 */
export const ifLeaved            = (styles: CssStyleCollection): CssRule => rule(isLeavedSelector            , styles);

/**
 * Applies the given `styles` to elements currently in the hovering transition.
 * 
 * Excludes elements that have already reached the hovered state.
 * 
 * @param styles The styles applied to elements currently in the hovering transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the hovering transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifHovering({
 *         outline: '2px solid blue',
 *     }),
 * });
 * ```
 */
export const ifHovering          = (styles: CssStyleCollection): CssRule => rule(isHoveringSelector          , styles);

/**
 * Applies the given `styles` to elements currently in the leaving transition.
 * 
 * Excludes elements that have already reached the leaved state.
 * 
 * @param styles The styles applied to elements currently in the leaving transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the leaving transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifLeaving({
 *         outline: 'none',
 *     }),
 * });
 * ```
 */
export const ifLeaving           = (styles: CssStyleCollection): CssRule => rule(isLeavingSelector           , styles);

/**
 * Applies the given `styles` to elements that are either hovering or fully hovered.
 * 
 * @param styles The styles applied to elements that are either hovering or fully hovered.
 * @returns A `CssRule` that applies the given `styles` for elements that are either hovering or fully hovered.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifHoveringOrHovered({
 *         outline: '2px solid blue',
 *     }),
 * });
 * ```
 */
export const ifHoveringOrHovered = (styles: CssStyleCollection): CssRule => rule(isHoveringOrHoveredSelector , styles);

/**
 * Applies the given `styles` to elements that are either leaving or fully leaved.
 * 
 * @param styles The styles applied to elements that are either leaving or fully leaved.
 * @returns A `CssRule` that applies the given `styles` for elements that are either leaving or fully leaved.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifLeavingOrLeaved({
 *         outline: 'none',
 *     }),
 * });
 * ```
 */
export const ifLeavingOrLeaved   = (styles: CssStyleCollection): CssRule => rule(isLeavingOrLeavedSelector   , styles);



/**
 * A strongly typed global mapping of hover/leave-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [hoverStateVars] = cssVars<HoverStateVars>({ prefix: 'ho', minify: false });

// Register the hover/leave-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(hoverStateVars.animationHovering);
animationRegistry.registerAnimation(hoverStateVars.animationLeaving);

/**
 * Generates CSS rules that conditionally apply the hover/leave animations based on current hovered state,
 * and exposes hover/leave-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing hover/leave animations.
 * @returns A CSS API for conditionally apply the hover/leave animations based on current hovered state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Hovered/leaved state:
 * import { usesHoverState } from '@reusable-ui/hover-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, fallback } from '@cssfn/core';
 * 
 * export const hoverableBoxStyle = () => {
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     const {
 *         hoverStateRule,
 *         hoverStateVars: { isHovered, isLeaved },
 *     } = usesHoverState({
 *         animationHovering : 'var(--box-hovering)',
 *         animationLeaving  : 'var(--box-leaving)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply hovered/leaved state rules:
 *         ...hoverStateRule(),
 *         
 *         // Define hovering animation:
 *         ...vars({
 *             '--box-hovering': [
 *                 ['0.3s', 'ease-out', 'both', 'outline-hovering'],
 *             ],
 *         }),
 *         ...keyframes('outline-hovering', {
 *             from: {
 *                 outline: 'none',
 *             },
 *             to: {
 *                 outline: '2px solid blue',
 *             },
 *         }),
 *         
 *         // Define leaving animation:
 *         ...vars({
 *             '--box-leaving': [
 *                 ['0.3s', 'ease-out', 'both', 'outline-leaving'],
 *             ],
 *         }),
 *         ...keyframes('outline-leaving', {
 *             from: {
 *                 outline: '2px solid blue',
 *             },
 *             to: {
 *                 outline: 'none',
 *             },
 *         }),
 *         
 *         // Define final outline based on lifecycle state:
 *         ...fallback({
 *             '--outline-hovered' : `${isHovered} 2px solid blue`,
 *         }),
 *         ...fallback({
 *             '--outline-leaved'  : `${isLeaved} none`,
 *         }),
 *         outline: 'var(--outline-hovered, var(--outline-leaved))',
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesHoverState = (options?: CssHoverStateOptions): CssHoverState => {
    // Extract options and assign defaults:
    const {
        animationHovering = 'none', // Defaults to `none`.
        animationLeaving  = 'none', // Defaults to `none`.
    } = options ?? {};
    
    
    
    return {
        hoverStateRule : () => style({
            ...states({
                // Apply hovering animation during the hovering phase:
                ...ifHovering(
                    vars({
                        [hoverStateVars.animationHovering] : animationHovering, // Activate the animation (if provided).
                    })
                ),
                
                // Apply leaving animation during the leaving phase:
                ...ifLeaving(
                    vars({
                        [hoverStateVars.animationLeaving ] : animationLeaving,  // Activate the animation (if provided).
                    })
                ),
                
                
                
                // Mark as hovered during both hovering and fully hovered states:
                ...ifHoveringOrHovered(
                    vars({
                        [hoverStateVars.isHovered] : '',      // Valid    when either hovering or fully hovered.
                        [hoverStateVars.isLeaved ] : 'unset', // Poisoned when either hovering or fully hovered.
                    })
                ),
                
                // Mark as leaved during both leaving and fully leaved states:
                ...ifLeavingOrLeaved(
                    vars({
                        [hoverStateVars.isHovered] : 'unset', // Poisoned when either leaving or fully leaved.
                        [hoverStateVars.isLeaved ] : '',      // Valid    when either leaving or fully leaved.
                    })
                ),
            }),
        }),
        
        hoverStateVars,
    } satisfies CssHoverState;
};
