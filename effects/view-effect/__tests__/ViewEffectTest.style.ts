import { rule, style, children } from '@cssfn/core'
import { usesTransformFeature } from '@reusable-ui/transform-feature'
import { usesViewEffect } from '../dist/index.js'

// Test style for ViewEffect
// Demonstrates how `viewFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function viewEffectTestStyle() {
    // Features:
    const {
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usesTransformFeature();
    
    // Effects:
    const {
        viewEffectRule,
    } = usesViewEffect({
        enablesSelectiveRendering : false,
        size: '200px',
    });
    const {
        viewEffectRule : viewEffectSelectiveRenderingRule,
    } = usesViewEffect({
        enablesSelectiveRendering : true,
        size: '200px',
    });
    
    return style({
        display: 'grid',
        gridAutoFlow: 'row',
        backgroundColor: 'lightblue',
        border: 'solid 1px darkblue',
        boxSizing: 'content-box',
        width: '200px',
        height: 'calc(1lh + 100px)',
        justifySelf: 'center',
        
        // Children:
        ...children('.views', {
            display: 'grid',
            gridAutoFlow: 'column',
            
            // Features:
            ...transformFeatureRule(),
            
            // Effects:
            ...rule(':not(.enablesSelectiveRendering)&', {
                ...viewEffectRule(),
            }),
            ...rule(':is(.enablesSelectiveRendering)&', {
                ...viewEffectSelectiveRenderingRule(),
            }),
            
            // Apply composed variables:
            transform,
            
            // Children:
            ...children('.view', {
                display: 'grid',
                justifyContent: 'center',
                alignContent: 'center',
                
                width: '200px',
                height: '100px',
                
                fontSize: 'xx-large',
                
                // Adds colors for visual distinction during testing:
                ...rule(':nth-child(5n+1)', {
                    backgroundColor: 'lightgreen',
                }),
                ...rule(':nth-child(5n+2)', {
                    backgroundColor: 'lightpink',
                }),
                ...rule(':nth-child(5n+3)', {
                    backgroundColor: 'lightsalmon',
                }),
                ...rule(':nth-child(5n+4)', {
                    backgroundColor: 'lightsteelblue',
                }),
                ...rule(':nth-child(5n+5)', {
                    backgroundColor: 'lightskyblue',
                }),
                
                // Marker for being/not inspected:
                ...rule(':not([__playwright_target__])', {
                    opacity: 0.3,
                }),
            }),
        }),
    });
}
