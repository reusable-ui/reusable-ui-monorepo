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
export const isHoveredSelector               : CssSelectorCollection = '.is-hovered';

/**
 * A CSS selector targeting elements in the fully unhovered state.
 * 
 * Excludes elements currently in the unhovering transition.
 */
export const isUnhoveredSelector             : CssSelectorCollection = '.is-unhovered';

/**
 * A CSS selector targeting elements currently in the hovering transition.
 * 
 * Excludes elements that have already reached the hovered state.
 */
export const isHoveringSelector              : CssSelectorCollection = '.is-hovering';

/**
 * A CSS selector targeting elements currently in the unhovering transition.
 * 
 * Excludes elements that have already reached the unhovered state.
 */
export const isUnhoveringSelector            : CssSelectorCollection = '.is-unhovering';

/**
 * A CSS selector targeting elements that are either hovering or fully hovered.
 */
export const isHoveringOrHoveredSelector     : CssSelectorCollection = ':is(.is-hovering, .is-hovered)';

/**
 * A CSS selector targeting elements that are either unhovering or fully unhovered.
 */
export const isUnhoveringOrUnhoveredSelector : CssSelectorCollection = ':is(.is-unhovering, .is-unhovered)';



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
export const ifHovered               = (styles: CssStyleCollection): CssRule => rule(isHoveredSelector               , styles);

/**
 * Applies the given `styles` to elements in the fully unhovered state.
 * 
 * Excludes elements currently in the unhovering transition.
 * 
 * @param styles The styles applied to elements in the fully unhovered state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully unhovered state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifUnhovered({
 *         outline: 'none',
 *     }),
 * });
 * ```
 */
export const ifUnhovered             = (styles: CssStyleCollection): CssRule => rule(isUnhoveredSelector             , styles);

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
export const ifHovering              = (styles: CssStyleCollection): CssRule => rule(isHoveringSelector              , styles);

/**
 * Applies the given `styles` to elements currently in the unhovering transition.
 * 
 * Excludes elements that have already reached the unhovered state.
 * 
 * @param styles The styles applied to elements currently in the unhovering transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the unhovering transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifUnhovering({
 *         outline: 'none',
 *     }),
 * });
 * ```
 */
export const ifUnhovering            = (styles: CssStyleCollection): CssRule => rule(isUnhoveringSelector            , styles);

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
export const ifHoveringOrHovered     = (styles: CssStyleCollection): CssRule => rule(isHoveringOrHoveredSelector     , styles);

/**
 * Applies the given `styles` to elements that are either unhovering or fully unhovered.
 * 
 * @param styles The styles applied to elements that are either unhovering or fully unhovered.
 * @returns A `CssRule` that applies the given `styles` for elements that are either unhovering or fully unhovered.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifUnhoveringOrUnhovered({
 *         outline: 'none',
 *     }),
 * });
 * ```
 */
export const ifUnhoveringOrUnhovered = (styles: CssStyleCollection): CssRule => rule(isUnhoveringOrUnhoveredSelector , styles);



/**
 * A strongly typed global mapping of hover/unhover-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [hoverStateVars] = cssVars<HoverStateVars>({ prefix: 'ho', minify: false });

// Register the hover/unhover-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(hoverStateVars.animationHovering);
animationRegistry.registerAnimation(hoverStateVars.animationUnhovering);

/**
 * Generates CSS rules that conditionally apply the hover/unhover animations based on current hovered state,
 * and exposes hover/unhover-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing hover/unhover animations.
 * @returns A CSS API for conditionally apply the hover/unhover animations based on current hovered state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Hovered/unhovered state:
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
 *         hoverStateVars: { isHovered, isUnhovered },
 *     } = usesHoverState({
 *         animationHovering   : 'var(--box-hovering)',
 *         animationUnhovering : 'var(--box-unhovering)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply hovered/unhovered state rules:
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
 *         // Define unhovering animation:
 *         ...vars({
 *             '--box-unhovering': [
 *                 ['0.3s', 'ease-out', 'both', 'outline-unhovering'],
 *             ],
 *         }),
 *         ...keyframes('outline-unhovering', {
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
 *             '--outline-hovered'   : `${isHovered} 2px solid blue`,
 *         }),
 *         ...fallback({
 *             '--outline-unhovered' : `${isUnhovered} none`,
 *         }),
 *         outline: 'var(--outline-hovered, var(--outline-unhovered))',
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
        animationHovering   = 'none', // Defaults to `none`.
        animationUnhovering = 'none', // Defaults to `none`.
    } = options ?? {};
    
    
    
    return {
        hoverStateRule : () => style({
            ...states({
                // Apply hovering animation during the hovering phase:
                ...ifHovering(
                    vars({
                        [hoverStateVars.animationHovering  ] : animationHovering,   // Activate the animation (if provided).
                    })
                ),
                
                // Apply unhovering animation during the unhovering phase:
                ...ifUnhovering(
                    vars({
                        [hoverStateVars.animationUnhovering] : animationUnhovering, // Activate the animation (if provided).
                    })
                ),
                
                
                
                // Mark as hovered during both hovering and fully hovered states:
                ...ifHoveringOrHovered(
                    vars({
                        [hoverStateVars.isHovered  ] : '',      // Valid    when either hovering or fully hovered.
                        [hoverStateVars.isUnhovered] : 'unset', // Poisoned when either hovering or fully hovered.
                    })
                ),
                
                // Mark as unhovered during both unhovering and fully unhovered states:
                ...ifUnhoveringOrUnhovered(
                    vars({
                        [hoverStateVars.isHovered  ] : 'unset', // Poisoned when either unhovering or fully unhovered.
                        [hoverStateVars.isUnhovered] : '',      // Valid    when either unhovering or fully unhovered.
                    })
                ),
            }),
        }),
        
        hoverStateVars,
    } satisfies CssHoverState;
};
