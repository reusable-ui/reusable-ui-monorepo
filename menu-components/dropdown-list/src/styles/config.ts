// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript



// configs:
export const [dropdownLists, dropdownListValues, cssDropdownListConfig] = cssConfig(() => {
    return {
        // sizes:
        boxSizing           : 'border-box'  as CssKnownProps['boxSizing'    ],
        maxInlineSize       : 'unset'       as CssKnownProps['maxInlineSize'],
        maxBlockSize        : 'unset'       as CssKnownProps['maxBlockSize' ],
        maxInlineSizeInline : '20rem'       as CssKnownProps['maxInlineSize'],
        maxBlockSizeInline  : 'unset'       as CssKnownProps['maxBlockSize' ],
        maxInlineSizeBlock  : 'unset'       as CssKnownProps['maxInlineSize'],
        maxBlockSizeBlock   : '20rem'       as CssKnownProps['maxBlockSize' ],
    };
}, { prefix: 'ddl' });
