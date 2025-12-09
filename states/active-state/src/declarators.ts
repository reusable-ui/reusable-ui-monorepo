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
    type ActiveStateVars,
    type CssActiveStateOptions,
    type CssActiveState,
}                           from './types.js'

// Reusable-ui features:
import {
    animationRegistry,
}                           from '@reusable-ui/animation-feature'   // A styling utility for composing a unified animation stack from custom and registered state packages.



/**
 * A CSS selector targeting elements in the fully active state.
 * 
 * Excludes elements currently in the activating transition.
 */
export const isActiveSelector                 : CssSelectorCollection = '.is-active';

/**
 * A CSS selector targeting elements in the fully inactive state.
 * 
 * Excludes elements currently in the deactivating transition.
 */
export const isInactiveSelector               : CssSelectorCollection = '.is-inactive';

/**
 * A CSS selector targeting elements currently in the activating transition.
 * 
 * Excludes elements that have already reached the active state.
 */
export const isActivatingSelector             : CssSelectorCollection = '.is-activating';

/**
 * A CSS selector targeting elements currently in the deactivating transition.
 * 
 * Excludes elements that have already reached the inactive state.
 */
export const isDeactivatingSelector           : CssSelectorCollection = '.is-deactivating';

/**
 * A CSS selector targeting elements that are either activating or fully active.
 */
export const isActivatingOrActiveSelector     : CssSelectorCollection = ':is(.is-activating, .is-active)';

/**
 * A CSS selector targeting elements that are either deactivating or fully inactive.
 */
export const isDeactivatingOrInactiveSelector : CssSelectorCollection = ':is(.is-deactivating, .is-inactive)';



/**
 * Applies the given `styles` to elements in the fully active state.
 * 
 * Excludes elements currently in the activating transition.
 * 
 * @param styles The styles applied to elements in the fully active state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully active state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifActive({
 *         fontWeight: 'bold',
 *     }),
 * });
 * ```
 */
export const ifActive                 = (styles: CssStyleCollection): CssRule => rule(isActiveSelector                 , styles);

/**
 * Applies the given `styles` to elements in the fully inactive state.
 * 
 * Excludes elements currently in the deactivating transition.
 * 
 * @param styles The styles applied to elements in the fully inactive state.
 * @returns A `CssRule` that applies the given `styles` for elements in the fully inactive state.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifInactive({
 *         fontWeight: 'normal',
 *     }),
 * });
 * ```
 */
export const ifInactive               = (styles: CssStyleCollection): CssRule => rule(isInactiveSelector               , styles);

/**
 * Applies the given `styles` to elements currently in the activating transition.
 * 
 * Excludes elements that have already reached the active state.
 * 
 * @param styles The styles applied to elements currently in the activating transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the activating transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifActivating({
 *         fontWeight: 'bold',
 *     }),
 * });
 * ```
 */
export const ifActivating             = (styles: CssStyleCollection): CssRule => rule(isActivatingSelector             , styles);

/**
 * Applies the given `styles` to elements currently in the deactivating transition.
 * 
 * Excludes elements that have already reached the inactive state.
 * 
 * @param styles The styles applied to elements currently in the deactivating transition.
 * @returns A `CssRule` that applies the given `styles` for elements currently in the deactivating transition.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDeactivating({
 *         fontWeight: 'normal',
 *     }),
 * });
 * ```
 */
export const ifDeactivating           = (styles: CssStyleCollection): CssRule => rule(isDeactivatingSelector           , styles);

/**
 * Applies the given `styles` to elements that are either activating or fully active.
 * 
 * @param styles The styles applied to elements that are either activating or fully active.
 * @returns A `CssRule` that applies the given `styles` for elements that are either activating or fully active.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifActivatingOrActive({
 *         fontWeight: 'bold',
 *     }),
 * });
 * ```
 */
export const ifActivatingOrActive     = (styles: CssStyleCollection): CssRule => rule(isActivatingOrActiveSelector     , styles);

/**
 * Applies the given `styles` to elements that are either deactivating or fully inactive.
 * 
 * @param styles The styles applied to elements that are either deactivating or fully inactive.
 * @returns A `CssRule` that applies the given `styles` for elements that are either deactivating or fully inactive.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifDeactivatingOrInactive({
 *         fontWeight: 'normal',
 *     }),
 * });
 * ```
 */
