// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Hovered/unhovered state:
import { usesHoverState } from '@reusable-ui/hover-state';

// CSS-in-JS:
import { atRule, style, vars, keyframes } from '@cssfn/core';

/**
 * Vanilla implementation of a hoverable box style.
 * 
 * - Demonstrates how hover-state drives a custom property (`--hoverFactor`).
 * - `--hoverFactor` animates between 0 (unhovered) and 1 (hovered).
 * - Always available: defaults to 0 when unhovered, animates to 1 when hovered.
 * - Can be applied to outline, opacity, transform, glow, etc.
 * 
 * This is a behind-the-scenes prototype, showing the mechanics
 * before exposing a polished `hoverFactor` variable in hover-state.
 */
export const hoverableBoxStyle = () => {
    // Feature: animation handling
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    // Feature: hover/unhover lifecycle
    const {
        hoverStateRule,
        hoverStateVars: { isHovered },
    } = usesHoverState({
        animationHovering   : 'var(--box-hovering)',
        animationUnhovering : 'var(--box-unhovering)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply hovered/unhovered state rules:
        ...hoverStateRule(),
        
        
        
        /**
         * Define animatable variable:
         * - `--hoverFactor` is a typed custom property.
         * - Normalized number: 0 → unhovered, 1 → hovered.
         * - Thanks to `initial-value: 0`, the property is always `0` when not defined (`unset`).
         */
        ...atRule('@property --hoverFactor', {
            // @ts-ignore
            syntax       : '"<number>"',
            inherits     : true,
            initialValue : 0,
        }),
        
        
        
        //#region Transitioning animations
        // Hovering animation: 0 → 1
        ...vars({
            '--box-hovering': [
                ['0.3s', 'ease-out', 'both', 'transition-hovering'],
            ],
        }),
        ...keyframes('transition-hovering', {
            from: {
                '--hoverFactor' : 0,
            },
            to: {
                '--hoverFactor' : 1,
            },
        }),
        
        // Unhovering animation: 1 → 0
        ...vars({
            '--box-unhovering': [
                ['0.3s', 'ease-out', 'both', 'transition-unhovering'],
            ],
        }),
        ...keyframes('transition-unhovering', {
            from: {
                '--hoverFactor' : 1,
            },
            to: {
                '--hoverFactor' : 0,
            },
        }),
        //#endregion Transitioning animations
        
        
        
        //#region Settled hovered state
        /**
         * When fully hovered:
         * - Force `--hoverFactor` to 1.
         * When unhovered:
         * - No explicit fallback needed; @property ensures it resolves to 0.
         * 
         * This variable is agnostic to animation style:
         * - Can drive outline, glow, opacity, transform, etc.
         */
        '--hoverFactor': [[
            // Only applies if in hovered state:
            isHovered,
            
            // The fully hovered value:
            1,
        ]],
        //#endregion Settled hovered state
        
        
        
        /**
         * Example usage:
         * - Outline thickness interpolates with `--hoverFactor`.
         * - 0 → none, 1 → 2px solid blue.
         */
        outline: 'calc(var(--hoverFactor) * 2px) solid blue',
        
        
        
        // Apply composed animations:
        animation,
    });
};
