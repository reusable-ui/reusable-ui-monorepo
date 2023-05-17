// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript



// configs:
export const [dropdownLists, dropdownListValues, cssDropdownListConfig] = cssConfig(() => {
    const bases = {
        // sizes:
        boxSizing           : 'border-box'              as CssKnownProps['boxSizing'    ],
        maxInlineSizeInline : '20rem'                   as CssKnownProps['maxInlineSize'],
        maxBlockSizeInline  : 'unset'                   as CssKnownProps['maxBlockSize' ],
        maxInlineSizeBlock  : 'unset'                   as CssKnownProps['maxInlineSize'],
        maxBlockSizeBlock   : '20rem'                   as CssKnownProps['maxBlockSize' ],
    };
    
    
    
    const defaults = {
        // sizes:
        maxInlineSize       : bases.maxInlineSizeBlock  as CssKnownProps['maxInlineSize'],
        maxBlockSize        : bases.maxBlockSizeBlock   as CssKnownProps['maxBlockSize' ],
    };
    
    
    
    return {
        ...bases,
        ...defaults,
    };
}, { prefix: 'ddl' });
