// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    rule,
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
import {
    // configs:
    borders,
    borderRadiuses,
}                           from '@reusable-ui/borders' // a border (stroke) management system

// internals:
import {
    // configs:
    typos,
}                           from './typos.js'



//#region configs
export const [codes, codeValues, cssCodeConfig] = cssConfig(() => {
    return {
        // backgrounds:
        backg             : 'none'                    as CssKnownProps['background'],
        
        
        
        // foregrounds:
        foreg             : colors.pink               as CssKnownProps['foreground'],
        
        
        
        // borders:
        border            : borders.none              as CssKnownProps['border'      ],
        borderRadius      : borderRadiuses.none       as CssKnownProps['borderRadius'],
        
        
        
        // spacings:
        paddingInline     : '0em'                     as CssKnownProps['paddingInline'],
        paddingBlock      : '0em'                     as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        fontSize          : [[
            'calc((', typos.fontSizeSm, '+', typos.fontSizeMd, ')/2)'
        ]]                                            as CssKnownProps['fontSize'      ],
        fontFamily        : typos.fontFamilyMonospace as CssKnownProps['fontFamily'    ],
        fontWeight        : typos.fontWeightNormal    as CssKnownProps['fontWeight'    ],
        fontStyle         : 'normal'                  as CssKnownProps['fontStyle'     ],
        textDecoration    : 'none'                    as CssKnownProps['textDecoration'],
        lineHeight        : 'inherit'                 as CssKnownProps['lineHeight'    ],
        overflowWrap      : 'inherit'                 as CssKnownProps['overflowWrap'  ],
    };
}, { prefix: 'code' });
export { codes as default }
//#endregion configs



//#region style sheets
styleSheets(() => ([
    globalScope({
        ...rule(['code', '.code', 'var', '.var', 'samp', '.samp'], {
            // layouts:
            display : 'inline',
            
            
            
            // customize:
            ...usesCssProps(codes),
        }),
    }),
]), { id: 'h42u1er4ya' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
//#endregion style sheets
