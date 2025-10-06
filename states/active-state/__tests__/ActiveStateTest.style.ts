import { keyframes, style, vars, fallback } from '@cssfn/core'
import { usesActiveState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function activeStateTestStyle() {
    const {
        activeStateRule,
        activeStateVars: { isActive, isInactive },
    } = usesActiveState({
        animationActivating   : 'var(--test-activating)',
        animationDeactivating : 'var(--test-deactivating)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...activeStateRule(),
        ...animationFeatureRule(),
        
        ...vars({
            '--test-activating': [
                ['1s', 'ease-out', 'both', 'boo-test-activating'],
            ],
        }),
        ...keyframes('boo-test-activating', {
            from : {
                opacity: '60%',
            },
            to   : {
                opacity: '100%',
            },
        }),
        
        ...vars({
            '--test-deactivating': [
                ['1s', 'ease-out', 'both', 'boo-test-deactivating'],
            ],
        }),
        ...keyframes('boo-test-deactivating', {
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
