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



//#region configs
export const [paragraphs, paragraphValues, cssParagraphConfig] = cssConfig(() => {
    return {
        // foregrounds:
        foreg             : 'inherit' as CssKnownProps['foreground'],
        
        
        
        // spacings:
        marginInlineStart : '0em'     as CssKnownProps['marginInlineStart'],
        marginInlineEnd   : '0em'     as CssKnownProps['marginInlineEnd'  ],
        marginBlockStart  : '1em'     as CssKnownProps['marginBlockStart' ],
        marginBlockEnd    : '1em'     as CssKnownProps['marginBlockEnd'   ],
        
        
        
        // typos:
        fontSize          : 'inherit' as CssKnownProps['fontSize'      ],
        fontFamily        : 'inherit' as CssKnownProps['fontFamily'    ],
        fontWeight        : 'inherit' as CssKnownProps['fontWeight'    ],
        fontStyle         : 'inherit' as CssKnownProps['fontStyle'     ],
        textDecoration    : 'inherit' as CssKnownProps['textDecoration'],
        lineHeight        : 'inherit' as CssKnownProps['lineHeight'    ],
    };
}, { prefix: 'p' });
export { paragraphs as default }
//#endregion configs



//#region style sheets
styleSheets(() => ([
    globalScope({
        ...rule(['p', '.p'], {
            ...rule(`:not(:where(${[1,2,3,4,5,6].map((level) => `.display-${level}`).join(', ')}, .lead))`, {
                // layouts:
                display : 'block',
                
                
                
                // spacings:
                ...ifFirstChild({
                    marginBlockStart : 0, // kill the top_margin at the first paragraph
                }),
                ...ifLastChild({
                    marginBlockEnd   : 0, // kill the bottom_margin at the last paragraph
                }),
                
                
                
                // customize:
                ...usesCssProps(paragraphs),
            }, { specificityWeight: 0 }),
        }),
    }),
]), { id: '3jcwr3almp' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
//#endregion style sheets
