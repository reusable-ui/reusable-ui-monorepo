import { rule, vars, style, scope, type CssKnownProps } from '@cssfn/core'

import { usesTransformFeature, transformRegistry } from '../dist/index.js'

transformRegistry.registerTransform('var(--transform1)');
transformRegistry.registerTransform('var(--transform2)');
transformRegistry.registerTransform('var(--transform3)');

const transformNoCustomStyle = () => {
    const {
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usesTransformFeature();
    
    
    return style({
        ...rule('.transform1', {
            ...vars({
                '--transform1': [
                    'translate(111px)',
                ] as CssKnownProps['transform']
            }),
        }),
        ...rule('.transform2', {
            ...vars({
                '--transform2': [
                    'rotate(222deg)',
                ] as CssKnownProps['transform']
            }),
        }),
        ...rule('.transform3', {
            ...vars({
                '--transform3': [
                    'skew(333deg)',
                ] as CssKnownProps['transform']
            }),
        }),
        
        ...transformFeatureRule(),
        transform,
    });
};

const transformSimpleCustomStyle = () => {
    const {
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usesTransformFeature({
        transform: 'scale(2, 0.5)',
    });
    
    
    return style({
        ...rule('.transform1', {
            ...vars({
                '--transform1': [
                    'translate(111px)',
                ] as CssKnownProps['transform']
            }),
        }),
        ...rule('.transform2', {
            ...vars({
                '--transform2': [
                    'rotate(222deg)',
                ] as CssKnownProps['transform']
            }),
        }),
        ...rule('.transform3', {
            ...vars({
                '--transform3': [
                    'skew(333deg)',
                ] as CssKnownProps['transform']
            }),
        }),
        
        ...transformFeatureRule(),
        transform,
    });
};

const transformSingleCustomStyle = () => {
    const {
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usesTransformFeature({
        transform: ['perspective(800px)'],
    });
    
    
    return style({
        ...rule('.transform1', {
            ...vars({
                '--transform1': [
                    'translate(111px)',
                ] as CssKnownProps['transform']
            }),
        }),
        ...rule('.transform2', {
            ...vars({
                '--transform2': [
                    'rotate(222deg)',
                ] as CssKnownProps['transform']
            }),
        }),
        ...rule('.transform3', {
            ...vars({
                '--transform3': [
                    'skew(333deg)',
                ] as CssKnownProps['transform']
            }),
        }),
        
        ...transformFeatureRule(),
        transform,
    });
};

const transformSingleImportantCustomStyle = () => {
    const {
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usesTransformFeature({
        transform: ['matrix(1.2, 0.2, -1, 0.9, 0, 20)', '!important'],
    });
    
    
    return style({
        ...rule('.transform1', {
            ...vars({
                '--transform1': [
                    'translate(111px)',
                ] as CssKnownProps['transform']
            }),
        }),
        ...rule('.transform2', {
            ...vars({
                '--transform2': [
                    'rotate(222deg)',
                ] as CssKnownProps['transform']
            }),
        }),
        ...rule('.transform3', {
            ...vars({
                '--transform3': [
                    'skew(333deg)',
                ] as CssKnownProps['transform']
            }),
        }),
        
        ...transformFeatureRule(),
        transform,
    });
};

const transformMultipleCustomStyle = () => {
    const {
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usesTransformFeature({
        transform: [[
            'rotate(0.11turn)',
            'rotate(0.22turn)',
            'rotate(0.33turn)',
        ]],
    });
    
    
    return style({
        ...rule('.transform1', {
            ...vars({
                '--transform1': [
                    'translate(111px)',
                ] as CssKnownProps['transform']
            }),
        }),
        ...rule('.transform2', {
            ...vars({
                '--transform2': [
                    'rotate(222deg)',
                ] as CssKnownProps['transform']
            }),
        }),
        ...rule('.transform3', {
            ...vars({
                '--transform3': [
                    'skew(333deg)',
                ] as CssKnownProps['transform']
            }),
        }),
        
        ...transformFeatureRule(),
        transform,
    });
};

const transformMultipleImportantCustomStyle = () => {
    const {
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usesTransformFeature({
        transform: [[
            'skew(0.11turn)',
            'skew(0.22turn)',
            'skew(0.33turn)',
        ], '!important'],
    });
    
    
    return style({
        ...rule('.transform1', {
            ...vars({
                '--transform1': [
                    'translate(111px)',
                ] as CssKnownProps['transform']
            }),
        }),
        ...rule('.transform2', {
            ...vars({
                '--transform2': [
                    'rotate(222deg)',
                ] as CssKnownProps['transform']
            }),
        }),
        ...rule('.transform3', {
            ...vars({
                '--transform3': [
                    'skew(333deg)',
                ] as CssKnownProps['transform']
            }),
        }),
        
        ...transformFeatureRule(),
        transform,
    });
};

export default [
    scope('transformNoCustomStyle', transformNoCustomStyle),
    scope('transformSimpleCustomStyle', transformSimpleCustomStyle),
    scope('transformSingleCustomStyle', transformSingleCustomStyle),
    scope('transformSingleImportantCustomStyle', transformSingleImportantCustomStyle),
    scope('transformMultipleCustomStyle', transformMultipleCustomStyle),
    scope('transformMultipleImportantCustomStyle', transformMultipleImportantCustomStyle),
];
