// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
    
    
    
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type PressStateVars,
    type CssPressStateOptions,
    type CssPressState,
}                           from './types.js'

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.

// Reusable-ui states:
import {
    // Hooks:
    usesFeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * A CSS selector targeting elements in the fully pressed state.
 * 
 * Excludes elements currently in the pressing transition.
 */
export const isPressedSelector             : CssSelectorCollection = '.is-pressed';

/**
 * A CSS selector targeting elements in the fully released state.
 * 
 * Excludes elements currently in the releasing transition.
 */
export const isReleasedSelector            : CssSelectorCollection = '.is-released';

/**
 * A CSS selector targeting elements currently in the pressing transition.
 * 
 * Excludes elements that have already reached the pressed state.
 */
export const isPressingSelector            : CssSelectorCollection = '.is-pressing';

/**
 * A CSS selector targeting elements currently in the releasing transition.
 * 
 * Excludes elements that have already reached the released state.
 */
export const isReleasingSelector           : CssSelectorCollection = '.is-releasing';

/**
 * A CSS selector targeting elements that are either pressing or fully pressed.
 */
export const isPressingOrPressedSelector   : CssSelectorCollection = ':is(.is-pressing, .is-pressed)';

/**
 * A CSS selector targeting elements that are either releasing or fully released.
 */
export const isReleasingOrReleasedSelector : CssSelectorCollection = ':is(.is-releasing, .is-released)';



/**
 * Applies the given `styles` to elements in the fully pressed state.
 * 
 * Excludes elements currently in the pressing transition.
 * 
 * @param styles The styles applied to elements in the fully pressed state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully pressed state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifPressed({
 *         backgroundColor: 'darkblue',
 *     }),
 * });
 * ```
 */
export const ifPressed             = (styles: CssStyleCollection): CssRule => rule(isPressedSelector             , styles);

/**
 * Applies the given `styles` to elements in the fully released state.
 * 
 * Excludes elements currently in the releasing transition.
 * 
 * @param styles The styles applied to elements in the fully released state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully released state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifReleased({
 *         backgroundColor: 'blue',
 *     }),
 * });
 * ```
 */
export const ifReleased            = (styles: CssStyleCollection): CssRule => rule(isReleasedSelector            , styles);

/**
 * Applies the given `styles` to elements currently in the pressing transition.
 * 
 * Excludes elements that have already reached the pressed state.
 * 
 * @param styles The styles applied to elements currently in the pressing transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the pressing transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifPressing({
 *         backgroundColor: 'darkblue',
 *     }),
 * });
 * ```
 */
export const ifPressing            = (styles: CssStyleCollection): CssRule => rule(isPressingSelector            , styles);

/**
 * Applies the given `styles` to elements currently in the releasing transition.
 * 
 * Excludes elements that have already reached the released state.
 * 
 * @param styles The styles applied to elements currently in the releasing transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the releasing transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifReleasing({
 *         backgroundColor: 'blue',
 *     }),
 * });
 * ```
 */
export const ifReleasing           = (styles: CssStyleCollection): CssRule => rule(isReleasingSelector           , styles);

/**
 * Applies the given `styles` to elements that are either pressing or fully pressed.
 * 
 * @param styles The styles applied to elements that are either pressing or fully pressed.
 * @returns A `CssRule` that applies the given `styles` for elements that are either pressing or fully pressed.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifPressingOrPressed({
 *         backgroundColor: 'darkblue',
 *     }),
 * });
 * ```
 */
export const ifPressingOrPressed   = (styles: CssStyleCollection): CssRule => rule(isPressingOrPressedSelector   , styles);

/**
 * Applies the given `styles` to elements that are either releasing or fully released.
 * 
 * @param styles The styles applied to elements that are either releasing or fully released.
 * @returns A `CssRule` that applies the given `styles` for elements that are either releasing or fully released.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifReleasingOrReleased({
 *         backgroundColor: 'blue',
 *     }),
 * });
 * ```
 */
export const ifReleasingOrReleased = (styles: CssStyleCollection): CssRule => rule(isReleasingOrReleasedSelector , styles);



/**
 * A strongly typed global mapping of press/release-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [pressStateVars] = cssVars<PressStateVars>({ prefix: 'pr', minify: false });

// Register the press/release-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(pressStateVars.animationPressing);
animationRegistry.registerAnimation(pressStateVars.animationReleasing);

/**
 * Generates CSS rules that conditionally apply the press/release animations based on current pressed state,
 * and exposes press/release-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing press/release animations.
 * @returns A CSS API for conditionally apply the press/release animations based on current pressed state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Pressed/released state:
 * import { usesPressState } from '@reusable-ui/press-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, fallback } from '@cssfn/core';
 * 
 * export const pressableBoxStyle = () => {
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     // Feature: press/release lifecycle
 *     const {
 *         pressStateRule,
 *         pressStateVars: { isPressed, isReleased, pressFactor },
 *     } = usesPressState({
 *         animationPressing  : 'var(--box-pressing)',
 *         animationReleasing : 'var(--box-releasing)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply pressed/released state rules:
 *         ...pressStateRule(),
 *         
 *         // Pressing animation: interpolate pressFactor from 0 → 1
 *         ...vars({
 *             '--box-pressing': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-pressing'],
 *             ],
 *         }),
 *         ...keyframes('transition-pressing', {
 *             from : { [pressFactor]: 0 },
 *             to   : { [pressFactor]: 1 },
 *         }),
 *         
 *         // Releasing animation: interpolate pressFactor from 1 → 0
 *         ...vars({
 *             '--box-releasing': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-releasing'],
 *             ],
 *         }),
 *         ...keyframes('transition-releasing', {
 *             from : { [pressFactor]: 1 },
 *             to   : { [pressFactor]: 0 },
 *         }),
 *         
 *         // Example usage:
 *         // - Background color interpolates with `pressFactor`.
 *         // - 0 → blue, 1 → darkblue.
 *         backgroundColor: `color-mix(in oklch,
 *             blue calc((1 - ${pressFactor}) * 100%),
 *             darkblue calc(${pressFactor} * 100%)
 *         )`,
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesPressState = (options?: CssPressStateOptions): CssPressState => ({
    pressStateRule : () => usesFeedbackState({
        // Feedback animations for visual effects whenever a press state changes:
        animations      : [
            {
                ifState   : ifPressing,
                variable  : pressStateVars.animationPressing,
                animation : options?.animationPressing,
            },
            {
                ifState   : ifReleasing,
                variable  : pressStateVars.animationReleasing,
                animation : options?.animationReleasing,
            },
        ],
        
        // Flags for discrete switches in conditional styling:
        flags           : [
            // Current flags:
            {
                ifState  : ifPressingOrPressed,
                variable : pressStateVars.isPressed,
            },
            {
                ifState  : ifReleasingOrReleased,
                variable : pressStateVars.isReleased,
            },
        ],
        
        // Factor variables for gradual drivers in transitional styling:
        factorVar       : pressStateVars.pressFactor,
        factorCondVar   : pressStateVars.pressFactorCond,
        ifInactiveState : ifReleased,
        factors         : [
            {
                ifState : ifPressed,
                factor  : 1,
            },
            // Not needed: Defaults to 0 when no case matches:
            // {
            //     ifState : ifReleased,
            //     factor  : 0,
            // },
        ],
    }),
    
    pressStateVars,
}) satisfies CssPressState;
