import { rule, keyframes, style, vars, scope, switchOf } from '@cssfn/core'
import { usesViewState } from '../dist/index.js'
import { usesAnimationFeature } from '@reusable-ui/animation-feature'

function containerStyle() {
    return style({
        display: 'grid',
        boxSizing: 'border-box',
        inlineSize: '100px',
        overflow: 'hidden',
        border: 'solid 1px black',
    });
}

function viewsStyle() {
    const {
        viewStateRule,
        viewStateVars: { viewIndex, prevViewIndex, viewIndexFactor },
    } = usesViewState({
        animationViewAdvancing : 'var(--test-view-advancing)',
        animationViewReceding  : 'var(--test-view-receding)',
    });
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    return style({
        display: 'grid',
        gridTemplate: [[
            '"label  label  label   label" auto',
            '"view-1 view-2 view-3 view-4" 50px',
            '/',
            '1fr 1fr 1fr 1fr',
        ]],
        boxSizing: 'border-box',
        inlineSize: '100px',
        border: 'solid 1px black',
        
        ...viewStateRule(),
        ...animationFeatureRule(),
        
        // Advancing animation: interpolate viewIndexFactor from 0 → +1
        ...vars({
            '--test-view-advancing': [
                ['1s', 'ease-out', 'both', 'boo-test-view-advancing'],
            ],
        }),
        ...keyframes('boo-test-view-advancing', {
            from : { [viewIndexFactor]:  0 },
            to   : { [viewIndexFactor]:  1 },
        }),
        
        // Receding animation: interpolate viewIndexFactor from 0 → -1
        ...vars({
            '--test-view-receding': [
                ['1s', 'ease-out', 'both', 'boo-test-view-receding'],
            ],
        }),
        ...keyframes('boo-test-view-receding', {
            from : { [viewIndexFactor]:  0 },
            to   : { [viewIndexFactor]: -1 },
        }),
        
        // Shift index factor:
        // - Represents the signed destination index for visual translation.
        // - Advancing : shiftIndexFactor =  viewIndexFactor
        // - Receding  : shiftIndexFactor = -viewIndexFactor - 1
        // 
        // Direction detection is done inline using:
        //   clamp(0, (prevViewIndex - viewIndex) * 999999, 1)
        //   → If prev > view → receding → clamp = 1
        //   → If prev ≤ view → advancing → clamp = 0
        // 
        // The multiplier (999999) ensures fractional diffs (e.g. 0.00001) still trigger receding.
        '--_shiftIndexFactor':
`calc(
    ${viewIndexFactor}
    +
    clamp(0, calc((${switchOf(prevViewIndex, viewIndex)} - ${viewIndex}) * 999999), 1)
    * ((${viewIndexFactor} * -2) - 1)
)`,
        
        // Example usage:
        // - Translate based on the distance between origin and destination views, interpolated by `--_shiftIndexFactor`.
        // - 0 → origin view, ±1 → destination view.
        marginInlineStart: `calc(var(--_shiftIndexFactor) * (${viewIndex} - ${prevViewIndex}) * -100px)`,
        contain: 'layout', // Contain layout to prevent reflows.
        willChange: 'margin-inline-start', // Hint to browser for better performance.
        
        // Apply composite animations:
        animation,
    });
}

function viewStyle() {
    return style({
        boxSizing: 'border-box',
        inlineSize: '100px',
        border: 'solid 1px gray',
        
        // Colors for each view for easy identification:
        ...rule('[data-testid="view-item-0"]', { backgroundColor: 'lightblue' }),
        ...rule('[data-testid="view-item-1"]', { backgroundColor: 'lightgreen' }),
        ...rule('[data-testid="view-item-2"]', { backgroundColor: 'lightcoral' }),
        ...rule('[data-testid="view-item-3"]', { backgroundColor: 'lightyellow' }),
    });
}

function labelStyle() {
    return style({
        gridArea: 'label',
    });
}

export default [
    scope('container', containerStyle),
    scope('views', viewsStyle),
    scope('view', viewStyle),
    scope('label', labelStyle),
];
