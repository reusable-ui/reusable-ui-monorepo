// Types:
import {
    type CssActiveStateOptions,
    type CssActiveState,
}                           from './types.js'

// CSS Variables:
import {
    activeStateVars,
}                           from './css-variables.js'

// CSS Selectors:
import {
    ifActive,
    ifInactive,
    ifActivating,
    ifDeactivating,
    ifActivatingOrActive,
    ifDeactivatingOrInactive,
}                           from './css-selectors.js'

// Reusable-ui states:
import {
    // Hooks:
    usesInteractionState,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



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
export const usesActiveState = (options?: CssActiveStateOptions): CssActiveState => ({
    activeStateRule : () => usesInteractionState({
        // Feedback animations for visual effects whenever an active state changes:
        animations      : [
            {
                ifState   : ifActivating,
                variable  : activeStateVars.animationActivating,
                animation : options?.animationActivating,
            },
            {
                ifState   : ifDeactivating,
                variable  : activeStateVars.animationDeactivating,
                animation : options?.animationDeactivating,
            },
        ],
        
        // Flags for discrete switches in conditional styling:
        flags           : [
            // Current flags:
            {
                ifState  : ifActivatingOrActive,
                variable : activeStateVars.isActive,
            },
            {
                ifState  : ifDeactivatingOrInactive,
                variable : activeStateVars.isInactive,
            },
        ],
        
        // Factor variables for gradual drivers in transitional styling:
        factorVar       : activeStateVars.activeFactor,
        factorCondVar   : activeStateVars.activeFactorCond,
        ifInactiveState : ifInactive,
        activeFactors   : [
            {
                ifState : ifActive,
                factor  : 1,
            },
        ],
    }),
    
    activeStateVars,
}) satisfies CssActiveState;
