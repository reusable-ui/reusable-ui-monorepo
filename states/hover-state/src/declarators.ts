// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
    atRule,
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
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     // Feature: hover/unhover lifecycle
 *     const {
 *         hoverStateRule,
 *         hoverStateVars: { isHovered, isUnhovered, hoverFactor },
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
 *         // Hovering animation: interpolate hoverFactor from 0 → 1
 *         ...vars({
 *             '--box-hovering': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-hovering'],
 *             ],
 *         }),
 *         ...keyframes('transition-hovering', {
 *             from : { [hoverFactor]: 0 },
 *             to   : { [hoverFactor]: 1 },
 *         }),
 *         
 *         // Unhovering animation: interpolate hoverFactor from 1 → 0
 *         ...vars({
 *             '--box-unhovering': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-unhovering'],
 *             ],
 *         }),
 *         ...keyframes('transition-unhovering', {
 *             from : { [hoverFactor]: 1 },
 *             to   : { [hoverFactor]: 0 },
 *         }),
 *         
 *         // Example usage:
 *         // - Outline thickness interpolates with `hoverFactor`.
 *         // - 0 → none, 1 → 2px solid blue.
 *         outline: `calc(${hoverFactor} * 2px) solid blue`,
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
            
            
            
            // Register `hoverFactor` as an animatable custom property:
            // - Initial value is `0`, ensuring it resolves to `0` when not explicitly defined (`unset`).
            ...atRule(`@property ${hoverStateVars.hoverFactor.slice(4, -1)}`, { // fix: var(--customProp) => --customProp
                // @ts-ignore
                syntax       : '"<number>"',
                inherits     : true,
                initialValue : 0,
            }),
            
            ...vars({
                // Assign the settled value for `hoverFactor`:
                // - Sticks to `1` when the component is fully hovered.
                [hoverStateVars.hoverFactor]: [[
                    // Only applies if in hovered state:
                    hoverStateVars.isHovered,
                    
                    // The fully hovered value:
                    1,
                ]],
            }),
        }),
        
        hoverStateVars,
    } satisfies CssHoverState;
};
