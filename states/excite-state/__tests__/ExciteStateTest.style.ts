import { keyframes, style, vars } from '@cssfn/core'
import { usingExciteState } from '../dist/index.js'
import { usingAnimationFeature } from '@reusable-ui/animation-feature'

export default function exciteStateTestStyle() {
    const {
        exciteStateRule,
        exciteStateVars: { exciteFactor },
    } = usingExciteState({
        animationExciting: 'var(--test-exciting)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usingAnimationFeature();
    
    return style({
        ...exciteStateRule(),
        ...animationFeatureRule(),
        
        ...vars({
            '--test-exciting': [
                // 0.2 sec * 5 iterations = 1 sec:
                ['0.2s', 'ease', 'both', 'alternate-reverse', 5, 'boo-test-exciting'],
            ],
        }),
        ...keyframes('boo-test-exciting', {
            from : { [exciteFactor]: 0 },
            to   : { [exciteFactor]: 1 },
        }),
        
        // Oscillates invert effect several times:
        filter: `invert(calc(0.8 * ${exciteFactor}))`,
        
        // Apply composite animations:
        animation,
    });
}
