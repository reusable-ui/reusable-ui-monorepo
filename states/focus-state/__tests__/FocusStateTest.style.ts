import { keyframes, style, vars } from '@cssfn/core'
import { usesFocusState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function focusStateTestStyle() {
    const {
        focusStateRule,
        focusStateVars: { focusFactor },
    } = usesFocusState({
        animationFocusing : 'var(--test-focusing)',
        animationBlurring : 'var(--test-blurring)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...focusStateRule(),
        ...animationFeatureRule(),
        
        // Focusing animation: interpolate focusFactor from 0 → 1
        ...vars({
            '--test-focusing': [
                ['1s', 'ease-out', 'both', 'boo-test-focusing'],
            ],
        }),
        ...keyframes('boo-test-focusing', {
            from : { [focusFactor]: 0 },
            to   : { [focusFactor]: 1 },
        }),
        
        // Blurring animation: interpolate focusFactor from 1 → 0
        ...vars({
            '--test-blurring': [
                ['1s', 'ease-out', 'both', 'boo-test-blurring'],
            ],
        }),
        ...keyframes('boo-test-blurring', {
            from : { [focusFactor]: 1 },
            to   : { [focusFactor]: 0 },
        }),
        
        // Example usage:
        // - Outline thickness and color interpolates with `focusFactor`.
        // - 0 → 0px solid black, 1 → 2px solid blue.
        outline: `calc(${focusFactor} * 2px) solid color-mix(in srgb, color(srgb 0 0 0) calc((1 - ${focusFactor}) * 100%), color(srgb 0 0 1) calc(${focusFactor} * 100%))`,
        
        // Apply composite animations:
        animation,
    });
}
