// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// View-switching state:
import { usesViewState } from '@reusable-ui/view-state';

// CSS-in-JS:
import { atRule, style, vars, keyframes, switchOf } from '@cssfn/core';

/**
 * Vanilla implementation of a slide box style.
 * 
 * - Demonstrates how view-state drives a custom property (`--viewIndexFactor`).
 * - `--viewIndexFactor` animates between `-1` (previous view), `0` (origin view), and `+1` (next view).
 * - Always available: defaults to `0` when settled, animates to `-1`/`+1` when receding/advancing.
 * - Can be applied to margin, opacity, scale, rotation, etc.
 * 
 * This is a behind-the-scenes prototype, showing the mechanics
 * before exposing a polished `viewIndexFactor` variable in view-state.
 */
export const slideBoxStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    const {
        viewStateRule,
        viewStateVars: { viewIndex, prevViewIndex },
    } = usesViewState({
        animationViewAdvancing : 'var(--box-view-advancing)',
        animationViewReceding  : 'var(--box-view-receding)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply view-switching state rules:
        ...viewStateRule(),
        
        // The parent container is 100px wide and overflow is hidden.
        // To show the correct view, we translate this box based on the previous and current viewIndex.
        // We use `margin-inline-start` for logical direction support (RTL/LTR),
        // instead of `translateX` which is physical only.
        
        
        
        /**
         * Animatable factor:
         * - Normalized range: -1 ⇄ 0 ⇄ +1
         * - Advancing: 0 → +1
         * - Receding: 0 → -1
         * - `0` always represents the origin view.
         * - ±1 represents full arrival at the destination view.
         * - Values between 0 and 1 represent mid-animation progress.
         * 
         * This factor is independent of actual indices; it only encodes
         * "how far and in which direction along the journey" we are.
         */
        ...atRule('@property --viewIndexFactor', {
            // @ts-ignore
            syntax       : '"<number>"',
            inherits     : true,
            initialValue : 0, // default progress = 0 (settled, no interpolation)
        }),
        
        
        
        //#region Transitioning animations
        /**
         * View advancing/receding animations:
         * - Animate factor from 0 → ±1.
         * - Advancing: 0 → +1
         * - Receding: 0 → -1
         * - `0` always represents the origin view.
         * - ±1 represents full arrival at the destination view.
         * 
         * This factor is semantic and direction-aware.
         */
        
        // Advancing animation: 0 → 1
        ...vars({
            '--box-view-advancing': [
                ['0.3s', 'ease-out', 'both', 'transition-view-advancing'],
            ],
        }),
        ...keyframes('transition-view-advancing', {
            from: {
                '--viewIndexFactor': 0,
            },
            to: {
                '--viewIndexFactor': 1,
            },
        }),
        
        // Receding animation: 0 → -1
        ...vars({
            '--box-view-receding': [
                ['0.3s', 'ease-out', 'both', 'transition-view-receding'],
            ],
        }),
        ...keyframes('transition-view-receding', {
            from: {
                '--viewIndexFactor': 0,
            },
            to: {
                '--viewIndexFactor': -1,
            },
        }),
        //#endregion Transitioning animations
        
        
        
        /**
         * Shift index factor:
         * - Represents the signed destination index for visual translation.
         * - Advancing : shiftIndexFactor =  viewIndexFactor
         * - Receding  : shiftIndexFactor = -viewIndexFactor - 1
         * 
         * Direction detection is done inline using:
         *   clamp(0, (prevViewIndex - viewIndex) * 999999, 1)
         *   → If prev > view → receding → clamp = 1
         *   → If prev ≤ view → advancing → clamp = 0
         * 
         * The multiplier (999999) ensures fractional diffs (e.g. 0.00001) still trigger receding.
         */
        '--shiftIndexFactor':
`calc(
    var(--viewIndexFactor)
    +
    clamp(0, calc((${switchOf(prevViewIndex, viewIndex)} - ${viewIndex}) * 999999), 1)
    * ((var(--viewIndexFactor) * -2) - 1)
)`,
        
        
        
        /**
         * Translation formula:
         * - margin-inline-start = shiftIndexFactor × diff × -viewWidth
         * - viewWidth = 100px
         * 
         * Examples:
         * - Advancing (2 → 5):
         *   - diff             =  5 - 2 =   +3
         *   - viewIndexFactor  =  0     →   +1
         *   - shiftIndexFactor =  0     →   +1
         *   - margin           =  0px   →   -300px
         *   
         *   Visual preview:
         *     Parent viewport                : <underflow> [ ] <overflow>
         *     Untranslated views (factor: 0) :             [2] [3] [4] [5]   // [2] is visible within parent viewport
         *     Translated views   (factor: 1) : [2] [3] [4] [5]               // Shifted by -300px => [5] is visible
         * 
         * 
         * - Receding (5 → 2):
         *   - diff             =  2 - 5 =   -3
         *   - viewIndexFactor  =  0     →   -1
         *   - shiftIndexFactor = -1     →    0
         *   - margin           = -300px →    0px
         *   
         *   Visual preview:
         *     Parent viewport                : <underflow> [ ] <overflow>
         *     Translated views   (factor: 0) : [2] [3] [4] [5]               // Shifted by -300px => [5] is visible
         *     Untranslated views (factor: 1) :             [2] [3] [4] [5]   // [2] is visible within parent viewport
         */
        marginInlineStart: `calc(var(--shiftIndexFactor) * (${viewIndex} - ${prevViewIndex}) * -100px)`,
        
        contain    : 'layout',              // Contain layout to prevent reflows.
        willChange : 'margin-inline-start', // Hint to browser for better performance.
        
        
        
        // Apply composed animations:
        animation,
    });
};