export const ifDeactivatingOrInactive = (styles: CssStyleCollection): CssRule => rule(isDeactivatingOrInactiveSelector , styles);



/**
 * A strongly typed global mapping of activate/deactivate-related CSS variables for conditional animation.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [activeStateVars] = cssVars<ActiveStateVars>({ prefix: 'ac', minify: false });

// Register the activate/deactivate-related animations globally for composing a unified animation stack across state packages:
animationRegistry.registerAnimation(activeStateVars.animationActivating);
animationRegistry.registerAnimation(activeStateVars.animationDeactivating);

/**
 * Generates CSS rules that conditionally apply the activate/deactivate animations based on current active state,
 * and exposes activate/deactivate-related CSS variables for conditional animation.
 * 
 * @param options - An optional configuration for customizing activate/deactivate animations.
 * @returns A CSS API for conditionally apply the activate/deactivate animations based on current active state.
 *
 * @example
 * ```ts
 * // Animation feature:
 * import { usesAnimationFeature } from '@reusable-ui/animation-feature';
 * 
 * // Active/inactive state:
 * import { usesActiveState } from '@reusable-ui/active-state';
 * 
 * // Background colors:
 * import { usesBackgroundFeature } from '@reusable-ui/background-feature';
 * 
 * // Outlined variant:
 * import { usesOutlineVariant } from '@reusable-ui/outline-variant';
 * 
 * // Mild variant:
 * import { usesMildVariant } from '@reusable-ui/mild-variant';
 * 
 * // CSS-in-JS:
 * import { style, vars, keyframes, switchOf } from '@cssfn/core';
 * 
 * export const activatableBoxStyle = () => {
 *     // Feature: animation handling
 *     const {
 *         animationFeatureRule,
 *         animationFeatureVars: { animation },
 *     } = usesAnimationFeature();
 *     
 *     // Feature: active/inactive lifecycle
 *     const {
 *         activeStateRule,
 *         activeStateVars: { isActive, isInactive, activeFactor },
 *     } = usesActiveState({
 *         animationActivating   : 'var(--box-activating)',
 *         animationDeactivating : 'var(--box-deactivating)',
 *     });
 *     
 *     // Feature: background colors
 *     const {
 *         backgroundFeatureVars : { backgRegularCond, backgColor },
 *     } = usesBackgroundFeature();
 *     
 *     // Feature: outlined variant
 *     const {
 *         outlineVariantVars : { isOutlined, notOutlined },
 *     } = usesOutlineVariant();
 *     
 *     // Feature: mild variant
 *     const {
 *         mildVariantVars    : { isMild, notMild },
 *     } = usesMildVariant();
 *     
 *     return style({
 *         display: 'flex',
 *         // Define component styling here.
 *         
 *         // Apply animation feature rules:
 *         ...animationFeatureRule(),
 *         
 *         // Apply active/inactive state rules:
 *         ...activeStateRule(),
 *         
 *         // Activating animation: interpolate activeFactor from 0 → 1
 *         ...vars({
 *             '--box-activating': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-activating'],
 *             ],
 *         }),
 *         ...keyframes('transition-activating', {
 *             from : { [activeFactor]: 0 },
 *             to   : { [activeFactor]: 1 },
 *         }),
 *         
 *         // Deactivating animation: interpolate activeFactor from 1 → 0
 *         ...vars({
 *             '--box-deactivating': [
 *                 ['0.3s', 'ease-out', 'both', 'transition-deactivating'],
 *             ],
 *         }),
 *         ...keyframes('transition-deactivating', {
 *             from : { [activeFactor]: 1 },
 *             to   : { [activeFactor]: 0 },
 *         }),
 *         
 *         // Example usage:
 *         // - Background color interpolates with `activeFactor`.
 *         // - 0 → base (variant-aware) color, 1 → active (regular) color.
 *         // - only applies if outlined or mild (not regular).
 *         backgroundColor: [[
 *             // Only applies if outlined or mild (not regular):
 *             switchOf(
 *                 isOutlined,
 *                 // or
 *                 isMild,
 *             ),
 *             
 * `color-mix(in oklch,
 *     ${backgColor}
 *     calc((1 - ${activeFactor}) * 100%),
 *     
 *     ${switchOf(backgRegularCond, backgColor)}
 *     calc(${activeFactor} * 100%)
 * )`,
 *         ]],
 *         
 *         // Example usage:
 *         // - filter (brightness, contrast, saturate) interpolates with `activeFactor`.
 *         // - 0 → noop filter, 1 → active filter.
 *         // - only applies if neither outlined nor mild (regular only).
 *         //
 *         // Example for active brightness value of 0.65:
 *         // brightness(calc(1 - ((1 - 0.65) * factor)))
 *         // → factor=0 → 1 (no change)
 *         // → factor=1 → 0.65 (dimmed)
 *         // → smooth linear interpolation in between
 *         '--_activeBrightness' : 0.65,
 *         '--_activeContrast'   : 1.5,
 *         '--_activeSaturate'   : 1,
 *         filter: [[
 *             // Only applies if neither outlined nor mild (regular only):
 *             notOutlined,
 *             // and
 *             notMild,
 *             
 *             `brightness(calc(1 - ((1 - var(--_activeBrightness)) * ${activeFactor})))`,
 *             `contrast(calc(1 - ((1 - var(--_activeContrast)) * ${activeFactor})))`,
 *             `saturate(calc(1 - ((1 - var(--_activeSaturate)) * ${activeFactor})))`,
 *         ]],
 *         
 *         // Apply composed animations:
 *         animation,
 *     });
 * };
 * ```
 */
