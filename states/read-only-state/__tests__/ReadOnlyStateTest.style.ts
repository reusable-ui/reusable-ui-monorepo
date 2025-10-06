import { keyframes, style, vars, fallback } from '@cssfn/core'
import { usesReadOnlyState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function readOnlyStateTestStyle() {
    const {
        readOnlyStateRule,
        readOnlyStateVars: { isEditable, isReadOnly },
    } = usesReadOnlyState({
        animationThawing  : 'var(--test-thawing)',
        animationFreezing : 'var(--test-freezing)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...readOnlyStateRule(),
        ...animationFeatureRule(),
        
        ...vars({
            '--test-thawing': [
                ['1s', 'ease-out', 'both', 'boo-test-thawing'],
            ],
        }),
        ...keyframes('boo-test-thawing', {
            from: {
                opacity: 0.5,
            },
            to: {
                opacity: 1,
            },
        }),
        
        ...vars({
            '--test-freezing': [
                ['1s', 'ease-out', 'both', 'boo-test-freezing'],
            ],
        }),
        ...keyframes('boo-test-freezing', {
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
