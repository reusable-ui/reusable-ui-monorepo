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
export const [alerts, alertValues, cssAlertConfig] = cssConfig(() => {
    return {
        // spacings:
        gapInline   : spacers.md    as CssKnownProps['gapInline'],
        gapBlock    : spacers.md    as CssKnownProps['gapBlock' ],
        gapInlineSm : spacers.sm    as CssKnownProps['gapInline'],
        gapBlockSm  : spacers.sm    as CssKnownProps['gapBlock' ],
        gapInlineLg : spacers.lg    as CssKnownProps['gapInline'],
        gapBlockLg  : spacers.lg    as CssKnownProps['gapBlock' ],
    };
}, { prefix: 'alrt' });
