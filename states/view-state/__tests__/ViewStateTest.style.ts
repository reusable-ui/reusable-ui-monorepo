import { rule, keyframes, style, vars, scope } from '@cssfn/core'
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
        viewStateVars: { viewIndex, prevViewIndex, isViewProgressing },
    } = usesViewState({
        animationViewProgressing : 'var(--test-view-progressing)',
        animationViewRegressing  : 'var(--test-view-regressing)',
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
        
        ...vars({
            '--test-view-progressing': [
                ['1s', 'ease-out', 'both', 'boo-test-view-progressing'],
            ],
        }),
        ...keyframes('boo-test-view-progressing', {
            from: {
                marginInlineStart: 0,
            },
            to: {
                marginInlineStart: `calc((${viewIndex} - ${prevViewIndex}) * -100px)`,
            },
        }),
        
        ...vars({
            '--test-view-regressing': [
                ['1s', 'ease-out', 'both', 'boo-test-view-regressing'],
            ],
        }),
        ...keyframes('boo-test-view-regressing', {
            from: {
                marginInlineStart: `calc((${prevViewIndex} - ${viewIndex}) * -100px)`,
            },
            to: {
                marginInlineStart: 0,
            },
        }),
        
        // Define final translation based on current viewIndex:
        marginInlineStart: `${isViewProgressing} calc((${viewIndex} - ${prevViewIndex}) * -100px)`, // Translate to the current view.
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
