import { keyframes, style, vars, fallback } from '@cssfn/core'
import { usesValidityState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function validityStateTestStyle() {
    const {
        validityStateRule,
        validityStateVars: { isValid, isInvalid, isUnvalidated, wasValid, wasInvalid, wasUnvalidated },
    } = usesValidityState({
        animationValidating   : 'var(--test-validating)',
        animationInvalidating : 'var(--test-invalidating)',
        animationUnvalidating : 'var(--test-unvalidating)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...validityStateRule(),
        ...animationFeatureRule(),
        
        ...vars({
            '--test-validating': [
                ['1s', 'linear', 'both', 'boo-test-validating'],
            ],
        }),
        ...keyframes('boo-test-validating', {
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
            '--test-invalidating': [
                ['1s', 'linear', 'both', 'boo-test-invalidating'],
            ],
        }),
        ...keyframes('boo-test-invalidating', {
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
            '--test-unvalidating': [
                ['1s', 'linear', 'both', 'boo-test-unvalidating'],
            ],
        }),
        ...keyframes('boo-test-unvalidating', {
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
            '--backg-color-valid'   : `${isValid} #00ff00`,
        }),
        ...fallback({
            '--backg-color-invalid' : `${isInvalid} #ff0000`,
        }),
        ...fallback({
            '--backg-color-unvalid' : `${isUnvalidated} #0000ff`,
        }),
        backgroundColor: 'var(--backg-color-valid, var(--backg-color-invalid, var(--backg-color-unvalid)))',
        
        // Apply composite animations:
        animation,
    });
}
