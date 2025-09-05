import { keyframes, style, vars, fallback } from '@cssfn/core'
import { usesCollapseState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function collapseStateTestStyle() {
    const {
        collapseStateRule,
        collapseStateVars: { isExpanded, isCollapsed },
    } = usesCollapseState({
        animationExpand   : 'var(--test-expand)',
        animationCollapse : 'var(--test-collapse)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...collapseStateRule(),
        ...animationFeatureRule(),
        
        ...vars({
            '--test-expand': [
                ['1s', 'ease-out', 'both', 'boo-test-expand'],
            ],
        }),
        ...keyframes('boo-test-expand', {
            from : {
                blockSize: '0px',
            },
            to   : {
                blockSize: '100px',
            },
        }),
        
        ...vars({
            '--test-collapse': [
                ['1s', 'ease-out', 'both', 'boo-test-collapse'],
            ],
        }),
        ...keyframes('boo-test-collapse', {
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
