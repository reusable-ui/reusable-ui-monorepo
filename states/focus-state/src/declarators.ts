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
    type FocusStateVars,
    type CssFocusStateOptions,
    type CssFocusState,
}                           from './types.js'

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



/**
 * A CSS selector targeting elements in the fully focused state.
 * 
 * Excludes elements currently in the focusing transition.
 */
export const isFocusedSelector           : CssSelectorCollection = '.is-focused';

/**
 * A CSS selector targeting elements in the fully blurred state.
 * 
 * Excludes elements currently in the blurring transition.
 */
export const isBlurredSelector           : CssSelectorCollection = '.is-blurred';

/**
 * A CSS selector targeting elements currently in the focusing transition.
 * 
 * Excludes elements that have already reached the focused state.
 */
export const isFocusingSelector          : CssSelectorCollection = '.is-focusing';

/**
 * A CSS selector targeting elements currently in the blurring transition.
 * 
 * Excludes elements that have already reached the blurred state.
 */
export const isBlurringSelector          : CssSelectorCollection = '.is-blurring';

/**
 * A CSS selector targeting elements that are either focusing or fully focused.
 */
export const isFocusingOrFocusedSelector : CssSelectorCollection = ':is(.is-focusing, .is-focused)';

/**
 * A CSS selector targeting elements that are either blurring or fully blurred.
 */
export const isBlurringOrBlurredSelector : CssSelectorCollection = ':is(.is-blurring, .is-blurred)';



/**
 * Applies the given `styles` to elements in the fully focused state.
 * 
 * Excludes elements currently in the focusing transition.
 * 
 * @param styles The styles applied to elements in the fully focused state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully focused state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifFocused({
 *         outline: '2px solid blue',
 *     }),
 * });
 * ```
 */
export const ifFocused           = (styles: CssStyleCollection): CssRule => rule(isFocusedSelector           , styles);

/**
 * Applies the given `styles` to elements in the fully blurred state.
 * 
 * Excludes elements currently in the blurring transition.
 * 
 * @param styles The styles applied to elements in the fully blurred state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully blurred state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifBlurred({
 *         outline: 'none',
 *     }),
 * });
 * ```
 */
export const ifBlurred           = (styles: CssStyleCollection): CssRule => rule(isBlurredSelector           , styles);

/**
 * Applies the given `styles` to elements currently in the focusing transition.
 * 
 * Excludes elements that have already reached the focused state.
 * 
 * @param styles The styles applied to elements currently in the focusing transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the focusing transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifFocusing({
 *         outline: '2px solid blue',
 *     }),
 * });
 * ```
 */
export const ifFocusing          = (styles: CssStyleCollection): CssRule => rule(isFocusingSelector          , styles);

/**
 * Applies the given `styles` to elements currently in the blurring transition.
 * 
 * Excludes elements that have already reached the blurred state.
 * 
 * @param styles The styles applied to elements currently in the blurring transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the blurring transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifBlurring({
 *         outline: 'none',
 *     }),
 * });
 * ```
 */
export const ifBlurring          = (styles: CssStyleCollection): CssRule => rule(isBlurringSelector          , styles);

/**
 * Applies the given `styles` to elements that are either focusing or fully focused.
 * 
 * @param styles The styles applied to elements that are either focusing or fully focused.
 * @returns A `CssRule` that applies the given `styles` for elements that are either focusing or fully focused.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifFocusingOrFocused({
 *         outline: '2px solid blue',
 *     }),
 * });
 * ```
 */
export const ifFocusingOrFocused = (styles: CssStyleCollection): CssRule => rule(isFocusingOrFocusedSelector , styles);

/**
 * Applies the given `styles` to elements that are either blurring or fully blurred.
 * 
 * @param styles The styles applied to elements that are either blurring or fully blurred.
 * @returns A `CssRule` that applies the given `styles` for elements that are either blurring or fully blurred.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifBlurringOrBlurred({
 *         outline: 'none',
 *     }),
 * });
 * ```
 */
export const ifBlurringOrBlurred = (styles: CssStyleCollection): CssRule => rule(isBlurringOrBlurredSelector , styles);



/**
 * A strongly typed global mapping of focus/blur-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [focusStateVars] = cssVars<FocusStateVars>({ prefix: 'fo', minify: false });

// Register the focus/blur-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(focusStateVars.animationFocusing);
animationRegistry.registerAnimation(focusStateVars.animationBlurring);

/**
 * Generates CSS rules that conditionally apply the focus/blur animations based on current focused state,
 * and exposes focus/blur-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing focus/blur animations.
 * @returns A CSS API for conditionally apply the focus/blur animations based on current focused state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Focused/blurred state:
 * import { usesFocusState } from '@reusable-ui/focus-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, fallback } from '@cssfn/core';
 * 
 * export const focusableBoxStyle = () => {
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     const {
 *         focusStateRule,
 *         focusStateVars: { isFocused, isBlurred },
 *     } = usesFocusState({
 *         animationFocusing : 'var(--box-focusing)',
 *         animationBlurring : 'var(--box-blurring)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply focused/blurred state rules:
 *         ...focusStateRule(),
 *         
 *         // Define focusing animation:
 *         ...vars({
 *             '--box-focusing': [
 *                 ['0.3s', 'ease-out', 'both', 'outline-focusing'],
 *             ],
 *         }),
 *         ...keyframes('outline-focusing', {
 *             from: {
 *                 outline: 'none',
 *             },
 *             to: {
 *                 outline: '2px solid blue',
 *             },
 *         }),
 *         
 *         // Define blurring animation:
 *         ...vars({
 *             '--box-blurring': [
 *                 ['0.3s', 'ease-out', 'both', 'outline-blurring'],
 *             ],
 *         }),
 *         ...keyframes('outline-blurring', {
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
 *             '--outline-focused' : `${isFocused} 2px solid blue`,
 *         }),
 *         ...fallback({
 *             '--outline-blurred' : `${isBlurred} none`,
 *         }),
 *         outline: 'var(--outline-focused, var(--outline-blurred))',
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesFocusState = (options?: CssFocusStateOptions): CssFocusState => {
    // Extract options and assign defaults:
    const {
        animationFocusing = 'none', // Defaults to `none`.
        animationBlurring = 'none', // Defaults to `none`.
    } = options ?? {};
    
    
    
    return {
        focusStateRule : () => style({
            ...states({
                // Apply focusing animation during the focusing phase:
                ...ifFocusing(
                    vars({
                        [focusStateVars.animationFocusing] : animationFocusing, // Activate the animation (if provided).
                    })
                ),
                
                // Apply blurring animation during the blurring phase:
                ...ifBlurring(
                    vars({
                        [focusStateVars.animationBlurring] : animationBlurring, // Activate the animation (if provided).
                    })
                ),
                
                
                
                // Mark as focused during both focusing and fully focused states:
                ...ifFocusingOrFocused(
                    vars({
                        [focusStateVars.isFocused] : '',      // Valid    when either focusing or fully focused.
                        [focusStateVars.isBlurred] : 'unset', // Poisoned when either focusing or fully focused.
                    })
                ),
                
                // Mark as blurred during both blurring and fully blurred states:
                ...ifBlurringOrBlurred(
                    vars({
                        [focusStateVars.isFocused] : 'unset', // Poisoned when either blurring or fully blurred.
                        [focusStateVars.isBlurred] : '',      // Valid    when either blurring or fully blurred.
                    })
                ),
            }),
        }),
        
        focusStateVars,
    } satisfies CssFocusState;
};
