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

// Register the expand/collapse-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(collapseStateVars.animationExpanding);
animationRegistry.registerAnimation(collapseStateVars.animationCollapsing);

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
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     // Feature: expand/collapse lifecycle
 *     const {
 *         collapseStateRule,
 *         collapseStateVars: { isExpanded, isCollapsed, expandFactor },
 *     } = usesCollapseState({
 *         animationExpanding  : 'var(--box-expanding)',
 *         animationCollapsing : 'var(--box-collapsing)',
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
 *         // Expanding animation: interpolate expandFactor from 0 → 1
 *         ...vars({
 *             '--box-expanding': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-expanding'],
 *             ],
 *         }),
 *         ...keyframes('transition-expanding', {
 *             from : { [expandFactor]: 0 },
 *             to   : { [expandFactor]: 1 },
 *         }),
 *         
 *         // Collapsing animation: interpolate expandFactor from 1 → 0
 *         ...vars({
 *             '--box-collapsing': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-collapsing'],
 *             ],
 *         }),
 *         ...keyframes('transition-collapsing', {
 *             from : { [expandFactor]: 1 },
 *             to   : { [expandFactor]: 0 },
 *         }),
 *         
 *         // Example usage:
 *         // - Height interpolates with `expandFactor`.
 *         // - 0 → hidden, 1 → full height.
 *         height: `calc-size(auto, size * ${expandFactor})`,
 *         boxSizing: 'border-box', // Include paddings and borders in the height calculation.
 *         overflow: 'hidden', // Crop overflowing content.
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
        animationExpanding  = 'none', // Defaults to `none`.
        animationCollapsing = 'none', // Defaults to `none`.
    } = options ?? {};
    
    
    
    return {
        collapseStateRule : () => style({
            ...states({
                // Apply expanding animation during the expanding phase:
                ...ifExpanding(
                    vars({
                        [collapseStateVars.animationExpanding ] : animationExpanding,  // Activate the animation (if provided).
                    })
                ),
                
                // Apply collapsing animation during the collapsing phase:
                ...ifCollapsing(
                    vars({
                        [collapseStateVars.animationCollapsing] : animationCollapsing, // Activate the animation (if provided).
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
            
            
            
            // Register `expandFactor` as an animatable custom property:
            // - Initial value is `0`, ensuring it resolves to `0` when not explicitly defined (`unset`).
            ...atRule(`@property ${collapseStateVars.expandFactor.slice(4, -1)}`, { // fix: var(--customProp) => --customProp
                // @ts-ignore
                syntax       : '"<number>"',
                inherits     : true,
                initialValue : 0,
            }),
            
            ...vars({
                // Assign the settled value for `expandFactor`:
                // - Sticks to `1` when the component is fully expanded.
                [collapseStateVars.expandFactor]: [[
                    // Only applies if in expanded state:
                    collapseStateVars.isExpanded,
                    
                    // The fully expanded value:
                    1,
                ]],
            }),
        }),
        
        collapseStateVars,
    } satisfies CssCollapseState;
};
