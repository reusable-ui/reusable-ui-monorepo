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
import {
    // configs:
    paragraphs as pargs,
}                           from './paragraphs.js'



// configs:
export const [leads, leadValues, cssLeadConfig] = cssConfig(() => {
    return {
        // foregrounds:
        foreg             : pargs.foreg             as CssKnownProps['foreground'],
        
        
        
        // spacings:
        marginInlineStart : pargs.marginInlineStart as CssKnownProps['marginInlineStart'],
        marginInlineEnd   : pargs.marginInlineEnd   as CssKnownProps['marginInlineEnd'  ],
        marginBlockStart  : pargs.marginBlockStart  as CssKnownProps['marginBlockStart' ],
        marginBlockEnd    : pargs.marginBlockEnd    as CssKnownProps['marginBlockEnd'   ],
        
        
        
        // typos:
        fontSize          : typos.fontSizeMd        as CssKnownProps['fontSize'      ],
        fontFamily        : pargs.fontFamily        as CssKnownProps['fontFamily'    ],
        fontWeight        : typos.fontWeightLight   as CssKnownProps['fontWeight'    ],
        fontStyle         : pargs.fontStyle         as CssKnownProps['fontStyle'     ],
        textDecoration    : pargs.textDecoration    as CssKnownProps['textDecoration'],
        lineHeight        : pargs.lineHeight        as CssKnownProps['lineHeight'    ],
    };
}, { prefix: 'lead' });
export { leads as default }
