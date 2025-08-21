import { rule, vars, style, scope, type CssKnownProps } from '@cssfn/core'

import { usesBoxShadowFeature, boxShadowRegistry } from '../dist/index.js'

boxShadowRegistry.registerBoxShadow('var(--boxShadow1)');
boxShadowRegistry.registerBoxShadow('var(--boxShadow2)');
boxShadowRegistry.registerBoxShadow('var(--boxShadow3)');

const boxShadowNoCustomStyle = () => {
    const {
        boxShadowFeatureRule,
        boxShadowFeatureVars: { boxShadow },
    } = usesBoxShadowFeature();
    
    
    return style({
        ...rule('.boxShadow1', {
            ...vars({
                '--boxShadow1': [
                    ['rgb(255, 0, 0)', '5px', '6px', '7px', '8px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        ...rule('.boxShadow2', {
            ...vars({
                '--boxShadow2': [
                    ['rgb(0, 255, 0)', '6px', '7px', '8px', '9px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        ...rule('.boxShadow3', {
            ...vars({
                '--boxShadow3': [
                    ['rgb(0, 0, 255)', '7px', '8px', '9px', '1px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        
        ...boxShadowFeatureRule(),
        boxShadow,
    });
};

const boxShadowSimpleCustomStyle = () => {
    const {
        boxShadowFeatureRule,
        boxShadowFeatureVars: { boxShadow },
    } = usesBoxShadowFeature({
        boxShadow: 'rgb(11, 11, 11) 11px 22px 33px 44px',
    });
    
    
    return style({
        ...rule('.boxShadow1', {
            ...vars({
                '--boxShadow1': [
                    ['rgb(255, 0, 0)', '5px', '6px', '7px', '8px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        ...rule('.boxShadow2', {
            ...vars({
                '--boxShadow2': [
                    ['rgb(0, 255, 0)', '6px', '7px', '8px', '9px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        ...rule('.boxShadow3', {
            ...vars({
                '--boxShadow3': [
                    ['rgb(0, 0, 255)', '7px', '8px', '9px', '1px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        
        ...boxShadowFeatureRule(),
        boxShadow,
    });
};

const boxShadowSingleCustomStyle = () => {
    const {
        boxShadowFeatureRule,
        boxShadowFeatureVars: { boxShadow },
    } = usesBoxShadowFeature({
        boxShadow: ['rgb(22, 22, 22)', '22px', '33px', '44px', '55px'],
    });
    
    
    return style({
        ...rule('.boxShadow1', {
            ...vars({
                '--boxShadow1': [
                    ['rgb(255, 0, 0)', '5px', '6px', '7px', '8px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        ...rule('.boxShadow2', {
            ...vars({
                '--boxShadow2': [
                    ['rgb(0, 255, 0)', '6px', '7px', '8px', '9px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        ...rule('.boxShadow3', {
            ...vars({
                '--boxShadow3': [
                    ['rgb(0, 0, 255)', '7px', '8px', '9px', '1px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        
        ...boxShadowFeatureRule(),
        boxShadow,
    });
};

const boxShadowSingleImportantCustomStyle = () => {
    const {
        boxShadowFeatureRule,
        boxShadowFeatureVars: { boxShadow },
    } = usesBoxShadowFeature({
        boxShadow: ['rgb(33, 33, 33)', '33px', '44px', '55px', '66px'],
    });
    
    
    return style({
        ...rule('.boxShadow1', {
            ...vars({
                '--boxShadow1': [
                    ['rgb(255, 0, 0)', '5px', '6px', '7px', '8px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        ...rule('.boxShadow2', {
            ...vars({
                '--boxShadow2': [
                    ['rgb(0, 255, 0)', '6px', '7px', '8px', '9px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        ...rule('.boxShadow3', {
            ...vars({
                '--boxShadow3': [
                    ['rgb(0, 0, 255)', '7px', '8px', '9px', '1px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        
        ...boxShadowFeatureRule(),
        boxShadow,
    });
};

const boxShadowMultipleCustomStyle = () => {
    const {
        boxShadowFeatureRule,
        boxShadowFeatureVars: { boxShadow },
    } = usesBoxShadowFeature({
        boxShadow: [
            ['rgb(11, 22, 33)', '11px', '22px', '33px', '44px'],
            ['rgb(22, 33, 44)', '22px', '33px', '44px', '55px'],
            ['rgb(33, 44, 55)', '33px', '44px', '55px', '66px'],
        ],
    });
    
    
    return style({
        ...rule('.boxShadow1', {
            ...vars({
                '--boxShadow1': [
                    ['rgb(255, 0, 0)', '5px', '6px', '7px', '8px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        ...rule('.boxShadow2', {
            ...vars({
                '--boxShadow2': [
                    ['rgb(0, 255, 0)', '6px', '7px', '8px', '9px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        ...rule('.boxShadow3', {
            ...vars({
                '--boxShadow3': [
                    ['rgb(0, 0, 255)', '7px', '8px', '9px', '1px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        
        ...boxShadowFeatureRule(),
        boxShadow,
    });
};

const boxShadowMultipleImportantCustomStyle = () => {
    const {
        boxShadowFeatureRule,
        boxShadowFeatureVars: { boxShadow },
    } = usesBoxShadowFeature({
        boxShadow: [
            ['rgb(44, 55, 66)', '44px', '55px', '66px', '77px'],
            ['rgb(55, 66, 77)', '55px', '66px', '77px', '88px'],
            ['rgb(66, 77, 88)', '66px', '77px', '88px', '99px'],
            '!important',
        ],
    });
    
    
    return style({
        ...rule('.boxShadow1', {
            ...vars({
                '--boxShadow1': [
                    ['rgb(255, 0, 0)', '5px', '6px', '7px', '8px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        ...rule('.boxShadow2', {
            ...vars({
                '--boxShadow2': [
                    ['rgb(0, 255, 0)', '6px', '7px', '8px', '9px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        ...rule('.boxShadow3', {
            ...vars({
                '--boxShadow3': [
                    ['rgb(0, 0, 255)', '7px', '8px', '9px', '1px'],
                ] as CssKnownProps['boxShadow']
            }),
        }),
        
        ...boxShadowFeatureRule(),
        boxShadow,
    });
};

export default [
    scope('boxShadowNoCustomStyle', boxShadowNoCustomStyle),
    scope('boxShadowSimpleCustomStyle', boxShadowSimpleCustomStyle),
    scope('boxShadowSingleCustomStyle', boxShadowSingleCustomStyle),
    scope('boxShadowSingleImportantCustomStyle', boxShadowSingleImportantCustomStyle),
    scope('boxShadowMultipleCustomStyle', boxShadowMultipleCustomStyle),
    scope('boxShadowMultipleImportantCustomStyle', boxShadowMultipleImportantCustomStyle),
];
