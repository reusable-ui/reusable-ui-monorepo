// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
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
    const basics = {
        // spacings:
        paddingInline   : '0.65em'                                          as CssKnownProps['paddingInline'],
        paddingBlock    : '0.35em'                                          as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        whiteSpace      : 'normal'                                          as CssKnownProps['whiteSpace'    ],
        fontSize        : '0.75em'                                          as CssKnownProps['fontSize'      ],
        fontWeight      : typos.fontWeightBold                              as CssKnownProps['fontWeight'    ],
    };
    
    
    
    return {
        ...basics,
        
        
        
        // spacings:
        paddingInlineSm : [['calc(', basics.paddingInline, '/', 1.25, ')']] as CssKnownProps['paddingInline'],
        paddingBlockSm  : [['calc(', basics.paddingBlock , '/', 1.25, ')']] as CssKnownProps['paddingBlock' ],
        paddingInlineLg : [['calc(', basics.paddingInline, '*', 1.25, ')']] as CssKnownProps['paddingInline'],
        paddingBlockLg  : [['calc(', basics.paddingBlock , '*', 1.25, ')']] as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        fontSizeSm      : [['calc(', basics.fontSize     , '/', 1.25, ')']] as CssKnownProps['fontSize'      ],
        fontSizeLg      : [['calc(', basics.fontSize     , '*', 1.25, ')']] as CssKnownProps['fontSize'      ],
    };
}, { prefix: 'bge' });
