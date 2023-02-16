// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a spacer (gap) management system:
    spacers,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component



// configs:
export const [contents, contentValues, cssContentConfig] = cssConfig(() => {
    return {
        // animations:
        transition      : basics.transition as CssKnownProps['transition'],
        
        mediaTransition : basics.transition as CssKnownProps['transition'],
        
        
        
        // spacings:
        paddingInline   : spacers.default   as CssKnownProps['paddingInline'], // override to <Basic>
        paddingBlock    : spacers.default   as CssKnownProps['paddingBlock' ], // override to <Basic>
        paddingInlineSm : spacers.sm        as CssKnownProps['paddingInline'], // override to <Basic>
        paddingBlockSm  : spacers.sm        as CssKnownProps['paddingBlock' ], // override to <Basic>
        paddingInlineLg : spacers.lg        as CssKnownProps['paddingInline'], // override to <Basic>
        paddingBlockLg  : spacers.lg        as CssKnownProps['paddingBlock' ], // override to <Basic>
        
        linkSpacing     : spacers.sm        as CssKnownProps['gapInline'],
    };
}, { prefix: 'ct' });
