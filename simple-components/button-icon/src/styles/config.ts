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
    return {
        // borders:
        borderRadius      : basics.borderRadius     as CssKnownProps['borderRadius'],
        borderRadiusXs    : basics.borderRadiusSm   as CssKnownProps['borderRadius'],
        borderRadiusSm    : basics.borderRadiusSm   as CssKnownProps['borderRadius'],
        borderRadiusLg    : basics.borderRadiusLg   as CssKnownProps['borderRadius'],
        borderRadiusXl    : basics.borderRadiusLg   as CssKnownProps['borderRadius'],
        
        
        
        // spacings:
        paddingInline     : basics.paddingInline    as CssKnownProps['paddingInline'],
        paddingBlock      : basics.paddingBlock     as CssKnownProps['paddingBlock' ],
        paddingInlineXs   : basics.paddingInlineSm  as CssKnownProps['paddingInline'],
        paddingBlockXs    : basics.paddingBlockSm   as CssKnownProps['paddingBlock' ],
        paddingInlineSm   : basics.paddingInlineSm  as CssKnownProps['paddingInline'],
        paddingBlockSm    : basics.paddingBlockSm   as CssKnownProps['paddingBlock' ],
        paddingInlineLg   : basics.paddingInlineLg  as CssKnownProps['paddingInline'],
        paddingBlockLg    : basics.paddingBlockLg   as CssKnownProps['paddingBlock' ],
        paddingInlineXl   : basics.paddingInlineLg  as CssKnownProps['paddingInline'],
        paddingBlockXl    : basics.paddingBlockLg   as CssKnownProps['paddingBlock' ],
        
        gapInline         : buttons.gapInline       as CssKnownProps['gapInline'],
        gapBlock          : buttons.gapBlock        as CssKnownProps['gapBlock' ],
        gapInlineXs       : buttons.gapInlineSm     as CssKnownProps['gapInline'],
        gapBlockXs        : buttons.gapBlockSm      as CssKnownProps['gapBlock' ],
        gapInlineSm       : buttons.gapInlineSm     as CssKnownProps['gapInline'],
        gapBlockSm        : buttons.gapBlockSm      as CssKnownProps['gapBlock' ],
        gapInlineLg       : buttons.gapInlineLg     as CssKnownProps['gapInline'],
        gapBlockLg        : buttons.gapBlockLg      as CssKnownProps['gapBlock' ],
        gapInlineXl       : buttons.gapInlineLg     as CssKnownProps['gapInline'],
        gapBlockXl        : buttons.gapBlockLg      as CssKnownProps['gapBlock' ],
        
        
        
        // typos:
        fontSize          : typos.fontSizeMd                                                as CssKnownProps['fontSize'      ],
        fontSizeXs        : typos.fontSizeSm                                                as CssKnownProps['fontSize'      ],
        fontSizeSm        : [['calc((', typos.fontSizeSm, '+', typos.fontSizeMd, ')/2)']]   as CssKnownProps['fontSize'      ],
        fontSizeLg        : typos.fontSizeLg                                                as CssKnownProps['fontSize'      ],
        fontSizeXl        : typos.fontSizeXl                                                as CssKnownProps['fontSize'      ],
    };
}, { prefix: 'btni' });
