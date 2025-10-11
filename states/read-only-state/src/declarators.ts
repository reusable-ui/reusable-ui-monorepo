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
    type ReadOnlyStateVars,
    type CssReadOnlyStateOptions,
    type CssReadOnlyState,
}                           from './types.js'

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



/**
 * A CSS selector targeting elements in the fully editable state.
 * 
 * Excludes elements currently in the thawing transition.
 */
export const isEditableSelector           : CssSelectorCollection = '.is-editable';

/**
 * A CSS selector targeting elements in the fully read-only state.
 * 
 * Excludes elements currently in the freezing transition.
 */
export const isReadOnlySelector           : CssSelectorCollection = '.is-readonly';

/**
 * A CSS selector targeting elements currently in the thawing transition.
 * 
 * Excludes elements that have already reached the editable state.
 */
export const isThawingSelector            : CssSelectorCollection = '.is-thawing';

/**
 * A CSS selector targeting elements currently in the freezing transition.
 * 
 * Excludes elements that have already reached the read-only state.
 */
export const isFreezingSelector           : CssSelectorCollection = '.is-freezing';

/**
 * A CSS selector targeting elements that are either thawing or fully editable.
 */
export const isThawingOrEditableSelector  : CssSelectorCollection = ':is(.is-thawing, .is-editable)';

/**
 * A CSS selector targeting elements that are either freezing or fully read-only.
 */
export const isFreezingOrReadOnlySelector : CssSelectorCollection = ':is(.is-freezing, .is-readonly)';



/**
 * Applies the given `styles` to elements in the fully editable state.
 * 
 * Excludes elements currently in the thawing transition.
 * 
 * @param styles - The styles applied to elements in the fully editable state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully editable state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifEditable({
 *         color: 'blue',
 *     }),
 * });
 * ```
 */
export const ifEditable               = (styles: CssStyleCollection): CssRule => rule(isEditableSelector               , styles);

/**
 * Applies the given `styles` to elements in the fully read-only state.
 * 
 * Excludes elements currently in the freezing transition.
 * 
 * @param styles - The styles applied to elements in the fully read-only state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully read-only state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifReadOnly({
 *         color: 'gray',
 *     }),
 * });
 * ```
 */
export const ifReadOnly               = (styles: CssStyleCollection): CssRule => rule(isReadOnlySelector               , styles);

/**
 * Applies the given `styles` to elements currently in the thawing transition.
 * 
 * Excludes elements that have already reached the editable state.
 * 
 * @param styles - The styles applied to elements currently in the thawing transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the thawing transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifThawing({
 *         color: 'darkblue',
 *     }),
 * });
 * ```
 */
export const ifThawing                = (styles: CssStyleCollection): CssRule => rule(isThawingSelector                , styles);

/**
 * Applies the given `styles` to elements currently in the freezing transition.
 * 
 * Excludes elements that have already reached the read-only state.
 * 
 * @param styles - The styles applied to elements currently in the freezing transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the freezing transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifFreezing({
 *         color: 'darkgray',
 *     }),
 * });
 * ```
 */
export const ifFreezing               = (styles: CssStyleCollection): CssRule => rule(isFreezingSelector               , styles);

/**
 * Applies the given `styles` to elements that are either thawing or fully editable.
 * 
 * @param styles - The styles applied to elements that are either thawing or fully editable.
 * @returns A `CssRule` that applies the given `styles` for elements that are either thawing or fully editable.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifThawingOrEditable({
 *         color: 'blue',
 *     }),
 * });
 * ```
 */
export const ifThawingOrEditable      = (styles: CssStyleCollection): CssRule => rule(isThawingOrEditableSelector      , styles);

/**
 * Applies the given `styles` to elements that are either freezing or fully read-only.
 * 
 * @param styles - The styles applied to elements that are either freezing or fully read-only.
 * @returns A `CssRule` that applies the given `styles` for elements that are either freezing or fully read-only.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifFreezingOrReadOnly({
 *         color: 'gray',
 *     }),
 * });
 * ```
 */
