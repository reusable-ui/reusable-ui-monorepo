import { keyframes, style, vars } from '@cssfn/core'
import { usesExciteState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function exciteStateTestStyle() {
    const {
        exciteStateRule,
    } = usesExciteState({
        animationExcite: 'var(--test-excite)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...exciteStateRule(),
        ...animationFeatureRule(),
        
        ...vars({
            '--test-excite': [
                // 0.2 sec * 5 iterations = 1 sec:
                ['0.2s', 'ease', 'both', 'alternate-reverse', 5, 'boo-test-excite'],
            ],
        }),
        ...keyframes('boo-test-excite', {
            from : {
                filter : [[
                    'invert(0)',
                ]],
            },
            to   : {
                filter : [[
                    'invert(0.8)',
                ]],
            },
        }),
        
        // Apply composite animations:
        animation,
    });
}
