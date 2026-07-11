import { keyframes, style, vars } from '@cssfn/core'
import { usingExcitedState } from '../dist/index.js'
import { usingAnimationFeature } from '@reusable-ui/animation-feature'

export default function excitedStateTestStyle() {
    const {
        excitedStateRule,
        excitedStateVars: { excitedFactor },
    } = usingExcitedState({
        animationExciting: 'var(--test-exciting)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usingAnimationFeature();
    
    return style({
        ...excitedStateRule(),
        ...animationFeatureRule(),
        
        ...vars({
            '--test-exciting': [
                // 0.2 sec * 5 iterations = 1 sec:
                ['0.2s', 'ease', 'both', 'alternate-reverse', 5, 'boo-test-exciting'],
            ],
        }),
        ...keyframes('boo-test-exciting', {
            from : { [excitedFactor]: 0 },
            to   : { [excitedFactor]: 1 },
        }),
        
        // Oscillates invert effect several times:
        filter: `invert(calc(0.8 * ${excitedFactor}))`,
        
        // Apply composite animations:
        animation,
    });
}
