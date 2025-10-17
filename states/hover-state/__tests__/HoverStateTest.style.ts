import { keyframes, style, vars, fallback } from '@cssfn/core'
import { usesHoverState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function hoverStateTestStyle() {
    const {
        hoverStateRule,
        hoverStateVars: { isHovered, isLeaved },
    } = usesHoverState({
        animationHovering : 'var(--test-hovering)',
        animationLeaving : 'var(--test-leaving)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...hoverStateRule(),
        ...animationFeatureRule(),
        
        ...vars({
            '--test-hovering': [
                ['1s', 'ease-out', 'both', 'boo-test-hovering'],
            ],
        }),
        ...keyframes('boo-test-hovering', {
            from : {
                outline: 'rgb(0, 0, 0) solid 0px',
            },
            to   : {
                outline: 'rgb(0, 0, 255) solid 2px',
            },
        }),
        
        ...vars({
            '--test-leaving': [
                ['1s', 'ease-out', 'both', 'boo-test-leaving'],
            ],
        }),
        ...keyframes('boo-test-leaving', {
            from : {
                outline: 'rgb(0, 0, 255) solid 2px',
            },
            to   : {
                outline: 'rgb(0, 0, 0) solid 0px',
            },
        }),
        
        // Define final outline based on lifecycle state:
        ...fallback({
            '--outline-hovered' : `${isHovered} rgb(0, 0, 255) solid 2px`,
        }),
        ...fallback({
            '--outline-leaved' : `${isLeaved} rgb(0, 0, 0) solid 0px`,
        }),
        outline: 'var(--outline-hovered, var(--outline-leaved))',
        
        // Apply composite animations:
        animation,
    });
}
