// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // writes css in javascript

// internals:
import {
    // configs:
    typos,
}                           from './typos.js'



// configs:
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
