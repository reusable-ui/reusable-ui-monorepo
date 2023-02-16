// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a border (stroke) management system:
    borders as borderStrokes,
    borderRadiuses,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// configs:
export const [containers, containerValues, cssContainerConfig] = cssConfig(() => {
    return {
        // borders:
        borderWidth       : borderStrokes.none   as CssKnownProps['borderWidth'  ], // override to <Basic>
        borderRadius      : borderRadiuses.none  as CssKnownProps['borderRadius' ], // override to <Basic>
        
        
        
        // spacings:
        paddingInline     : '12px'               as CssKnownProps['paddingInline'],
        paddingBlock      :  '9px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineSm   : '24px'               as CssKnownProps['paddingInline'],
        paddingBlockSm    : '18px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineMd   : '36px'               as CssKnownProps['paddingInline'],
        paddingBlockMd    : '27px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineLg   : '48px'               as CssKnownProps['paddingInline'],
        paddingBlockLg    : '36px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineXl   : '60px'               as CssKnownProps['paddingInline'],
        paddingBlockXl    : '45px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineXxl  : '72px'               as CssKnownProps['paddingInline'],
        paddingBlockXxl   : '54px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineXxxl : '84px'               as CssKnownProps['paddingInline'],
        paddingBlockXxxl  : '63px'               as CssKnownProps['paddingBlock' ],
    };
}, { prefix: 'con' });
