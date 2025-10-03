import { keyframes, style, vars, fallback } from '@cssfn/core'
import { usesReadOnlyState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function readOnlyStateTestStyle() {
    const {
        readOnlyStateRule,
        readOnlyStateVars: { isEditable, isReadOnly },
    } = usesReadOnlyState({
        animationThaw  : 'var(--test-thaw)',
        animationFreeze : 'var(--test-freeze)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...readOnlyStateRule(),
        ...animationFeatureRule(),
        
        ...vars({
            '--test-thaw': [
                ['1s', 'ease-out', 'both', 'boo-test-thaw'],
            ],
        }),
        ...keyframes('boo-test-thaw', {
            from: {
                opacity: 0.5,
            },
            to: {
                opacity: 1,
            },
        }),
        
        ...vars({
            '--test-freeze': [
                ['1s', 'ease-out', 'both', 'boo-test-freeze'],
            ],
        }),
        ...keyframes('boo-test-freeze', {
            from: {
                opacity: 1,
            },
            to: {
                opacity: 0.5,
            },
        }),
        
        // Define final opacity based on lifecycle state:
        ...fallback({
            '--opacity-editable'  : `${isEditable} 1`,
        }),
        ...fallback({
            '--opacity-readonly' : `${isReadOnly} 0.5`,
        }),
        opacity: 'var(--opacity-editable, var(--opacity-readonly))',
        
        // Apply composite animations:
        animation,
    });
}
