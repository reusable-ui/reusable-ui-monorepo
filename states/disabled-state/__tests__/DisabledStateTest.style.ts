import { keyframes, style, vars, fallback } from '@cssfn/core'
import { usesDisabledState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function disabledStateTestStyle() {
    const {
        disabledStateRule,
        disabledStateVars: { isEnabled, isDisabled },
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
        
        ...vars({
            '--test-enabling': [
                ['1s', 'ease-out', 'both', 'boo-test-enabling'],
            ],
        }),
        ...keyframes('boo-test-enabling', {
            from: {
                opacity: 0.5,
            },
            to: {
                opacity: 1,
            },
        }),
        
        ...vars({
            '--test-disabling': [
                ['1s', 'ease-out', 'both', 'boo-test-disabling'],
            ],
        }),
        ...keyframes('boo-test-disabling', {
            from: {
                opacity: 1,
            },
            to: {
                opacity: 0.5,
            },
        }),
        
        // Define final opacity based on lifecycle state:
        ...fallback({
            '--opacity-enabled'  : `${isEnabled} 1`,
        }),
        ...fallback({
            '--opacity-disabled' : `${isDisabled} 0.5`,
        }),
        opacity: 'var(--opacity-enabled, var(--opacity-disabled))',
        
        // Apply composite animations:
        animation,
    });
}
