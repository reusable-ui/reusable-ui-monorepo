import { keyframes, style, vars, fallback } from '@cssfn/core'
import { usesFocusState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function focusStateTestStyle() {
    const {
        focusStateRule,
        focusStateVars: { isFocused, isBlurred },
    } = usesFocusState({
        animationFocusing : 'var(--test-focusing)',
        animationBlurring : 'var(--test-blurring)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...focusStateRule(),
        ...animationFeatureRule(),
        
        ...vars({
            '--test-focusing': [
                ['1s', 'ease-out', 'both', 'boo-test-focusing'],
            ],
        }),
        ...keyframes('boo-test-focusing', {
            from : {
                outline: 'rgb(0, 0, 0) solid 0px',
            },
            to   : {
                outline: 'rgb(0, 0, 255) solid 2px',
            },
        }),
        
        ...vars({
            '--test-blurring': [
                ['1s', 'ease-out', 'both', 'boo-test-blurring'],
            ],
        }),
        ...keyframes('boo-test-blurring', {
            from : {
                outline: 'rgb(0, 0, 255) solid 2px',
            },
            to   : {
                outline: 'rgb(0, 0, 0) solid 0px',
            },
        }),
        
        // Define final outline based on lifecycle state:
        ...fallback({
            '--outline-focused' : `${isFocused} rgb(0, 0, 255) solid 2px`,
        }),
        ...fallback({
            '--outline-blurred' : `${isBlurred} rgb(0, 0, 0) solid 0px`,
        }),
        outline: 'var(--outline-focused, var(--outline-blurred))',
        
        // Apply composite animations:
        animation,
    });
}
