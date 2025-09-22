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
    type CollapseStateVars,
    type CssCollapseStateOptions,
    type CssCollapseState,
}                           from './types.js'

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



/**
 * A CSS selector targeting elements in the fully expanded state.
 * 
 * Excludes elements currently in the expanding transition.
 */
export const isExpandedSelector              : CssSelectorCollection = '.is-expanded';

/**
 * A CSS selector targeting elements in the fully collapsed state.
 * 
 * Excludes elements currently in the collapsing transition.
 */
export const isCollapsedSelector             : CssSelectorCollection = '.is-collapsed';

/**
 * A CSS selector targeting elements currently in the expanding transition.
 * 
 * Excludes elements that have already reached the expanded state.
 */
export const isExpandingSelector             : CssSelectorCollection = '.is-expanding';

/**
 * A CSS selector targeting elements currently in the collapsing transition.
 * 
 * Excludes elements that have already reached the collapsed state.
 */
export const isCollapsingSelector            : CssSelectorCollection = '.is-collapsing';

/**
 * A CSS selector targeting elements that are either expanding or fully expanded.
 */
export const isExpandingOrExpandedSelector   : CssSelectorCollection = ':is(.is-expanding, .is-expanded)';

/**
 * A CSS selector targeting elements that are either collapsing or fully collapsed.
 */
export const isCollapsingOrCollapsedSelector : CssSelectorCollection = ':is(.is-collapsing, .is-collapsed)';



/**
 * Applies the given `styles` to elements in the fully expanded state.
 * 
 * Excludes elements currently in the expanding transition.
 * 
 * @param styles The styles applied to elements in the fully expanded state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully expanded state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifExpanded({
 *         visibility: 'visible',
 *     }),
 * });
 * ```
 */
export const ifExpanded              = (styles: CssStyleCollection): CssRule => rule(isExpandedSelector              , styles);

/**
 * Applies the given `styles` to elements in the fully collapsed state.
 * 
 * Excludes elements currently in the collapsing transition.
 * 
 * @param styles The styles applied to elements in the fully collapsed state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully collapsed state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifCollapsed({
 *         visibility: 'hidden',
 *     }),
 * });
 * ```
 */
export const ifCollapsed             = (styles: CssStyleCollection): CssRule => rule(isCollapsedSelector             , styles);

/**
 * Applies the given `styles` to elements currently in the expanding transition.
 * 
 * Excludes elements that have already reached the expanded state.
 * 
 * @param styles The styles applied to elements currently in the expanding transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the expanding transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifExpanding({
 *         visibility: 'visible',
 *     }),
 * });
 * ```
 */
export const ifExpanding             = (styles: CssStyleCollection): CssRule => rule(isExpandingSelector             , styles);

/**
 * Applies the given `styles` to elements currently in the collapsing transition.
 * 
 * Excludes elements that have already reached the collapsed state.
 * 
 * @param styles The styles applied to elements currently in the collapsing transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the collapsing transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifCollapsing({
 *         visibility: 'hidden',
 *     }),
 * });
 * ```
 */
export const ifCollapsing            = (styles: CssStyleCollection): CssRule => rule(isCollapsingSelector            , styles);

/**
 * Applies the given `styles` to elements that are either expanding or fully expanded.
 * 
 * @param styles The styles applied to elements that are either expanding or fully expanded.
 * @returns A `CssRule` that applies the given `styles` for elements that are either expanding or fully expanded.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifExpandingOrExpanded({
 *         visibility: 'visible',
 *     }),
 * });
 * ```
 */
export const ifExpandingOrExpanded   = (styles: CssStyleCollection): CssRule => rule(isExpandingOrExpandedSelector   , styles);

/**
 * Applies the given `styles` to elements that are either collapsing or fully collapsed.
 * 
 * @param styles The styles applied to elements that are either collapsing or fully collapsed.
 * @returns A `CssRule` that applies the given `styles` for elements that are either collapsing or fully collapsed.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifCollapsingOrCollapsed({
 *         visibility: 'hidden',
 *     }),
 * });
 * ```
 */
