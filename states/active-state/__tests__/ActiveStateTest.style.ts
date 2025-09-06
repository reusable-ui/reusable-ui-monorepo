import { keyframes, style, vars, fallback } from '@cssfn/core'
import { usesActiveState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function activeStateTestStyle() {
    const {
        activeStateRule,
        activeStateVars: { isActive, isInactive },
    } = usesActiveState({
        animationActivate   : 'var(--test-activate)',
        animationDeactivate : 'var(--test-deactivate)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...activeStateRule(),
        ...animationFeatureRule(),
        
        ...vars({
            '--test-activate': [
                ['1s', 'ease-out', 'both', 'boo-test-activate'],
            ],
        }),
        ...keyframes('boo-test-activate', {
            from : {
                opacity: '60%',
            },
            to   : {
                opacity: '100%',
            },
        }),
        
        ...vars({
            '--test-deactivate': [
                ['1s', 'ease-out', 'both', 'boo-test-deactivate'],
            ],
        }),
        ...keyframes('boo-test-deactivate', {
            from : {
                opacity: '100%',
            },
            to   : {
                opacity: '60%',
            },
        }),
        
        // Define final opacity based on lifecycle state:
        ...fallback({
            '--opacity-active' : `${isActive} 100%`,
        }),
        ...fallback({
            '--opacity-inactive' : `${isInactive} 60%`,
        }),
        opacity: 'var(--opacity-active, var(--opacity-inactive))',
        
        // Apply composite animations:
        animation,
    });
}
