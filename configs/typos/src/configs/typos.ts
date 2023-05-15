// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // writes css in javascript

// reusable-ui configs:
import {
    // configs:
    colors,
}                           from '@reusable-ui/colors'  // a color management system



// configs:
export const [typos, typoValues, cssTypoConfig] = cssConfig(() => {
    const bases = {
        // backgrounds:
        /**
         * The default is a solid color of `colors.backg`.  
         * It can be an image or gradient with the average color of `colors.backg`.
         */
        backg                : colors.backg                                     as CssKnownProps['background'    ],
        
        
        
        // foregrounds:
        foreg                : colors.foreg                                     as CssKnownProps['foreground'    ],
        
        
        
        // typos:
        fontSizeMd           : '1rem'                                           as CssKnownProps['fontSize'      ],
        
        fontFamilySansSerief : [
            'system-ui',
            '-apple-system',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            '"Noto Sans"',
            '"Liberation Sans"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
        ]                                                                       as CssKnownProps['fontFamily'    ],
        fontFamilyMonospace  : [
            'SFMono-Regular',
            'Menlo',
            'Monaco',
            'Consolas',
            '"Liberation Mono"',
            '"Courier New"',
            'monospace',
        ]                                                                       as CssKnownProps['fontFamily'    ],
        
        fontWeightLighter    : 'lighter'                                        as CssKnownProps['fontWeight'    ],
        fontWeightLight      : 300                                              as CssKnownProps['fontWeight'    ],
        fontWeightNormal     : 400                                              as CssKnownProps['fontWeight'    ],
        fontWeightSemibold   : 600                                              as CssKnownProps['fontWeight'    ],
        fontWeightBold       : 700                                              as CssKnownProps['fontWeight'    ],
        fontWeightBolder     : 'bolder'                                         as CssKnownProps['fontWeight'    ],
        
        fontStyle            : 'normal'                                         as CssKnownProps['fontStyle'     ],
        textDecoration       : 'none'                                           as CssKnownProps['textDecoration'],
        
        lineHeightSm         : 1.25                                             as CssKnownProps['lineHeight'    ],
        lineHeightMd         : 1.50                                             as CssKnownProps['lineHeight'    ],
        lineHeightLg         : 2.00                                             as CssKnownProps['lineHeight'    ],
        
        overflowWrap         : 'break-word'                                     as CssKnownProps['overflowWrap'  ],
    };
    
    
    
    const subs = {
        // typos:
        fontSizeXs           : [['calc(', bases.fontSizeMd, '*', 0.50  , ')']]  as CssKnownProps['fontSize'      ],
        fontSizeSm           : [['calc(', bases.fontSizeMd, '*', 0.75  , ')']]  as CssKnownProps['fontSize'      ],
        
        fontSizeLg           : [['calc(', bases.fontSizeMd, '*', 1.25  , ')']]  as CssKnownProps['fontSize'      ],
        fontSizeXl           : [['calc(', bases.fontSizeMd, '*', 1.50  , ')']]  as CssKnownProps['fontSize'      ],
        fontSizeXxl          : [['calc(', bases.fontSizeMd, '*', 1.75  , ')']]  as CssKnownProps['fontSize'      ],
        fontSizeXxxl         : [['calc(', bases.fontSizeMd, '*', 2.00  , ')']]  as CssKnownProps['fontSize'      ],
    };
    
    
    
    const defaults = {
        // typos:
        fontSize             : bases.fontSizeMd                                 as CssKnownProps['fontSize'      ],
        
        fontFamily           : bases.fontFamilySansSerief                       as CssKnownProps['fontFamily'    ],
        
        fontWeight           : bases.fontWeightNormal                           as CssKnownProps['fontWeight'    ],
        
        lineHeight           : bases.lineHeightMd                               as CssKnownProps['lineHeight'    ],
    };
    
    
    
    return {
        ...bases,
        ...subs,
        ...defaults,
    };
}, { prefix: '' });
export { typos as default }
