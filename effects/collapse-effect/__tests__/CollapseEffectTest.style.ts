import { rule, style, vars, switchOf } from '@cssfn/core'
import { usesTransformFeature } from '@reusable-ui/transform-feature'
import { usesCollapseEffect } from '../dist/index.js'

// Test style for CollapseEffect
// Demonstrates how `expandFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function collapseEffectTestStyle() {
    // Features:
    const {
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usesTransformFeature();
    
    // Effects:
    const {
        collapseEffectRule : collapseEffectStartDirectionRule,
        collapseEffectVars: {
            collapseMarginInlineStart,
            collapseMarginInlineEnd,
            collapseMarginBlockStart,
            collapseMarginBlockEnd,
            
            collapseClipPath,
            
            collapseDisplay,
        },
    } = usesCollapseEffect({
        orientation   : 'var(--orientation)',
        flowDirection : 'start',
        display       : 'none',
    });
    const {
        collapseEffectRule : collapseEffectEndDirectionRule,
    } = usesCollapseEffect({
        orientation   : 'var(--orientation)',
        flowDirection : 'end',
        display       : 'none',
    });
    
    return style({
        backgroundImage : 'linear-gradient(45deg, pink, lightgreen)',
        boxSizing       : 'content-box',
        width           : '300px',
        height          : '200px',
        paddingInline   : '15px',
        paddingBlock    : '12px',
        border          : 'solid 10px darkred',
        borderRadius    : '12px',
        justifySelf     : 'center', // Center the test box to the middle of screen.
        justifyContent  : 'center', // Center the text.
        alignContent    : 'center', // Center the text.
        
        // Features:
        ...transformFeatureRule(),
        
        // Effects:
        ...rule('.is-inline-orientation', {
            ...vars({
                '--orientation': 0, // inline
            }),
        }),
        ...rule('.is-block-orientation', {
            ...vars({
                '--orientation': 1, // block
            }),
        }),
        ...rule('.is-start-direction', {
            ...collapseEffectStartDirectionRule(),
        }),
        ...rule('.is-end-direction', {
            ...collapseEffectEndDirectionRule(),
        }),
        
        // Apply composed variables:
        transform,
        marginInlineStart : collapseMarginInlineStart,
        marginInlineEnd   : collapseMarginInlineEnd,
        marginBlockStart  : collapseMarginBlockStart,
        marginBlockEnd    : collapseMarginBlockEnd,
        clipPath          : collapseClipPath,
        display           : switchOf(collapseDisplay, 'grid'),
    });
}