export const usesActiveState = (options?: CssActiveStateOptions): CssActiveState => {
    // Extract options and assign defaults:
    const {
        animationActivating   = 'none', // Defaults to `none`.
        animationDeactivating = 'none', // Defaults to `none`.
    } = options ?? {};
    
    
    
    return {
        activeStateRule : () => style({
            // Register `activeFactor` as an animatable custom property:
            // - Initial value is `0`, ensuring it resolves to `0` when not explicitly defined (`unset`).
            ...atRule(`@property ${activeStateVars.activeFactor.slice(4, -1)}`, { // fix: var(--customProp) => --customProp
                // @ts-ignore
                syntax       : '"<number>"',
                inherits     : true,
                initialValue : 0,
            }),
            
            // Mirror `activeFactor` into `activeFactorCond` by default:
            // - During transitions and when fully active, `activeFactorCond` follows `activeFactor`.
            ...vars({
                [activeStateVars.activeFactorCond]: activeStateVars.activeFactor,
            }),
            
            
            
            ...states({
                // Apply activating animation during the activating phase:
                ...ifActivating(
                    vars({
                        [activeStateVars.animationActivating  ] : animationActivating,   // Activate the animation (if provided).
                    })
                ),
                
                // Apply deactivating animation during the deactivating phase:
                ...ifDeactivating(
                    vars({
                        [activeStateVars.animationDeactivating] : animationDeactivating, // Activate the animation (if provided).
                    })
                ),
                
                
                
                // Mark as active during both activating and fully active states:
                ...ifActivatingOrActive(
                    vars({
                        [activeStateVars.isActive  ] : '',      // Valid    when either activating or fully active.
                        [activeStateVars.isInactive] : 'unset', // Poisoned when either activating or fully active.
                    })
                ),
                
                // Mark as inactive during both deactivating and fully inactive states:
                ...ifDeactivatingOrInactive(
                    vars({
                        [activeStateVars.isActive  ] : 'unset', // Poisoned when either deactivating or fully inactive.
                        [activeStateVars.isInactive] : '',      // Valid    when either deactivating or fully inactive.
                    })
                ),
                
                
                
                // Assign the settled value for `activeFactor`:
                // - Sticks to `1` when the component is fully active.
                ...ifActive(
                    vars({
                        [activeStateVars.activeFactor]: 1,
                    })
                ),
                
                // Drop `activeFactorCond` when fully inactive (baseline inactive):
                // - Explicitly set to `unset` so dependent declarations fall back cleanly.
                ...ifInactive(
                    vars({
                        [activeStateVars.activeFactorCond]: 'unset',
                    })
                ),
            }),
        }),
        
        activeStateVars,
    } satisfies CssActiveState;
};