export const ifFreezingOrReadOnly     = (styles: CssStyleCollection): CssRule => rule(isFreezingOrReadOnlySelector     , styles);



/**
 * A strongly typed global mapping of editable/read-only-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [readOnlyStateVars] = cssVars<ReadOnlyStateVars>({ prefix: 'ro', minify: false });

// Register the editable/read-only-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(readOnlyStateVars.animationThawing);
animationRegistry.registerAnimation(readOnlyStateVars.animationFreezing);

/**
 * Generates CSS rules that conditionally apply the editable/read-only animations based on current read-only state,
 * and exposes editable/read-only-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing editable/read-only animations.
 * @returns A CSS API for conditionally apply the editable/read-only animations based on current read-only state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Editable/read-only state:
 * import { usesReadOnlyState } from '@reusable-ui/read-only-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, fallback } from '@cssfn/core';
 * 
 * export const readOnlyBoxStyle = () => {
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     const {
 *         readOnlyStateRule,
 *         readOnlyStateVars: { isEditable, isReadOnly },
 *     } = usesReadOnlyState({
 *         animationThawing  : 'var(--box-thawing)',
 *         animationFreezing : 'var(--box-freezing)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply editable/read-only state rules:
 *         ...readOnlyStateRule(),
 *         
 *         // Define thawing animation:
 *         ...vars({
 *             '--box-thawing': [
 *                 ['0.3s', 'ease-out', 'both', 'fade-thawing'],
 *             ],
 *         }),
 *         ...keyframes('fade-thawing', {
 *             from: {
 *                 opacity: 0.5,
 *             },
 *             to: {
 *                 opacity: 1,
 *             },
 *         }),
 *         
 *         // Define freezing animation:
 *         ...vars({
 *             '--box-freezing': [
 *                 ['0.3s', 'ease-out', 'both', 'fade-freezing'],
 *             ],
 *         }),
 *         ...keyframes('fade-freezing', {
 *             from: {
 *                 opacity: 1,
 *             },
 *             to: {
 *                 opacity: 0.5,
 *             },
 *         }),
 *         
 *         // Define final opacity based on lifecycle state:
 *         ...fallback({
 *             '--opacity-editable'  : `${isEditable} 1`,
 *         }),
 *         ...fallback({
 *             '--opacity-readonly' : `${isReadOnly} 0.5`,
 *         }),
 *         opacity: 'var(--opacity-editable, var(--opacity-readonly))',
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesReadOnlyState = (options?: CssReadOnlyStateOptions): CssReadOnlyState => {
    // Extract options and assign defaults:
    const {
        animationThawing  = 'none', // Defaults to `none`.
        animationFreezing = 'none', // Defaults to `none`.
    } = options ?? {};
    
    
    
    return {
        readOnlyStateRule : () => style({
            ...states({
                // Apply thawing animation during the thawing phase:
                ...ifThawing(
                    vars({
                        [readOnlyStateVars.animationThawing ] : animationThawing,  // Activate the animation (if provided).
                    })
                ),
                
                // Apply freezing animation during the freezing phase:
                ...ifFreezing(
                    vars({
                        [readOnlyStateVars.animationFreezing] : animationFreezing, // Activate the animation (if provided).
                    })
                ),
                
                
                
                // Mark as editable during both thawing and fully editable states:
                ...ifThawingOrEditable(
                    vars({
                        [readOnlyStateVars.isEditable] : '',      // Valid    when either thawing or fully editable.
                        [readOnlyStateVars.isReadOnly] : 'unset', // Poisoned when either thawing or fully editable.
                    })
                ),
                
                // Mark as read-only during both freezing and fully read-only states:
                ...ifFreezingOrReadOnly(
                    vars({
                        [readOnlyStateVars.isEditable] : 'unset', // Poisoned when either freezing or fully read-only.
                        [readOnlyStateVars.isReadOnly] : '',      // Valid    when either freezing or fully read-only.
                    })
                ),
            }),
        }),
        
        readOnlyStateVars,
    } satisfies CssReadOnlyState;
};
