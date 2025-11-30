import { keyframes, style, vars } from '@cssfn/core'
import { usesPressState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function pressStateTestStyle() {
    const {
        pressStateRule,
        pressStateVars: { pressFactor },
    } = usesPressState({
        animationPressing  : 'var(--test-pressing)',
        animationReleasing : 'var(--test-releasing)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...pressStateRule(),
        ...animationFeatureRule(),
        
        // Pressing animation: interpolate pressFactor from 0 → 1
        ...vars({
            '--test-pressing': [
                ['1s', 'ease-out', 'both', 'boo-test-pressing'],
            ],
        }),
        ...keyframes('boo-test-pressing', {
            from : { [pressFactor]: 0 },
            to   : { [pressFactor]: 1 },
        }),
        
        // Releasing animation: interpolate pressFactor from 1 → 0
        ...vars({
            '--test-releasing': [
                ['1s', 'ease-out', 'both', 'boo-test-releasing'],
            ],
        }),
        ...keyframes('boo-test-releasing', {
            from : { [pressFactor]: 1 },
            to   : { [pressFactor]: 0 },
        }),
        
        // Example usage:
        // - Background color interpolates with `pressFactor`.
        // - 0 → blue, 1 → darkblue.
        backgroundColor: `color-mix(in srgb,
            color(srgb 0 0 1) calc((1 - ${pressFactor}) * 100%),
            color(srgb 0 0 0.25) calc(${pressFactor} * 100%)
        )`,
        
        // Apply composite animations:
        animation,
    });
}
