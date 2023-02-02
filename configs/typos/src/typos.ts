// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    atRoot,
    globalScope,
    styleSheets,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
}                           from '@cssfn/core'          // writes css in javascript

// reusable-ui configs:
import {
    // configs:
    colors,
}                           from '@reusable-ui/colors'  // a color management system



//#region configs
export const [typos, typoValues, cssTypoConfig] = cssConfig(() => {
    const basics = {
        // backgrounds:
        /**
         * The default is a solid color of `colors.backg`.  
         * It can be an image or gradient with the average color of `colors.backg`.
         */
        backg                : colors.backg as CssKnownProps['background'],
        
        
        
        // foregrounds:
        foreg                : colors.foreg as CssKnownProps['foreground'],
        
        
        
        // typos:
        fontSizeMd           : '1rem'       as CssKnownProps['fontSize'      ],
        
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
        ]                                   as CssKnownProps['fontFamily'    ],
        fontFamilyMonospace  : [
            'SFMono-Regular',
            'Menlo',
            'Monaco',
            'Consolas',
            '"Liberation Mono"',
            '"Courier New"',
            'monospace',
        ]                                   as CssKnownProps['fontFamily'    ],
        
        fontWeightLighter    : 'lighter'    as CssKnownProps['fontWeight'    ],
        fontWeightLight      : 300          as CssKnownProps['fontWeight'    ],
        fontWeightNormal     : 400          as CssKnownProps['fontWeight'    ],
        fontWeightSemibold   : 600          as CssKnownProps['fontWeight'    ],
        fontWeightBold       : 700          as CssKnownProps['fontWeight'    ],
        fontWeightBolder     : 'bolder'     as CssKnownProps['fontWeight'    ],
        
        fontStyle            : 'normal'     as CssKnownProps['fontStyle'     ],
        textDecoration       : 'none'       as CssKnownProps['textDecoration'],
        
        lineHeightSm         : 1.25         as CssKnownProps['lineHeight'    ],
        lineHeightMd         : 1.50         as CssKnownProps['lineHeight'    ],
        lineHeightLg         : 2.00         as CssKnownProps['lineHeight'    ],
        
        overflowWrap         : 'break-word' as CssKnownProps['overflowWrap'  ],
    };
    
    return {
        ...basics,
        
        
        
        // typos:
        fontSizeXs           : [['calc(', basics.fontSizeMd, '*', 0.50  , ')']] as CssKnownProps['fontSize'      ],
        fontSizeSm           : [['calc(', basics.fontSizeMd, '*', 0.75  , ')']] as CssKnownProps['fontSize'      ],
        fontSize             :            basics.fontSizeMd                     as CssKnownProps['fontSize'      ],
        fontSizeLg           : [['calc(', basics.fontSizeMd, '*', 1.25  , ')']] as CssKnownProps['fontSize'      ],
        fontSizeXl           : [['calc(', basics.fontSizeMd, '*', 1.50  , ')']] as CssKnownProps['fontSize'      ],
        fontSizeXxl          : [['calc(', basics.fontSizeMd, '*', 1.75  , ')']] as CssKnownProps['fontSize'      ],
        fontSizeXxxl         : [['calc(', basics.fontSizeMd, '*', 2.00  , ')']] as CssKnownProps['fontSize'      ],
        
        fontFamily           : basics.fontFamilySansSerief                      as CssKnownProps['fontFamily'    ],
        
        fontWeight           : basics.fontWeightNormal                          as CssKnownProps['fontWeight'    ],
        
        lineHeight           : basics.lineHeightMd                              as CssKnownProps['lineHeight'    ],
    };
}, { prefix: '' });
export { typos as default }
//#endregion configs



//#region style sheets
styleSheets(() => ([
    globalScope({
        ...atRoot({
            // customize:
            ...usesCssProps(typos),
        }),
    }),
]), { id: 'wnmkok4wrw' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
//#endregion style sheets
