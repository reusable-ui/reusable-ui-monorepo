import { rule, vars, style, scope, type CssKnownProps } from '@cssfn/core'

import { usesFilterFeature, filterRegistry } from '../dist/index.js'

filterRegistry.registerFilter('var(--filter1)');
filterRegistry.registerFilter('var(--filter2)');
filterRegistry.registerFilter('var(--filter3)');

const filterNoCustomStyle = () => {
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usesFilterFeature();
    
    
    return style({
        ...rule('.filter1', {
            ...vars({
                '--filter1': [
                    'brightness(0.44)',
                ] as CssKnownProps['filter']
            }),
        }),
        ...rule('.filter2', {
            ...vars({
                '--filter2': [
                    'grayscale(0.55)',
                ] as CssKnownProps['filter']
            }),
        }),
        ...rule('.filter3', {
            ...vars({
                '--filter3': [
                    'sepia(0.66)',
                ] as CssKnownProps['filter']
            }),
        }),
        
        ...filterFeatureRule(),
        filter,
    });
};

const filterSimpleCustomStyle = () => {
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usesFilterFeature({
        filter: 'contrast(0.77)',
    });
    
    
    return style({
        ...rule('.filter1', {
            ...vars({
                '--filter1': [
                    'brightness(0.44)',
                ] as CssKnownProps['filter']
            }),
        }),
        ...rule('.filter2', {
            ...vars({
                '--filter2': [
                    'grayscale(0.55)',
                ] as CssKnownProps['filter']
            }),
        }),
        ...rule('.filter3', {
            ...vars({
                '--filter3': [
                    'sepia(0.66)',
                ] as CssKnownProps['filter']
            }),
        }),
        
        ...filterFeatureRule(),
        filter,
    });
};

const filterSingleCustomStyle = () => {
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usesFilterFeature({
        filter: ['opacity(0.88)'],
    });
    
    
    return style({
        ...rule('.filter1', {
            ...vars({
                '--filter1': [
                    'brightness(0.44)',
                ] as CssKnownProps['filter']
            }),
        }),
        ...rule('.filter2', {
            ...vars({
                '--filter2': [
                    'grayscale(0.55)',
                ] as CssKnownProps['filter']
            }),
        }),
        ...rule('.filter3', {
            ...vars({
                '--filter3': [
                    'sepia(0.66)',
                ] as CssKnownProps['filter']
            }),
        }),
        
        ...filterFeatureRule(),
        filter,
    });
};

const filterSingleImportantCustomStyle = () => {
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usesFilterFeature({
        filter: ['opacity(0.99)', '!important'],
    });
    
    
    return style({
        ...rule('.filter1', {
            ...vars({
                '--filter1': [
                    'brightness(0.44)',
                ] as CssKnownProps['filter']
            }),
        }),
        ...rule('.filter2', {
            ...vars({
                '--filter2': [
                    'grayscale(0.55)',
                ] as CssKnownProps['filter']
            }),
        }),
        ...rule('.filter3', {
            ...vars({
                '--filter3': [
                    'sepia(0.66)',
                ] as CssKnownProps['filter']
            }),
        }),
        
        ...filterFeatureRule(),
        filter,
    });
};

const filterMultipleCustomStyle = () => {
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usesFilterFeature({
        filter: [[
            'sepia(0.11)',
            'sepia(0.22)',
            'sepia(0.33)',
        ]],
    });
    
    
    return style({
        ...rule('.filter1', {
            ...vars({
                '--filter1': [
                    'brightness(0.44)',
                ] as CssKnownProps['filter']
            }),
        }),
        ...rule('.filter2', {
            ...vars({
                '--filter2': [
                    'grayscale(0.55)',
                ] as CssKnownProps['filter']
            }),
        }),
        ...rule('.filter3', {
            ...vars({
                '--filter3': [
                    'sepia(0.66)',
                ] as CssKnownProps['filter']
            }),
        }),
        
        ...filterFeatureRule(),
        filter,
    });
};

const filterMultipleImportantCustomStyle = () => {
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usesFilterFeature({
        filter: [[
            'invert(0.11)',
            'invert(0.22)',
            'invert(0.33)',
        ], '!important'],
    });
    
    
    return style({
        ...rule('.filter1', {
            ...vars({
                '--filter1': [
                    'brightness(0.44)',
                ] as CssKnownProps['filter']
            }),
        }),
        ...rule('.filter2', {
            ...vars({
                '--filter2': [
                    'grayscale(0.55)',
                ] as CssKnownProps['filter']
            }),
        }),
        ...rule('.filter3', {
            ...vars({
                '--filter3': [
                    'sepia(0.66)',
                ] as CssKnownProps['filter']
            }),
        }),
        
        ...filterFeatureRule(),
        filter,
    });
};

export default [
    scope('filterNoCustomStyle', filterNoCustomStyle),
    scope('filterSimpleCustomStyle', filterSimpleCustomStyle),
    scope('filterSingleCustomStyle', filterSingleCustomStyle),
    scope('filterSingleImportantCustomStyle', filterSingleImportantCustomStyle),
    scope('filterMultipleCustomStyle', filterMultipleCustomStyle),
    scope('filterMultipleImportantCustomStyle', filterMultipleImportantCustomStyle),
];
