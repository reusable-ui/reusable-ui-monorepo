import { keyframes, style, vars, children } from '@cssfn/core'
import { usesSortState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

export default function sortStateTestStyle() {
    const {
        sortStateRule,
        sortStateVars: { sortOffsetX, sortOffsetY, sortFactor },
    } = usesSortState({
        animationSorting: 'var(--test-sorting)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        ...sortStateRule(),
        ...animationFeatureRule(),
        
        ...vars({
            '--test-sorting': [
                ['1000ms', 'linear', 'both', 'boo-test-sorting'],
            ],
        }),
        ...keyframes('boo-test-sorting', {
            from : { [sortFactor]: 1 }, // Start fully unsorted.
            to   : { [sortFactor]: 0 }, // End fully sorted.
        }),
        
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
                
                // Translate each item from its unsorted position → sorted position:
                // - `sortOffsetX` and `sortOffsetY` are applied per item (via sortStyles).
                // - `sortFactor` applies at container level, interpolating the offsets over time.
                transform: `translate(calc(${sortOffsetX} * 1px * ${sortFactor}), calc(${sortOffsetY} * 1px * ${sortFactor}))`,
            }),
        }),
        
        // Apply composite animations:
        animation,
    });
}
