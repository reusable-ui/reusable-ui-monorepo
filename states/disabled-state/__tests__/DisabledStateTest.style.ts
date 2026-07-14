import { keyframes, style, vars } from '@cssfn/core'
import { usingDisabledState } from '../dist/index.js'
import { usingAnimationFeature } from '@reusable-ui/animation-feature'

export default function disabledStateTestStyle() {
    const {
        disabledStateRule,
        disabledStateVars: { disabledFactor },
    } = usingDisabledState({
        enablingAnimation  : 'var(--test-enabling)',
        disablingAnimation : 'var(--test-disabling)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usingAnimationFeature();
    
    return style({
        ...disabledStateRule(),
        ...animationFeatureRule(),
        
        // Enabling animation: interpolate disabledFactor from 1 → 0
        ...vars({
            '--test-enabling': [
                ['1s', 'ease-out', 'both', 'boo-test-enabling'],
            ],
        }),
        ...keyframes('boo-test-enabling', {
            from : { [disabledFactor]: 1 },
            to   : { [disabledFactor]: 0 },
        }),
        
        // Disabling animation: interpolate disabledFactor from 0 → 1
        ...vars({
            '--test-disabling': [
                ['1s', 'ease-out', 'both', 'boo-test-disabling'],
            ],
        }),
        ...keyframes('boo-test-disabling', {
            from : { [disabledFactor]: 0 },
            to   : { [disabledFactor]: 1 },
        }),
        
        // Example usage:
        // - Opacity interpolates with `disabledFactor`.
        // - 0 → fully visible, 1 → dimmed.
        opacity: `calc(1 - (${disabledFactor} * 0.5))`,
        
        // Apply composite animations:
        animation,
    });
}
