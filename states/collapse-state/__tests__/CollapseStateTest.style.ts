import { keyframes, style, vars, fallback } from '@cssfn/core'
import { usesCollapseState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function collapseStateTestStyle() {
    const {
        collapseStateRule,
        collapseStateVars: { isExpanded, isCollapsed },
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
        
        ...vars({
            '--test-expanding': [
                ['1s', 'ease-out', 'both', 'boo-test-expanding'],
            ],
        }),
        ...keyframes('boo-test-expanding', {
            from : {
                blockSize: '0px',
            },
            to   : {
                blockSize: '100px',
            },
        }),
        
        ...vars({
            '--test-collapsing': [
                ['1s', 'ease-out', 'both', 'boo-test-collapsing'],
            ],
        }),
        ...keyframes('boo-test-collapsing', {
            from : {
                blockSize: '100px',
            },
            to   : {
                blockSize: '0px',
            },
        }),
        
        // Define final block size based on lifecycle state:
        boxSizing: 'border-box',
        overflow: 'visible', // ensures the [Expand] and [Collapse] buttons are clickable
        ...fallback({
            '--blockSize-expanded' : `${isExpanded} 100px`,
        }),
        ...fallback({
            '--blockSize-collapsed' : `${isCollapsed} 0px`,
        }),
        blockSize: 'var(--blockSize-expanded, var(--blockSize-collapsed))',
        
        // Apply composite animations:
        animation,
    });
}
