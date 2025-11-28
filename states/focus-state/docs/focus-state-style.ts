// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Focused/blurred state:
import { usesFocusState } from '@reusable-ui/focus-state';

// CSS-in-JS:
import { atRule, style, vars, keyframes } from '@cssfn/core';

/**
 * Vanilla implementation of a focusable box style.
 * 
 * - Demonstrates how focus-state drives a custom property (`--focusFactor`).
 * - `--focusFactor` animates between 0 (blurred) and 1 (focused).
 * - Always available: defaults to 0 when blurred, animates to 1 when focused.
 * - Can be applied to outline, opacity, transform, glow, etc.
 * 
 * This is a behind-the-scenes prototype, showing the mechanics
 * before exposing a polished `focusFactor` variable in focus-state.
 */
export const focusableBoxStyle = () => {
    // Feature: animation handling
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    // Feature: focus/blur lifecycle
    const {
        focusStateRule,
        focusStateVars: { isFocused },
    } = usesFocusState({
        animationFocusing : 'var(--box-focusing)',
        animationBlurring : 'var(--box-blurring)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply focused/blurred state rules:
        ...focusStateRule(),
        
        
        
        /**
         * Define animatable variable:
         * - `--focusFactor` is a typed custom property.
         * - Normalized number: 0 → blurred, 1 → focused.
         * - Thanks to `initial-value: 0`, the property is always `0` when not defined (`unset`).
         */
        ...atRule('@property --focusFactor', {
            // @ts-ignore
            syntax       : '"<number>"',
            inherits     : true,
            initialValue : 0,
        }),
        
        
        
        //#region Transitioning animations
        // Focusing animation: 0 → 1
        ...vars({
            '--box-focusing': [
                ['0.3s', 'ease-out', 'both', 'transition-focusing'],
            ],
        }),
        ...keyframes('transition-focusing', {
            from: {
                '--focusFactor' : 0,
            },
            to: {
                '--focusFactor' : 1,
            },
        }),
        
        // Blurring animation: 1 → 0
        ...vars({
            '--box-blurring': [
                ['0.3s', 'ease-out', 'both', 'transition-blurring'],
            ],
        }),
        ...keyframes('transition-blurring', {
            from: {
                '--focusFactor' : 1,
            },
            to: {
                '--focusFactor' : 0,
            },
        }),
        //#endregion Transitioning animations
        
        
        
        //#region Settled focused state
        /**
         * When fully focused:
         * - Force `--focusFactor` to 1.
         * When blurred:
         * - No explicit fallback needed; @property ensures it resolves to 0.
         * 
         * This variable is agnostic to animation style:
         * - Can drive outline, glow, opacity, transform, etc.
         */
        '--focusFactor': [[
            // Only applies if in focused state:
            isFocused,
            
            // The fully focused value:
            1,
        ]],
        //#endregion Settled focused state
        
        
        
        /**
         * Example usage:
         * - Outline thickness interpolates with `--focusFactor`.
         * - 0 → none, 1 → 2px solid blue.
         */
        outline: 'calc(var(--focusFactor) * 2px) solid blue',
        
        
        
        // Apply composed animations:
        animation,
    });
};
