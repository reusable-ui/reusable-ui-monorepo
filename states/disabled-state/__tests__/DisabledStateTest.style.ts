import { keyframes, style, vars } from '@cssfn/core'
import { usesDisabledState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function disabledStateTestStyle() {
    const {
        disabledStateRule,
        disabledStateVars: { disableFactor },
    } = usesDisabledState({
        animationEnabling  : 'var(--test-enabling)',
        animationDisabling : 'var(--test-disabling)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...disabledStateRule(),
        ...animationFeatureRule(),
        
        // Enabling animation: interpolate disableFactor from 1 → 0
        ...vars({
            '--test-enabling': [
                ['1s', 'ease-out', 'both', 'boo-test-enabling'],
            ],
        }),
        ...keyframes('boo-test-enabling', {
            from : { [disableFactor]: 1 },
            to   : { [disableFactor]: 0 },
        }),
        
        // Disabling animation: interpolate disableFactor from 0 → 1
        ...vars({
            '--test-disabling': [
                ['1s', 'ease-out', 'both', 'boo-test-disabling'],
            ],
        }),
        ...keyframes('boo-test-disabling', {
            from : { [disableFactor]: 0 },
            to   : { [disableFactor]: 1 },
        }),
        
        // Example usage:
        // - Opacity interpolates with `disableFactor`.
        // - 0 → fully visible, 1 → dimmed.
        opacity: `calc(1 - (${disableFactor} * 0.5))`,
        
        // Apply composite animations:
        animation,
    });
}
