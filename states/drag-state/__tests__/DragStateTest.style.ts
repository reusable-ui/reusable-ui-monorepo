import { keyframes, style, vars } from '@cssfn/core'
import { usesDragState } from '../dist/index.js'
import { usesPressState } from '@reusable-ui/press-state'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function dragStateTestStyle() {
    const {
        pressStateRule,
        pressStateVars: { pressFactor },
    } = usesPressState({
        animationPressing  : 'var(--test-pressing)',
        animationReleasing : 'var(--test-releasing)',
    });
    const {
        dragStateRule,
        dragStateVars: { relativeDragOffsetX, relativeDragOffsetY, dragFactor },
    } = usesDragState({
        animationDragging : 'var(--test-dragging)',
        animationDropping : 'var(--test-dropping)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...pressStateRule(),
        ...dragStateRule(),
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
        
        // Dragging animation: interpolate dragFactor from 0 → 1
        ...vars({
            '--test-dragging': [
                ['1s', 'ease-out', 'both', 'boo-test-dragging'],
            ],
        }),
        ...keyframes('boo-test-dragging', {
            from : { [dragFactor]: 0 },
            to   : { [dragFactor]: 1 },
        }),
        
        // Dropping animation: interpolate dragFactor from 1 → 0
        ...vars({
            '--test-dropping': [
                ['1s', 'ease-out', 'both', 'boo-test-dropping'],
            ],
        }),
        ...keyframes('boo-test-dropping', {
            from : { [dragFactor]: 1 },
            to   : { [dragFactor]: 0 },
        }),
        
        // Example usage:
        
        // - Foreground color interpolates with `pressFactor`.
        // - 0 → blue, 1 → darkblue.
        color: `color-mix(in srgb,
            color(srgb 0 0 1) calc((1 - ${pressFactor}) * 100%),
            color(srgb 0 0 0.25) calc(${pressFactor} * 100%)
        )`,
        
        // - Background color interpolates with `dragFactor`.
        // - 0 → light blue, 1 → blue.
        backgroundColor: `color-mix(in srgb,
            color(srgb 0.5 0.5 1) calc((1 - ${dragFactor}) * 100%),
            color(srgb 0 0 1) calc(${dragFactor} * 100%)
        )`,
        
        // - Smoothly move the element from its original position to the pointer position.
        // - 0 → original position, 1 → pointer position.
        transform: `translate(calc(${relativeDragOffsetX} * 1px * ${dragFactor}), calc(${relativeDragOffsetY} * 1px * ${dragFactor}))`,
        
        
        // Apply composite animations:
        animation,
    });
}
