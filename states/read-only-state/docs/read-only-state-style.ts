// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Editable/read-only state:
import { usesReadOnlyState } from '@reusable-ui/read-only-state';

// CSS-in-JS:
import { atRule, style, vars, keyframes } from '@cssfn/core';

/**
 * Vanilla implementation of a read-only-able box style.
 * 
 * - Demonstrates how read-only-state drives a custom property (`--readOnlyFactor`).
 * - `--readOnlyFactor` animates between 0 (editable) and 1 (read-only).
 * - Always available: defaults to 0 when editable, animates to 1 when read-only.
 * - Can be applied to opacity, color, transform, etc.
 * 
 * This is a behind-the-scenes prototype, showing the mechanics
 * before exposing a polished `readOnlyFactor` variable in read-only-state.
 */
export const readOnlyBoxStyle = () => {
    // Feature: animation handling
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    // Feature: editable/read-only lifecycle
    const {
        readOnlyStateRule,
        readOnlyStateVars: { isReadOnly },
    } = usesReadOnlyState({
        animationThawing  : 'var(--box-thawing)',
        animationFreezing : 'var(--box-freezing)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply editable/read-only state rules:
        ...readOnlyStateRule(),
        
        
        
        /**
         * Define animatable variable:
         * - `--readOnlyFactor` is a typed custom property.
         * - Normalized number: 0 → editable, 1 → read-only.
         * - Thanks to `initial-value: 0`, the property is always `0` when not defined (`unset`).
         */
        ...atRule('@property --readOnlyFactor', {
            // @ts-ignore
            syntax       : '"<number>"',
            inherits     : true,
            initialValue : 0,
        }),
        
        
        
        //#region Transitioning animations
        // Thawing animation: 1 → 0 (read-only → editable)
        ...vars({
            '--box-thawing': [
                ['0.3s', 'ease-out', 'both', 'transition-thawing'],
            ],
        }),
        ...keyframes('transition-thawing', {
            from: {
                '--readOnlyFactor' : 1,
            },
            to: {
                '--readOnlyFactor' : 0,
            },
        }),
        
        // Freezing animation: 0 → 1 (editable → read-only)
        ...vars({
            '--box-freezing': [
                ['0.3s', 'ease-out', 'both', 'transition-freezing'],
            ],
        }),
        ...keyframes('transition-freezing', {
            from: {
                '--readOnlyFactor' : 0,
            },
            to: {
                '--readOnlyFactor' : 1,
            },
        }),
        //#endregion Transitioning animations
        
        
        
        //#region Settled read-only state
        /**
         * When fully read-only:
         * - Force `--readOnlyFactor` to 1.
         * When editable:
         * - No explicit fallback needed; @property ensures it resolves to 0.
         * 
         * This variable is agnostic to animation style:
         * - Can drive opacity, color, transform, etc.
         * 
         * Why `--readOnlyFactor` instead of `--editableFactor`?
         * - Factors consistently represent the *active* lifecycle state.
         * - Editable is the baseline (default), while read-only is the exceptional,
         *   active state contributors need to reason about.
         * - This keeps the pattern consistent with other states:
         *   `--expandFactor`, `--focusFactor`, `--hoverFactor`, `--pressFactor`, `--disableFactor`.
         * - Contributors can always assume: 0 → baseline/inactive, 1 → active state.
         */
        '--readOnlyFactor': [[
            // Only applies if in read-only state:
            isReadOnly,
            
            // The fully read-only value:
            1,
        ]],
        //#endregion Settled read-only state
        
        
        
        /**
         * Example usage:
         * - Opacity interpolates with `--readOnlyFactor`.
         * - 0 → fully visible (editable), 1 → dimmed (read-only).
         */
        opacity: 'calc(1 - (var(--readOnlyFactor) * 0.5))',
        
        
        
        // Apply composed animations:
        animation,
    });
};
