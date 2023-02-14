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
export const [headings, headingValues, cssHeadingConfig] = cssConfig(() => {
    return {
        // appearances:
        subOpacity        : 0.8       as CssKnownProps['opacity'],
        
        
        
        // foregrounds:
        foreg             : 'inherit' as CssKnownProps['foreground'],
        
        
        
        // spacings:
        marginInlineStart : '0em'     as CssKnownProps['marginInlineStart'],
        marginInlineEnd   : '0em'     as CssKnownProps['marginInlineEnd'  ],
        marginBlockStart  : '0em'     as CssKnownProps['marginBlockStart' ],
        marginBlockEnd    : '0.75em'  as CssKnownProps['marginBlockEnd'   ],
        
        
        
        // typos:
        fontSize          : 'unset'                                     as CssKnownProps['fontSize'      ],
        fontSize1         : [['calc(', 2.25, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'      ],
        fontSize2         : [['calc(', 2.00, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'      ],
        fontSize3         : [['calc(', 1.75, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'      ],
        fontSize4         : [['calc(', 1.50, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'      ],
        fontSize5         : [['calc(', 1.25, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'      ],
        fontSize6         : [['calc(', 1.00, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'      ],
        
        fontFamily        : 'inherit'                                   as CssKnownProps['fontFamily'    ],
        fontWeight        : 500                                         as CssKnownProps['fontWeight'    ],
        fontStyle         : 'inherit'                                   as CssKnownProps['fontStyle'     ],
        textDecoration    : 'inherit'                                   as CssKnownProps['textDecoration'],
        lineHeight        : 1.25                                        as CssKnownProps['lineHeight'    ],
    };
}, { prefix: 'h' });
export { headings as default }
