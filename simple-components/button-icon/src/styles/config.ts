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

// reusable-ui components:
import {
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component
import {
    // configs:
    buttons,
}                           from '@reusable-ui/button'          // a base component



// configs:
export const [buttonIcons, buttonIconValues, cssButtonIconConfig] = cssConfig(() => {
    const bases = {
        // borders:
        borderRadiusXs    : basics.borderRadiusSm                                           as CssKnownProps['borderRadius' ],
        borderRadiusSm    : basics.borderRadiusSm                                           as CssKnownProps['borderRadius' ],
        borderRadiusMd    : basics.borderRadiusMd                                           as CssKnownProps['borderRadius' ],
        borderRadiusLg    : basics.borderRadiusLg                                           as CssKnownProps['borderRadius' ],
        borderRadiusXl    : basics.borderRadiusLg                                           as CssKnownProps['borderRadius' ],
        
        
        
        // spacings:
        paddingInlineXs   : basics.paddingInlineSm                                          as CssKnownProps['paddingInline'],
        paddingBlockXs    : basics.paddingBlockSm                                           as CssKnownProps['paddingBlock' ],
        paddingInlineSm   : basics.paddingInlineSm                                          as CssKnownProps['paddingInline'],
        paddingBlockSm    : basics.paddingBlockSm                                           as CssKnownProps['paddingBlock' ],
        paddingInlineMd   : basics.paddingInlineMd                                          as CssKnownProps['paddingInline'],
        paddingBlockMd    : basics.paddingBlockMd                                           as CssKnownProps['paddingBlock' ],
        paddingInlineLg   : basics.paddingInlineLg                                          as CssKnownProps['paddingInline'],
        paddingBlockLg    : basics.paddingBlockLg                                           as CssKnownProps['paddingBlock' ],
        paddingInlineXl   : basics.paddingInlineLg                                          as CssKnownProps['paddingInline'],
        paddingBlockXl    : basics.paddingBlockLg                                           as CssKnownProps['paddingBlock' ],
        
        gapInlineXs       : buttons.gapInlineSm                                             as CssKnownProps['gapInline'    ],
        gapBlockXs        : buttons.gapBlockSm                                              as CssKnownProps['gapBlock'     ],
        gapInlineSm       : buttons.gapInlineSm                                             as CssKnownProps['gapInline'    ],
        gapBlockSm        : buttons.gapBlockSm                                              as CssKnownProps['gapBlock'     ],
        gapInlineMd       : buttons.gapInlineMd                                             as CssKnownProps['gapInline'    ],
        gapBlockMd        : buttons.gapBlockMd                                              as CssKnownProps['gapBlock'     ],
        gapInlineLg       : buttons.gapInlineLg                                             as CssKnownProps['gapInline'    ],
        gapBlockLg        : buttons.gapBlockLg                                              as CssKnownProps['gapBlock'     ],
        gapInlineXl       : buttons.gapInlineLg                                             as CssKnownProps['gapInline'    ],
        gapBlockXl        : buttons.gapBlockLg                                              as CssKnownProps['gapBlock'     ],
        
        
        
        // typos:
        fontSizeXs        : typos.fontSizeSm                                                as CssKnownProps['fontSize'     ],
        fontSizeSm        : [['calc((', typos.fontSizeSm, '+', typos.fontSizeMd, ')/2)']]   as CssKnownProps['fontSize'     ],
        fontSizeMd        : typos.fontSizeMd                                                as CssKnownProps['fontSize'     ],
        fontSizeLg        : typos.fontSizeLg                                                as CssKnownProps['fontSize'     ],
        fontSizeXl        : typos.fontSizeXl                                                as CssKnownProps['fontSize'     ],
    };
    
    
    
    const defaults = {
        // borders:
        borderRadius      : bases.borderRadiusMd                                            as CssKnownProps['borderRadius' ],
        
        
        
        // spacings:
        paddingInline     : bases.paddingInlineMd                                           as CssKnownProps['paddingInline'],
        paddingBlock      : bases.paddingBlockMd                                            as CssKnownProps['paddingBlock' ],
        
        gapInline         : bases.gapInlineMd                                               as CssKnownProps['gapInline'    ],
        gapBlock          : bases.gapBlockMd                                                as CssKnownProps['gapBlock'     ],
        
        
        
        // typos:
        fontSize          : bases.fontSizeMd                                                as CssKnownProps['fontSize'     ],
    };
    
    
    
    return {
        ...bases,
        ...defaults,
    };
}, { prefix: 'btni' });
