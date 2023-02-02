// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    rule,
    ifFirstChild,
    ifLastChild,
    globalScope,
    styleSheets,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
}                           from '@cssfn/core'          // writes css in javascript

// internals:
import {
    // configs:
    typos,
}                           from './typos.js'



//#region configs
export const [blockquotes, blockquoteValues, cssBlockquoteConfig] = cssConfig(() => {
    return {
        // foregrounds:
        foreg             : 'inherit'        as CssKnownProps['foreground'],
        
        
        
        // spacings:
        marginInlineStart : '0em'            as CssKnownProps['marginInlineStart'],
        marginInlineEnd   : '0em'            as CssKnownProps['marginInlineEnd'  ],
        marginBlockStart  : '1em'            as CssKnownProps['marginBlockStart' ],
        marginBlockEnd    : '1em'            as CssKnownProps['marginBlockEnd'   ],
        
        
        
        // typos:
        fontSize          : typos.fontSizeMd as CssKnownProps['fontSize'      ],
        fontFamily        : 'inherit'        as CssKnownProps['fontFamily'    ],
        fontWeight        : 'inherit'        as CssKnownProps['fontWeight'    ],
        fontStyle         : 'inherit'        as CssKnownProps['fontStyle'     ],
        textDecoration    : 'inherit'        as CssKnownProps['textDecoration'],
        lineHeight        : 'inherit'        as CssKnownProps['lineHeight'    ],
    };
}, { prefix: 'bq' });
export { blockquotes as default }
//#endregion configs



//#region style sheets
styleSheets(() => ([
    globalScope({
        ...rule(['blockquote', '.blockquote'], {
            // layouts:
            display : 'block',
            
            
            
            // spacings:
            ...ifFirstChild({
                marginBlockStart : 0, // kill the top_margin at the first blockquote
            }),
            ...ifLastChild({
                marginBlockEnd   : 0, // kill the bottom_margin at the last blockquote
            }),
            
            
            
            // customize:
            ...usesCssProps(blockquotes),
        }),
    }),
]), { id: '6h0f4cwli6' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
//#endregion style sheets
