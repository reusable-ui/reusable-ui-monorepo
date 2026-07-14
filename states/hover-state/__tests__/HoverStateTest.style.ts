import { keyframes, style, vars } from '@cssfn/core'
import { usingHoverState } from '../dist/index.js'
import { usingAnimationFeature } from '@reusable-ui/animation-feature'

export default function hoverStateTestStyle() {
    const {
        hoverStateRule,
        hoverStateVars: { hoverFactor },
    } = usingHoverState({
        hoveringAnimation   : 'var(--test-hovering)',
        unhoveringAnimation : 'var(--test-unhovering)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usingAnimationFeature();
    
    return style({
        ...hoverStateRule(),
        ...animationFeatureRule(),
        
        // Hovering animation: interpolate hoverFactor from 0 → 1
        ...vars({
            '--test-hovering': [
                ['1s', 'ease-out', 'both', 'boo-test-hovering'],
            ],
        }),
        ...keyframes('boo-test-hovering', {
            from : { [hoverFactor]: 0 },
            to   : { [hoverFactor]: 1 },
        }),
        
        // Unhovering animation: interpolate hoverFactor from 1 → 0
        ...vars({
            '--test-unhovering': [
                ['1s', 'ease-out', 'both', 'boo-test-unhovering'],
            ],
        }),
        ...keyframes('boo-test-unhovering', {
            from : { [hoverFactor]: 1 },
            to   : { [hoverFactor]: 0 },
        }),
        
        // Example usage:
        // - Outline thickness and color interpolates with `hoverFactor`.
        // - 0 → 0px solid black, 1 → 2px solid blue.
        outline: `calc(${hoverFactor} * 2px) solid color-mix(in srgb, color(srgb 0 0 0) calc((1 - ${hoverFactor}) * 100%), color(srgb 0 0 1) calc(${hoverFactor} * 100%))`,
        
        // Apply composite animations:
        animation,
    });
}
