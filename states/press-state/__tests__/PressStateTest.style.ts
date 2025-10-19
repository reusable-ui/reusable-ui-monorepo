import { keyframes, style, vars, fallback } from '@cssfn/core'
import { usesPressState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function pressStateTestStyle() {
    const {
        pressStateRule,
        pressStateVars: { isPressed, isReleased },
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
        
        ...vars({
            '--test-pressing': [
                ['1s', 'ease-out', 'both', 'boo-test-pressing'],
            ],
        }),
        ...keyframes('boo-test-pressing', {
            from : {
                backgroundColor: 'rgb(0, 0, 255)',
            },
            to   : {
                backgroundColor: 'rgb(0, 0, 140)',
            },
        }),
        
        ...vars({
            '--test-releasing': [
                ['1s', 'ease-out', 'both', 'boo-test-releasing'],
            ],
        }),
        ...keyframes('boo-test-releasing', {
            from : {
                backgroundColor: 'rgb(0, 0, 140)',
            },
            to   : {
                backgroundColor: 'rgb(0, 0, 255)',
            },
        }),
        
        // Define final background color based on lifecycle state:
        ...fallback({
            '--background-color-pressed'  : `${isPressed} rgb(0, 0, 140)`,
        }),
        ...fallback({
            '--background-color-released' : `${isReleased} rgb(0, 0, 255)`,
        }),
        backgroundColor: 'var(--background-color-pressed, var(--background-color-released))',
        
        // Apply composite animations:
        animation,
    });
}
