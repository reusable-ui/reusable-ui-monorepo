// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Enabled/disabled state:
import { usesDisabledState } from '@reusable-ui/disabled-state';

// CSS-in-JS:
import { atRule, style, vars, keyframes } from '@cssfn/core';

/**
 * Vanilla implementation of a disableable box style.
 * 
 * - Demonstrates how disabled-state drives a custom property (`--disableFactor`).
 * - `--disableFactor` animates between 0 (enabled) and 1 (disabled).
 * - Always available: defaults to 0 when enabled, animates to 1 when disabled.
 * - Can be applied to opacity, color, transform, etc.
 * 
 * This is a behind-the-scenes prototype, showing the mechanics
 * before exposing a polished `disableFactor` variable in disabled-state.
 */
export const disableableBoxStyle = () => {
    // Feature: animation handling
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    // Feature: enable/disable lifecycle
    const {
        disabledStateRule,
        disabledStateVars: { isDisabled },
    } = usesDisabledState({
        animationEnabling  : 'var(--box-enabling)',
        animationDisabling : 'var(--box-disabling)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply enabled/disabled state rules:
        ...disabledStateRule(),
        
        
        
        /**
         * Define animatable variable:
         * - `--disableFactor` is a typed custom property.
         * - Normalized number: 0 → enabled, 1 → disabled.
         * - Thanks to `initial-value: 0`, the property is always `0` when not defined (`unset`).
         */
        ...atRule('@property --disableFactor', {
            // @ts-ignore
            syntax       : '"<number>"',
            inherits     : true,
            initialValue : 0,
        }),
        
        
        
        //#region Transitioning animations
        // Enabling animation: 1 → 0
        ...vars({
            '--box-enabling': [
                ['0.3s', 'ease-out', 'both', 'transition-enabling'],
            ],
        }),
        ...keyframes('transition-enabling', {
            from: {
                '--disableFactor' : 1,
            },
            to: {
                '--disableFactor' : 0,
            },
        }),
        
        // Disabling animation: 0 → 1
        ...vars({
            '--box-disabling': [
                ['0.3s', 'ease-out', 'both', 'transition-disabling'],
            ],
        }),
        ...keyframes('transition-disabling', {
            from: {
                '--disableFactor' : 0,
            },
            to: {
                '--disableFactor' : 1,
            },
        }),
        //#endregion Transitioning animations
        
        
        
        //#region Settled disabled state
        /**
         * When fully disabled:
         * - Force `--disableFactor` to 1.
         * When enabled:
         * - No explicit fallback needed; @property ensures it resolves to 0.
         * 
         * This variable is agnostic to animation style:
         * - Can drive opacity, color, transform, etc.
         * 
         *  Why `--disableFactor` instead of `--disabledFactor`?
         * - Factors across the ecosystem consistently use the *base form* of the active state:
         *   `--expandFactor`, `--focusFactor`, `--hoverFactor`, `--pressFactor`, etc.
         * - The factor represents a normalized number (0 → baseline/inactive, 1 → active state).
         *   In this lifecycle, enabled is the baseline and disabled is the active state.
         * - Using the base form (`disable`) keeps naming predictable and teachable,
         *   even if the package name is `disabled-state` for idiomatic clarity.
         * 
         * Why `--disableFactor` instead of `--enableFactor`?
         * - Factors always narrate the *active* lifecycle state, not the baseline.
         * - Enabled is the default baseline, so contributors "rarely need" to measure "how enabled" something is.
         * - Disabled is the exceptional, active state that benefits from a normalized factor
         *   (0 → enabled baseline, 1 → fully disabled).
         * - This keeps the pattern consistent: contributors can always assume
         *   factor = 0 → inactive/baseline, factor = 1 → active state.
         */
        '--disableFactor': [[
            // Only applies if in disabled state:
            isDisabled,
            
            // The fully disabled value:
            1,
        ]],
        //#endregion Settled disabled state
        
        
        
        /**
         * Example usage:
         * - Opacity interpolates with `--disableFactor`.
         * - 0 → fully visible, 1 → dimmed.
         */
        opacity: 'calc(1 - (var(--disableFactor) * 0.5))',
        
        
        
        // Apply composed animations:
        animation,
    });
};
