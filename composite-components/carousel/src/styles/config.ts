// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui components:
import {
    // configs:
    contents,
}                           from '@reusable-ui/content'         // a base component



// configs:
export const [carousels, carouselValues, cssCarouselConfig] = cssConfig(() => {
    return {
        // borders:
        navBtnBorderWidth   : '0px'                     as CssKnownProps['borderWidth' ],
        navBtnBorderRadius  : '0px'                     as CssKnownProps['borderRadius'],
        
        
        
        // spacings:
        paddingInline       : '0px'                     as CssKnownProps['paddingInline'],
        paddingBlock        : '0px'                     as CssKnownProps['paddingBlock' ],
        
        navMarginBlockEnd   : contents.paddingBlock     as CssKnownProps['marginBlockEnd'],
        navMarginBlockEndSm : contents.paddingBlockSm   as CssKnownProps['marginBlockEnd'],
        navMarginBlockEndLg : contents.paddingBlockLg   as CssKnownProps['marginBlockEnd'],
    };
}, { prefix: 'crsl' });
