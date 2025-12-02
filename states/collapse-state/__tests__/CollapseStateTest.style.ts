import { keyframes, children, style, vars } from '@cssfn/core'
import { usesCollapseState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function collapseStateTestStyle() {
    const {
        collapseStateRule,
        collapseStateVars: { expandFactor },
    } = usesCollapseState({
        animationExpanding  : 'var(--test-expanding)',
        animationCollapsing : 'var(--test-collapsing)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...collapseStateRule(),
        ...animationFeatureRule(),
        
        // Expanding animation: interpolate expandFactor from 0 → 1
        ...vars({
            '--test-expanding': [
                ['1s', 'ease-out', 'both', 'boo-test-expanding'],
            ],
        }),
        ...keyframes('boo-test-expanding', {
            from : { [expandFactor]: 0 },
            to   : { [expandFactor]: 1 },
        }),
        
        // Collapsing animation: interpolate expandFactor from 1 → 0
        ...vars({
            '--test-collapsing': [
                ['1s', 'ease-out', 'both', 'boo-test-collapsing'],
            ],
        }),
        ...keyframes('boo-test-collapsing', {
            from : { [expandFactor]: 1 },
            to   : { [expandFactor]: 0 },
        }),
        
        // Example usage:
        // - Height interpolates with `expandFactor`.
        // - 0 → hidden, 1 → full height.
        // height: `calc-size(100px, size * ${expandFactor})`,
        height: `calc(100px * ${expandFactor})`, // Use cross-browser compatible calc.
        boxSizing: 'border-box', // Include paddings and borders in the height calculation.
        overflow: 'hidden', // Crop overflowing content.
        ...children('.nav', { // Ensure the nav buttons are always visible, even when collapsed.
            position: 'absolute',
            right: 0,
            top: 0,
        }),
        backgroundColor: 'pink', // Visualize the collapsing area.
        
        // Apply composite animations:
        animation,
    });
}
