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
    const bases = {
        // spacings:
        paddingInline       : '0px'                     as CssKnownProps['paddingInline' ],
        paddingBlock        : '0px'                     as CssKnownProps['paddingBlock'  ],
        
        
        
        // navs:
        navMarginBlockEndSm : contents.paddingBlockSm   as CssKnownProps['marginBlockEnd'],
        navMarginBlockEndMd : contents.paddingBlockMd   as CssKnownProps['marginBlockEnd'],
        navMarginBlockEndLg : contents.paddingBlockLg   as CssKnownProps['marginBlockEnd'],
        
        
        
        // navBtns:
        navBtnBorderWidth   : '0px'                     as CssKnownProps['borderWidth'   ],
        navBtnBorderRadius  : '0px'                     as CssKnownProps['borderRadius'  ],
    };
    
    
    
    const defaults = {
        // navs:
        navMarginBlockEnd   : bases.navMarginBlockEndMd as CssKnownProps['marginBlockEnd'],
    };
    
    
    
    return {
        ...bases,
        ...defaults,
    };
}, { prefix: 'crsl' });
