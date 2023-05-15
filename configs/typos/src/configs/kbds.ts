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

// internals:
import {
    // configs:
    marks,
}                           from './marks.js'
import {
    // configs:
    codes,
}                           from './codes.js'



// configs:
export const [kbds, kbdValues, cssKbdConfig] = cssConfig(() => {
    return {
        // backgrounds:
        backg             : colors.grayDark         as CssKnownProps['background'    ],
        
        
        
        // foregrounds:
        foreg             : colors.white            as CssKnownProps['foreground'    ],
        
        
        
        // borders:
        border            : marks.border            as CssKnownProps['border'        ],
        borderRadius      : marks.borderRadius      as CssKnownProps['borderRadius'  ],
        
        
        
        // spacings:
        paddingInline     : '0.4em'                 as CssKnownProps['paddingInline' ],
        paddingBlock      : '0.2em'                 as CssKnownProps['paddingBlock'  ],
        
        
        
        // typos:
        fontSize          : codes.fontSize          as CssKnownProps['fontSize'      ],
        fontFamily        : codes.fontFamily        as CssKnownProps['fontFamily'    ],
        fontWeight        : codes.fontWeight        as CssKnownProps['fontWeight'    ],
        fontStyle         : codes.fontStyle         as CssKnownProps['fontStyle'     ],
        textDecoration    : codes.textDecoration    as CssKnownProps['textDecoration'],
        lineHeight        : codes.lineHeight        as CssKnownProps['lineHeight'    ],
        overflowWrap      : codes.overflowWrap      as CssKnownProps['overflowWrap'  ],
    };
}, { prefix: 'kbd' });
export { kbds as default }
