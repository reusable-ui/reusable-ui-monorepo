import { keyframes, style, vars, fallback } from '@cssfn/core'
import { usesValidityState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function validityStateTestStyle() {
    const {
        validityStateRule,
        validityStateVars: { isValid, isInvalid, isUnvalidated },
    } = usesValidityState({
        animationValidate   : 'var(--test-validate)',
        animationInvalidate : 'var(--test-invalidate)',
        animationUnvalidate : 'var(--test-unvalidate)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...validityStateRule(),
        ...animationFeatureRule(),
        
        ...vars({
            '--test-validate': [
                ['1s', 'ease-out', 'both', 'boo-test-validate'],
            ],
        }),
        ...keyframes('boo-test-validate', {
            from : {
                backgroundColor: '#ffffff',
            },
            to   : {
                backgroundColor: '#00ff00',
            },
        }),
        
        ...vars({
            '--test-invalidate': [
                ['1s', 'ease-out', 'both', 'boo-test-invalidate'],
            ],
        }),
        ...keyframes('boo-test-invalidate', {
            from : {
                backgroundColor: '#ffffff',
            },
            to   : {
                backgroundColor: '#ff0000',
            },
        }),
        
        ...vars({
            '--test-unvalidate': [
                ['1s', 'ease-out', 'both', 'boo-test-unvalidate'],
            ],
        }),
        ...keyframes('boo-test-unvalidate', {
            from : {
                backgroundColor: '#ffffff',
            },
            to   : {
                backgroundColor: '#0000ff',
            },
        }),
        
        // Define final color based on lifecycle state:
        ...fallback({
            '--backg-color-validate'   : `${isValid} #00ff00`,
        }),
        ...fallback({
            '--backg-color-invalidate' : `${isInvalid} #ff0000`,
        }),
        ...fallback({
            '--backg-color-unvalidate' : `${isUnvalidated} #0000ff`,
        }),
        backgroundColor: 'var(--backg-color-validate, var(--backg-color-invalidate, var(--backg-color-unvalidate)))',
        
        // Apply composite animations:
        animation,
    });
}
