import { rule, style, vars, children } from '@cssfn/core'
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
        viewEffectRule : viewEffectRule,
    } = usesViewEffect({
        size: 'var(--size)',
        
        orientation   : 'var(--orientation)',
        flowDirection : 'var(--flowDirection)',
        enablesSelectiveRendering : false,
    });
    const {
        viewEffectRule : viewEffectSelectiveRenderingRule,
    } = usesViewEffect({
        size: 'var(--size)',
        
        orientation   : 'var(--orientation)',
        flowDirection : 'var(--flowDirection)',
        enablesSelectiveRendering : true,
    });
    
    return style({
        display: 'grid',
        gridAutoFlow: 'row',
        backgroundColor: 'lightblue',
        border: 'solid 1px darkblue',
        boxSizing: 'content-box',
        width: '200px',
        height: '100px',
        justifySelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        ...rule('.is-inline-orientation&', {
            ...rule('.is-start-direction&', {
                justifyContent: 'start', // The first view shown first (stacking horizontally)
            }),
            ...rule('.is-end-direction&', {
                justifyContent: 'end', // The last view shown first (stacking horizontally)
            }),
        }),
        ...rule('.is-block-orientation&', {
            ...rule('.is-start-direction&', {
                alignContent: 'start', // The first view shown first (stacking vertically)
            }),
            ...rule('.is-end-direction&', {
                alignContent: 'end', // The last view shown first (stacking vertically)
            }),
        }),
        position: 'relative', // Supports for `.label`
        
        // Children:
        ...children('.label', {
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 999,
        }),
        ...children('.views', {
            display: 'flex',
            ...rule('.is-inline-orientation&', {
                ...rule('.is-start-direction&', {
                    flexDirection: 'row',
                }),
                ...rule('.is-end-direction&', {
                    flexDirection: 'row-reverse',
                }),
            }),
            ...rule('.is-block-orientation&', {
                ...rule('.is-start-direction&', {
                    flexDirection: 'column',
                }),
                ...rule('.is-end-direction&', {
                    flexDirection: 'column-reverse',
                }),
            }),
            
            // Features:
            ...transformFeatureRule(),
            
            // Effects:
            ...rule('.is-inline-orientation&', {
                ...vars({
                    '--orientation': 0, // inline
                    '--size': '200px',
                }),
            }),
            ...rule('.is-block-orientation&', {
                ...vars({
                    '--orientation': 1, // block
                    '--size': '100px',
                }),
            }),
            ...rule('.is-start-direction&', {
                ...vars({
                    '--flowDirection': 0,
                }),
            }),
            ...rule('.is-end-direction&', {
                ...vars({
                    '--flowDirection': 1,
                }),
            }),
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
                flex: '0 0 auto', // not growing, not shrinking
                
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
