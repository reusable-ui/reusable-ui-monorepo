import { style, children } from '@cssfn/core'
import { usesTransformFeature } from '@reusable-ui/transform-feature';
import { usesSortEffect } from '../dist/index.js'

// Test style for SortEffect
// Demonstrates how `sortFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function sortEffectTestStyle() {
    // Features:
    const {
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usesTransformFeature();
    
    // Effects:
    const {
        sortEffectRule,
    } = usesSortEffect({
        // Currently no options are available, reserved for future extension.
    });
    
    return style({
        backgroundColor: 'lightblue',
        color: 'darkblue',
        borderColor: 'darkblue',
        
        // Children:
        ...children('.label', {
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 999,
        }),
        ...children('.items', {
            // Grid with 3 columns:
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            
            ...children('.item', {
                // Center text vertically and horizontally:
                display: 'grid',
                placeItems: 'center',
                
                // Visual styling:
                border: '1px solid darkblue',
                padding: '20px',
                backgroundImage: 'linear-gradient(135deg, oklch(0.9 0.2 265 / 1), oklch(0.7 0.3 265 / 1))',
                
                // Features:
                ...transformFeatureRule(),
                
                // Effects:
                ...sortEffectRule(),
                
                // Apply composed variables:
                transform,
            }),
        }),
    });
}
