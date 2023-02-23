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
export const [masonries, masonryValues, cssMasonryConfig] = cssConfig(() => {
    return {
        // sizes:
        itemRaiseRowHeight   : '1px'                as CssKnownProps['blockSize'],
        itemRaiseRowHeightSm : '1px'                as CssKnownProps['blockSize'],
        itemRaiseRowHeightLg : '2px'                as CssKnownProps['blockSize'],
        
        itemMinColumnWidth   : 'calc(5 * 40px)'     as CssKnownProps['columnWidth'],
        itemMinColumnWidthSm : 'calc(3 * 40px)'     as CssKnownProps['columnWidth'],
        itemMinColumnWidthLg : 'calc(8 * 40px)'     as CssKnownProps['columnWidth'],
        
        
        
        // spacings:
        gapInline            : spacers.sm           as CssKnownProps['gapInline'],
        gapInlineSm          : spacers.xs           as CssKnownProps['gapInline'],
        gapInlineLg          : spacers.md           as CssKnownProps['gapInline'],
        gapBlock             : spacers.sm           as CssKnownProps['gapBlock' ],
        gapBlockSm           : spacers.xs           as CssKnownProps['gapBlock' ],
        gapBlockLg           : spacers.md           as CssKnownProps['gapBlock' ],
    };
}, { prefix: 'msry' });
