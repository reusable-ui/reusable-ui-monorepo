// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Pressed/released state:
import { usesPressState } from '@reusable-ui/press-state';

// CSS-in-JS:
import { atRule, style, vars, keyframes } from '@cssfn/core';

/**
 * Vanilla implementation of a pressable box style.
 * 
 * - Demonstrates how press-state drives a custom property (`--pressFactor`).
 * - `--pressFactor` animates between 0 (released) and 1 (pressed).
 * - Always available: defaults to 0 when released, animates to 1 when pressed.
 * - Can be applied to background, transform, shadow, etc.
 * 
 * This is a behind-the-scenes prototype, showing the mechanics
 * before exposing a polished `pressFactor` variable in press-state.
 */
export const pressableBoxStyle = () => {
    // Feature: animation handling
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    // Feature: press/release lifecycle
    const {
        pressStateRule,
        pressStateVars: { isPressed },
    } = usesPressState({
        animationPressing  : 'var(--box-pressing)',
        animationReleasing : 'var(--box-releasing)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply pressed/released state rules:
        ...pressStateRule(),
        
        
        
        /**
         * Define animatable variable:
         * - `--pressFactor` is a typed custom property.
         * - Normalized number: 0 → released, 1 → pressed.
         * - Thanks to `initial-value: 0`, the property is always `0` when not defined (`unset`).
         */
        ...atRule('@property --pressFactor', {
            // @ts-ignore
            syntax       : '"<number>"',
            inherits     : true,
            initialValue : 0,
        }),
        
        
        
        //#region Transitioning animations
        // Pressing animation: 0 → 1
        ...vars({
            '--box-pressing': [
                ['0.3s', 'ease-out', 'both', 'transition-pressing'],
            ],
        }),
        ...keyframes('transition-pressing', {
            from: {
                '--pressFactor' : 0,
            },
            to: {
                '--pressFactor' : 1,
            },
        }),
        
        // Releasing animation: 1 → 0
        ...vars({
            '--box-releasing': [
                ['0.3s', 'ease-out', 'both', 'transition-releasing'],
            ],
        }),
        ...keyframes('transition-releasing', {
            from: {
                '--pressFactor' : 1,
            },
            to: {
                '--pressFactor' : 0,
            },
        }),
        //#endregion Transitioning animations
        
        
        
        //#region Settled pressed state
        /**
         * When fully pressed:
         * - Force `--pressFactor` to 1.
         * When released:
         * - No explicit fallback needed; @property ensures it resolves to 0.
         * 
         * This variable is agnostic to animation style:
         * - Can drive background, transform, shadow, etc.
         */
        '--pressFactor': [[
            // Only applies if in pressed state:
            isPressed,
            
            // The fully pressed value:
            1,
        ]],
        //#endregion Settled pressed state
        
        
        
        /**
         * Example usage:
         * - Background color interpolates with `--pressFactor`.
         * - 0 → blue, 1 → darkblue.
         */
        backgroundColor:
`color-mix(in oklch,
    blue
    calc((1 - var(--pressFactor)) * 100%),
    
    darkblue
    calc(var(--pressFactor) * 100%)
)`,
        
        
        
        // Apply composed animations:
        animation,
    });
};
