import { keyframes, style, vars } from '@cssfn/core'
import { usingReadOnlyState } from '../dist/index.js'
import { usingAnimationFeature } from '@reusable-ui/animation-feature'

export default function readOnlyStateTestStyle() {
    const {
        readOnlyStateRule,
        readOnlyStateVars: { readOnlyFactor },
    } = usingReadOnlyState({
        thawingAnimation  : 'var(--test-thawing)',
        freezingAnimation : 'var(--test-freezing)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usingAnimationFeature();
    
    return style({
        ...readOnlyStateRule(),
        ...animationFeatureRule(),
        
        // Thawing animation: interpolate readOnlyFactor from 1 → 0
        ...vars({
            '--test-thawing': [
                ['1s', 'ease-out', 'both', 'boo-test-thawing'],
            ],
        }),
        ...keyframes('boo-test-thawing', {
            from : { [readOnlyFactor]: 1 },
            to   : { [readOnlyFactor]: 0 },
        }),
        
        // Freezing animation: interpolate readOnlyFactor from 0 → 1
        ...vars({
            '--test-freezing': [
                ['1s', 'ease-out', 'both', 'boo-test-freezing'],
            ],
        }),
        ...keyframes('boo-test-freezing', {
            from : { [readOnlyFactor]: 0 },
            to   : { [readOnlyFactor]: 1 },
        }),
        
        // Example usage:
        // - Opacity interpolates with `readOnlyFactor`.
        // - 0 → fully visible (editable), 1 → dimmed (read-only).
        opacity: `calc(1 - (${readOnlyFactor} * 0.5))`,
        
        // Apply composite animations:
        animation,
    });
}