export const ifCollapsingOrCollapsed = (styles: CssStyleCollection): CssRule => rule(isCollapsingOrCollapsedSelector , styles);



/**
 * A strongly typed global mapping of expand/collapse-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [collapseStateVars] = cssVars<CollapseStateVars>({ prefix: 'cp', minify: false });

// Register the expand/collapse animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(collapseStateVars.animationExpand);
animationRegistry.registerAnimation(collapseStateVars.animationCollapse);

/**
 * Generates CSS rules that conditionally apply the expand/collapse animations based on current expanded state,
 * and exposes expand/collapse-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing expand/collapse animations.
 * @returns A CSS API for conditionally apply the expand/collapse animations based on current expanded state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Expanded/collapsed state:
 * import { usesCollapseState } from '@reusable-ui/collapse-state';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, fallback } from '@cssfn/core';
 * 
 * export const collapsibleBoxStyle = () => {
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     const {
 *         collapseStateRule,
 *         collapseStateVars: { isExpanded, isCollapsed },
 *     } = usesCollapseState({
 *         animationExpand   : 'var(--box-expand)',
 *         animationCollapse : 'var(--box-collapse)',
 *     });
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply expanded/collapsed state rules:
 *         ...collapseStateRule(),
 *         
 *         // Define expanding animation:
 *         ...vars({
 *             '--box-expand': [
 *                 ['0.3s', 'ease-out', 'both', 'height-expanding'],
 *             ],
 *         }),
 *         ...keyframes('height-expanding', {
 *             from: {
 *                 blockSize: '0px',
 *             },
 *             to: {
 *                 blockSize: '100px',
 *             },
 *         }),
 *         
 *         // Define collapsing animation:
 *         ...vars({
 *             '--box-collapse': [
 *                 ['0.3s', 'ease-out', 'both', 'height-collapsing'],
 *             ],
 *         }),
 *         ...keyframes('height-collapsing', {
 *             from: {
 *                 blockSize: '100px',
 *             },
 *             to: {
 *                 blockSize: '0px',
 *             },
 *         }),
 *         
 *         // Define final block size based on lifecycle state:
 *         boxSizing: 'border-box',
 *         overflow: 'hidden',
 *         ...fallback({
 *             '--blockSize-expanded' : `${isExpanded} 100px`,
 *         }),
 *         ...fallback({
 *             '--blockSize-collapsed' : `${isCollapsed} 0px`,
 *         }),
 *         blockSize: 'var(--blockSize-expanded, var(--blockSize-collapsed))',
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesCollapseState = (options?: CssCollapseStateOptions): CssCollapseState => {
    // Extract options and assign defaults:
    const {
        animationExpand   = 'none', // Defaults to `none`.
        animationCollapse = 'none', // Defaults to `none`.
    } = options ?? {};
    
    
    
    return {
        collapseStateRule : () => style({
            ...states({
                // Apply expand animation during the expanding phase:
                ...ifExpanding(
                    vars({
                        [collapseStateVars.animationExpand  ] : animationExpand,   // Activate the animation (if provided).
                    })
                ),
                
                // Apply collapse animation during the collapsing phase:
                ...ifCollapsing(
                    vars({
                        [collapseStateVars.animationCollapse] : animationCollapse, // Activate the animation (if provided).
                    })
                ),
                
                
                
                // Mark as expanded during both expanding and fully expanded states:
                ...ifExpandingOrExpanded(
                    vars({
                        [collapseStateVars.isExpanded ] : '',      // Valid    when either expanding or fully expanded.
                        [collapseStateVars.isCollapsed] : 'unset', // Poisoned when either expanding or fully expanded.
                    })
                ),
                
                // Mark as collapsed during both collapsing and fully collapsed states:
                ...ifCollapsingOrCollapsed(
                    vars({
                        [collapseStateVars.isExpanded ] : 'unset', // Poisoned when either collapsing or fully collapsed.
                        [collapseStateVars.isCollapsed] : '',      // Valid    when either collapsing or fully collapsed.
                    })
                ),
            }),
        }),
        
        collapseStateVars,
    } satisfies CssCollapseState;
};
