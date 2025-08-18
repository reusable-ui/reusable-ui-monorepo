import { rule, vars, style, scope, type CssKnownProps } from '@cssfn/core'

import { usesAnimationFeature, animationRegistry } from '../dist/index.js'

animationRegistry.registerAnimation('var(--anim1)');
animationRegistry.registerAnimation('var(--anim2)');
animationRegistry.registerAnimation('var(--anim3)');

const animNoCustomStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    
    return style({
        ...rule('.anim1', {
            ...vars({
                '--anim1': [
                    ['300ms', 'ease-out', 'both', 'anim1'],
                ] as CssKnownProps['animation']
            }),
        }),
        ...rule('.anim2', {
            ...vars({
                '--anim2': [
                    ['300ms', 'ease-out', 'both', 'anim2'],
                ] as CssKnownProps['animation']
            }),
        }),
        ...rule('.anim3', {
            ...vars({
                '--anim3': [
                    ['300ms', 'ease-out', 'both', 'anim3'],
                ] as CssKnownProps['animation']
            }),
        }),
        
        ...animationFeatureRule(),
        animation,
    });
};

const animSimpleCustomStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature({
        animation: '300ms ease-out both simple',
    });
    
    
    return style({
        ...rule('.anim1', {
            ...vars({
                '--anim1': [
                    ['300ms', 'ease-out', 'both', 'anim1'],
                ] as CssKnownProps['animation']
            }),
        }),
        ...rule('.anim2', {
            ...vars({
                '--anim2': [
                    ['300ms', 'ease-out', 'both', 'anim2'],
                ] as CssKnownProps['animation']
            }),
        }),
        ...rule('.anim3', {
            ...vars({
                '--anim3': [
                    ['300ms', 'ease-out', 'both', 'anim3'],
                ] as CssKnownProps['animation']
            }),
        }),
        
        ...animationFeatureRule(),
        animation,
    });
};

const animSingleCustomStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature({
        animation: ['300ms', 'ease-out', 'both', 'single'],
    });
    
    
    return style({
        ...rule('.anim1', {
            ...vars({
                '--anim1': [
                    ['300ms', 'ease-out', 'both', 'anim1'],
                ] as CssKnownProps['animation']
            }),
        }),
        ...rule('.anim2', {
            ...vars({
                '--anim2': [
                    ['300ms', 'ease-out', 'both', 'anim2'],
                ] as CssKnownProps['animation']
            }),
        }),
        ...rule('.anim3', {
            ...vars({
                '--anim3': [
                    ['300ms', 'ease-out', 'both', 'anim3'],
                ] as CssKnownProps['animation']
            }),
        }),
        
        ...animationFeatureRule(),
        animation,
    });
};

const animSingleImportantCustomStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature({
        animation: ['300ms', 'ease-out', 'both', 'singleImp', '!important'],
    });
    
    
    return style({
        ...rule('.anim1', {
            ...vars({
                '--anim1': [
                    ['300ms', 'ease-out', 'both', 'anim1'],
                ] as CssKnownProps['animation']
            }),
        }),
        ...rule('.anim2', {
            ...vars({
                '--anim2': [
                    ['300ms', 'ease-out', 'both', 'anim2'],
                ] as CssKnownProps['animation']
            }),
        }),
        ...rule('.anim3', {
            ...vars({
                '--anim3': [
                    ['300ms', 'ease-out', 'both', 'anim3'],
                ] as CssKnownProps['animation']
            }),
        }),
        
        ...animationFeatureRule(),
        animation,
    });
};

const animMultipleCustomStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature({
        animation: [
            ['300ms', 'ease-out', 'both', 'multi1'],
            ['500ms', 'ease-in', 'backwards', 'multi2'],
            ['200ms', 'ease-in-out', 'forwards', 'multi3'],
        ],
    });
    
    
    return style({
        ...rule('.anim1', {
            ...vars({
                '--anim1': [
                    ['300ms', 'ease-out', 'both', 'anim1'],
                ] as CssKnownProps['animation']
            }),
        }),
        ...rule('.anim2', {
            ...vars({
                '--anim2': [
                    ['300ms', 'ease-out', 'both', 'anim2'],
                ] as CssKnownProps['animation']
            }),
        }),
        ...rule('.anim3', {
            ...vars({
                '--anim3': [
                    ['300ms', 'ease-out', 'both', 'anim3'],
                ] as CssKnownProps['animation']
            }),
        }),
        
        ...animationFeatureRule(),
        animation,
    });
};

const animMultipleImportantCustomStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature({
        animation: [
            ['300ms', 'ease-out', 'both', 'multi1Imp'],
            ['500ms', 'ease-in', 'backwards', 'multi2Imp'],
            ['200ms', 'ease-in-out', 'forwards', 'multi3Imp'],
            '!important',
        ],
    });
    
    
    return style({
        ...rule('.anim1', {
            ...vars({
                '--anim1': [
                    ['300ms', 'ease-out', 'both', 'anim1'],
                ] as CssKnownProps['animation']
            }),
        }),
        ...rule('.anim2', {
            ...vars({
                '--anim2': [
                    ['300ms', 'ease-out', 'both', 'anim2'],
                ] as CssKnownProps['animation']
            }),
        }),
        ...rule('.anim3', {
            ...vars({
                '--anim3': [
                    ['300ms', 'ease-out', 'both', 'anim3'],
                ] as CssKnownProps['animation']
            }),
        }),
        
        ...animationFeatureRule(),
        animation,
    });
};

export default [
    scope('animNoCustomStyle', animNoCustomStyle),
    scope('animSimpleCustomStyle', animSimpleCustomStyle),
    scope('animSingleCustomStyle', animSingleCustomStyle),
    scope('animSingleImportantCustomStyle', animSingleImportantCustomStyle),
    scope('animMultipleCustomStyle', animMultipleCustomStyle),
    scope('animMultipleImportantCustomStyle', animMultipleImportantCustomStyle),
];
