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



// configs:
export const [modalSides, modalSideValues, cssModalSideConfig] = cssConfig(() => {
    return {
        // spacings:
        cardCaptionGap : spacers.default    as CssKnownProps['gap'],
    };
}, { prefix: 'mdlsde' });
