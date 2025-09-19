import { keyframes, style, vars, fallback } from '@cssfn/core'
import { usesValidityState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function validityStateTestStyle() {
    const {
        validityStateRule,
        validityStateVars: { isValid, isInvalid, isUnvalidated, wasValid, wasInvalid, wasUnvalidated },
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
                ['1s', 'linear', 'both', 'boo-test-validate'],
            ],
        }),
        ...keyframes('boo-test-validate', {
            from : {
                // Define origin background color based on previous validity state:
                '--was-invalid-backg-color': `${wasInvalid} #ff0000`,
                '--was-unvalidated-backg-color': `${wasUnvalidated} #0000ff`,
                backgroundColor: 'var(--was-invalid-backg-color, var(--was-unvalidated-backg-color))',
            },
            to   : {
                backgroundColor: '#00ff00',
            },
        }),
        
        ...vars({
            '--test-invalidate': [
                ['1s', 'linear', 'both', 'boo-test-invalidate'],
            ],
        }),
        ...keyframes('boo-test-invalidate', {
            from : {
                // Define origin background color based on previous validity state:
                '--was-valid-backg-color': `${wasValid} #00ff00`,
                '--was-unvalidated-backg-color': `${wasUnvalidated} #0000ff`,
                backgroundColor: 'var(--was-valid-backg-color, var(--was-unvalidated-backg-color))',
            },
            to   : {
                backgroundColor: '#ff0000',
            },
        }),
        
        ...vars({
            '--test-unvalidate': [
                ['1s', 'linear', 'both', 'boo-test-unvalidate'],
            ],
        }),
        ...keyframes('boo-test-unvalidate', {
            from : {
                // Define origin background color based on previous validity state:
                '--was-valid-backg-color': `${wasValid} #00ff00`,
                '--was-invalid-backg-color': `${wasInvalid} #ff0000`,
                backgroundColor: 'var(--was-valid-backg-color, var(--was-invalid-backg-color))',
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
