// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// internals:
import {
    // configs:
    typos,
}                           from './typos.js'



// configs:
export const [blockquotes, blockquoteValues, cssBlockquoteConfig] = cssConfig(() => {
    return {
        // backgrounds:
        backdropFilter         : [[
            'contrast(80%)',    // second step: supports for light mode
            'brightness(120%)', // first  step: supports for dark mode
        ]]                                              as CssKnownProps['backdropFilter'        ],
        
        
        
        // foregrounds:
        foreg                  : 'inherit'              as CssKnownProps['foreground'            ],
        
        
        
        // borders:
        borderInlineStartStyle : 'solid'                as CssKnownProps['borderInlineStartStyle'],
        borderInlineStartWidth : '0.25em'               as CssKnownProps['borderInlineStartWidth'],
        
        
        
        // spacings:
        marginInlineStart      : '0em'                  as CssKnownProps['marginInlineStart'     ],
        marginInlineEnd        : '0em'                  as CssKnownProps['marginInlineEnd'       ],
        marginBlockStart       : '1em'                  as CssKnownProps['marginBlockStart'      ],
        marginBlockEnd         : '1em'                  as CssKnownProps['marginBlockEnd'        ],
        
        paddingInlineStart     : '3em'                  as CssKnownProps['paddingInlineStart'    ],
        paddingInlineEnd       : '1em'                  as CssKnownProps['paddingInlineEnd'      ],
        paddingBlockStart      : '1em'                  as CssKnownProps['paddingBlockStart'     ],
        paddingBlockEnd        : '1em'                  as CssKnownProps['paddingBlockEnd'       ],
        
        
        
        // typos:
        fontSize               : typos.fontSizeLg       as CssKnownProps['fontSize'              ],
        fontFamily             : 'inherit'              as CssKnownProps['fontFamily'            ],
        fontWeight             : 'inherit'              as CssKnownProps['fontWeight'            ],
        fontStyle              : 'inherit'              as CssKnownProps['fontStyle'             ],
        textDecoration         : 'inherit'              as CssKnownProps['textDecoration'        ],
        lineHeight             : 'inherit'              as CssKnownProps['lineHeight'            ],
        
        
        
        // quotes:
        quoteInsetInlineStart  : '0.2em'                as CssKnownProps['insetInlineStart'      ],
        quoteInsetBlockStart   : 'calc(0px - 0.1em)'    as CssKnownProps['insetBlockStart'       ],
        
        quoteContent           : '"\\201C"'             as CssKnownProps['content'               ],
        
        quoteFontSize          : '3em'                  as CssKnownProps['fontSize'              ],
        quoteFontFamily        : 'Arial'                as CssKnownProps['fontFamily'            ],
        quoteFontWeight        : 'inherit'              as CssKnownProps['fontWeight'            ],
        quoteFontStyle         : 'inherit'              as CssKnownProps['fontStyle'             ],
        quoteTextDecoration    : 'inherit'              as CssKnownProps['textDecoration'        ],
        quoteLineHeight        : 'inherit'              as CssKnownProps['lineHeight'            ],
    };
}, { prefix: 'bq' });
export { blockquotes as default }
