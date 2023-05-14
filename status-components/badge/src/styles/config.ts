// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    keyframes,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a typography management system:
    typos,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// configs:
export const [badges, badgeValues, cssBadgeConfig] = cssConfig(() => {
    //#region keyframes
    const [keyframesExciteRule, keyframesExcite] = keyframes({
        from  : {
            scale : '100%',
        },
        to    : {
            scale : '200%',
        },
    });
    keyframesExcite.value = 'excite'; // the @keyframes name should contain 'excite' in order to be recognized by `useToggleExcitable`
    //#endregion keyframes
    
    
    
    const bases = {
        // animations:
        ...keyframesExciteRule,
        animExcite      : [
            ['300ms', 'linear', 'both', 'alternate', 2, keyframesExcite],
        ]                                                                       as CssKnownProps['animation'    ],
        
        
        
        // spacings:
        paddingInlineMd : '0.65em'                                              as CssKnownProps['paddingInline'],
        paddingBlockMd  : '0.35em'                                              as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        whiteSpace      : 'normal'                                              as CssKnownProps['whiteSpace'   ],
        fontSizeMd      : '0.75em'                                              as CssKnownProps['fontSize'     ],
        fontWeight      : typos.fontWeightBold                                  as CssKnownProps['fontWeight'   ],
    };
    
    
    
    const subs = {
        // spacings:
        paddingInlineSm : [['calc(', bases.paddingInlineMd, '/', 1.25, ')']]    as CssKnownProps['paddingInline'],
        paddingBlockSm  : [['calc(', bases.paddingBlockMd , '/', 1.25, ')']]    as CssKnownProps['paddingBlock' ],
        paddingInlineLg : [['calc(', bases.paddingInlineMd, '*', 1.25, ')']]    as CssKnownProps['paddingInline'],
        paddingBlockLg  : [['calc(', bases.paddingBlockMd , '*', 1.25, ')']]    as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        fontSizeSm      : [['calc(', bases.fontSizeMd   , '/', 1.25, ')']]      as CssKnownProps['fontSize'     ],
        fontSizeLg      : [['calc(', bases.fontSizeMd   , '*', 1.25, ')']]      as CssKnownProps['fontSize'     ],
    };
    
    
    
    const defaults = {
        // spacings:
        paddingInline   : bases.paddingInlineMd                                 as CssKnownProps['paddingInline'],
        paddingBlock    : bases.paddingBlockMd                                  as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        fontSize        : bases.fontSizeMd                                      as CssKnownProps['fontSize'     ],
    };
    
    
    
    return {
        ...bases,
        ...subs,
        ...defaults,
    };
}, { prefix: 'bge' });
