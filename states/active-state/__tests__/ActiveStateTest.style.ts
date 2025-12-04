import { keyframes, style, vars } from '@cssfn/core'
import { usesActiveState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function activeStateTestStyle() {
    const {
        activeStateRule,
        activeStateVars: { activeFactor },
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
        
        // Activating animation: interpolate activeFactor from 0 → 1
        ...vars({
            '--test-activating': [
                ['1s', 'ease-out', 'both', 'boo-test-activating'],
            ],
        }),
        ...keyframes('boo-test-activating', {
            from : { [activeFactor]: 0 },
            to   : { [activeFactor]: 1 },
        }),
        
        // Deactivating animation: interpolate activeFactor from 1 → 0
        ...vars({
            '--test-deactivating': [
                ['1s', 'ease-out', 'both', 'boo-test-deactivating'],
            ],
        }),
        ...keyframes('boo-test-deactivating', {
            from : { [activeFactor]: 1 },
            to   : { [activeFactor]: 0 },
        }),
        
        // Example usage:
        // - Opacity interpolates with `activeFactor`.
        // - 0 → dimmed, 1 → fully visible.
        // baseline + ((target - baseline) * factor)
        opacity: `calc(0.5 + ((1 - 0.5) * ${activeFactor}))`,
        
        // Apply composite animations:
        animation,
    });
}
