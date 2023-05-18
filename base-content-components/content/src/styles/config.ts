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
    const bases = {
        // animations:
        transition      : basics.transition     as CssKnownProps['transition'   ],
        
        mediaTransition : basics.transition     as CssKnownProps['transition'   ],
        
        
        
        // spacings:
        paddingInlineSm : spacers.sm            as CssKnownProps['paddingInline'], // override to <Basic>
        paddingBlockSm  : spacers.sm            as CssKnownProps['paddingBlock' ], // override to <Basic>
        paddingInlineMd : spacers.md            as CssKnownProps['paddingInline'], // override to <Basic>
        paddingBlockMd  : spacers.md            as CssKnownProps['paddingBlock' ], // override to <Basic>
        paddingInlineLg : spacers.lg            as CssKnownProps['paddingInline'], // override to <Basic>
        paddingBlockLg  : spacers.lg            as CssKnownProps['paddingBlock' ], // override to <Basic>
        
        linkSpacing     : spacers.sm            as CssKnownProps['gapInline'    ],
    };
    
    
    
    const defaults = {
        // spacings:
        paddingInline   : bases.paddingInlineMd as CssKnownProps['paddingInline'], // override to <Basic>
        paddingBlock    : bases.paddingBlockMd  as CssKnownProps['paddingBlock' ], // override to <Basic>
    };
    
    
    
    return {
        ...bases,
        ...defaults,
    };
}, { prefix: 'ctn' });
