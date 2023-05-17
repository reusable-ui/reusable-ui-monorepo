// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                          // writes css in javascript

// reusable-ui core:
import {
    // a border (stroke) management system:
    borderRadiuses,
}                           from '@reusable-ui/core'                    // a set of reusable-ui packages which are responsible for building any component



// configs:
export const [ranges, rangeValues, cssRangeConfig] = cssConfig(() => {
    const bases = {
        // sizes:
        minInlineSizeInline   : '8rem'                      as CssKnownProps['minInlineSize'],
        minBlockSizeInline    : 'unset'                     as CssKnownProps['minBlockSize' ],
        minInlineSizeBlock    : 'unset'                     as CssKnownProps['minInlineSize'],
        minBlockSizeBlock     : '8rem'                      as CssKnownProps['minBlockSize' ],
        
        
        
        // accessibilities:
        cursorInline          : 'col-resize'                as CssKnownProps['cursor'       ],
        cursorBlock           : 'row-resize'                as CssKnownProps['cursor'       ],
        
        
        
        // tracks:
        trackInlineSizeInline : 'auto'                      as CssKnownProps['inlineSize'   ],
        trackBlockSizeInline  : '0.4em'                     as CssKnownProps['blockSize'    ],
        trackInlineSizeBlock  : '0.4em'                     as CssKnownProps['inlineSize'   ],
        trackBlockSizeBlock   : 'auto'                      as CssKnownProps['blockSize'    ],
        trackBorderRadius     : borderRadiuses.pill         as CssKnownProps['borderRadius' ],
        trackPaddingInline    : '0em'                       as CssKnownProps['paddingInline'],
        trackPaddingBlock     : '0em'                       as CssKnownProps['paddingBlock' ],
        
        
        // tracklowers:
        tracklowerFilter      : [[
            'brightness(0.9)',
        ]]                                                  as CssKnownProps['filter'       ],
        
        // trackuppers:
        trackupperFilter      : [[
            'brightness(0.85)',
            'contrast(0.5)',
            'saturate(0)',
        ]]                                                  as CssKnownProps['filter'       ],
        
        
        
        // thumbs:
        thumbInlineSize       : '1em'                       as CssKnownProps['inlineSize'   ],
        thumbBlockSize        : '1em'                       as CssKnownProps['blockSize'    ],
        thumbBorderRadius     : borderRadiuses.pill         as CssKnownProps['borderRadius' ],
        thumbPaddingInline    : '0em'                       as CssKnownProps['paddingInline'],
        thumbPaddingBlock     : '0em'                       as CssKnownProps['paddingBlock' ],
    };
    
    
    
    const defaults = {
        // sizes:
        minInlineSize         : bases.minInlineSizeInline   as CssKnownProps['minInlineSize'],
        minBlockSize          : bases.minBlockSizeInline    as CssKnownProps['minBlockSize' ],
        
        
        
        // accessibilities:
        cursor                : bases.cursorInline          as CssKnownProps['cursor'       ],
        
        
        
        // tracks:
        trackInlineSize       : bases.trackInlineSizeInline as CssKnownProps['inlineSize'   ],
        trackBlockSize        : bases.trackBlockSizeInline  as CssKnownProps['blockSize'    ],
    };
    
    
    
    return {
        ...bases,
        ...defaults,
    };
}, { prefix: 'rnge' });
