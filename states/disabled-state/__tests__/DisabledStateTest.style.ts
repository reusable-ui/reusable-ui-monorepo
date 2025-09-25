import { keyframes, style, vars, fallback } from '@cssfn/core'
import { usesDisabledState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function disabledStateTestStyle() {
    const {
        disabledStateRule,
        disabledStateVars: { isEnabled, isDisabled },
    } = usesDisabledState({
        animationEnable  : 'var(--test-enable)',
        animationDisable : 'var(--test-disable)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...disabledStateRule(),
        ...animationFeatureRule(),
        
        ...vars({
            '--test-enable': [
                ['1s', 'ease-out', 'both', 'boo-test-enable'],
            ],
        }),
        ...keyframes('boo-test-enable', {
            from: {
                opacity: 0.5,
            },
            to: {
                opacity: 1,
            },
        }),
        
        ...vars({
            '--test-disable': [
                ['1s', 'ease-out', 'both', 'boo-test-disable'],
            ],
        }),
        ...keyframes('boo-test-disable', {
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
