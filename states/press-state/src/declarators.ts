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
    type PressStateVars,
    type CssPressStateOptions,
    type CssPressState,
}                           from './types.js'

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



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
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     const {
 *         pressStateRule,
 *         pressStateVars: { isPressed, isReleased },
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
 *         // Define pressing animation:
 *         ...vars({
 *             '--box-pressing': [
 *                 ['0.3s', 'ease-out', 'both', 'background-color-pressing'],
 *             ],
 *         }),
 *         ...keyframes('background-color-pressing', {
 *             from: {
 *                 backgroundColor: 'blue',
 *             },
 *             to: {
 *                 backgroundColor: 'darkblue',
 *             },
 *         }),
 *         
 *         // Define releasing animation:
 *         ...vars({
 *             '--box-releasing': [
 *                 ['0.3s', 'ease-out', 'both', 'background-color-releasing'],
 *             ],
 *         }),
 *         ...keyframes('background-color-releasing', {
 *             from: {
 *                 backgroundColor: 'darkblue',
 *             },
 *             to: {
 *                 backgroundColor: 'blue',
 *             },
 *         }),
 *         
 *         // Define final background color based on lifecycle state:
 *         ...fallback({
 *             '--background-color-pressed'  : `${isPressed} darkblue`,
 *         }),
 *         ...fallback({
 *             '--background-color-released' : `${isReleased} blue`,
 *         }),
 *         backgroundColor: 'var(--background-color-pressed, var(--background-color-released))',
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesPressState = (options?: CssPressStateOptions): CssPressState => {
    // Extract options and assign defaults:
    const {
        animationPressing  = 'none', // Defaults to `none`.
        animationReleasing = 'none', // Defaults to `none`.
    } = options ?? {};
    
    
    
    return {
        pressStateRule : () => style({
            ...states({
                // Apply pressing animation during the pressing phase:
                ...ifPressing(
                    vars({
                        [pressStateVars.animationPressing ] : animationPressing,  // Activate the animation (if provided).
                    })
                ),
                
                // Apply releasing animation during the releasing phase:
                ...ifReleasing(
                    vars({
                        [pressStateVars.animationReleasing] : animationReleasing, // Activate the animation (if provided).
                    })
                ),
                
                
                
                // Mark as pressed during both pressing and fully pressed states:
                ...ifPressingOrPressed(
                    vars({
                        [pressStateVars.isPressed ] : '',      // Valid    when either pressing or fully pressed.
                        [pressStateVars.isReleased] : 'unset', // Poisoned when either pressing or fully pressed.
                    })
                ),
                
                // Mark as released during both releasing and fully released states:
                ...ifReleasingOrReleased(
                    vars({
                        [pressStateVars.isPressed ] : 'unset', // Poisoned when either releasing or fully released.
                        [pressStateVars.isReleased] : '',      // Valid    when either releasing or fully released.
                    })
                ),
            }),
        }),
        
        pressStateVars,
    } satisfies CssPressState;
};
