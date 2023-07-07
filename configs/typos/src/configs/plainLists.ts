// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // writes css in javascript



// configs:
export const [plainLists, plainListValues, cssPlainListConfig] = cssConfig(() => {
    return {
        // foregrounds:
        foreg              : 'inherit'  as CssKnownProps['foreground'        ],
        
        
        
        // spacings:
        marginInlineStart  : '0em'      as CssKnownProps['marginInlineStart' ],
        marginInlineEnd    : '0em'      as CssKnownProps['marginInlineEnd'   ],
        marginBlockStart   : '1em'      as CssKnownProps['marginBlockStart'  ],
        marginBlockEnd     : '1em'      as CssKnownProps['marginBlockEnd'    ],
        
        paddingInlineStart : '0em'      as CssKnownProps['paddingInlineStart'],
        paddingInlineEnd   : '0em'      as CssKnownProps['paddingInlineEnd'  ],
        paddingBlockStart  : '0em'      as CssKnownProps['paddingBlockStart' ],
        paddingBlockEnd    : '0em'      as CssKnownProps['paddingBlockEnd'   ],
        
        
        
        // typos:
        fontSize           : 'inherit'  as CssKnownProps['fontSize'          ],
        fontFamily         : 'inherit'  as CssKnownProps['fontFamily'        ],
        fontWeight         : 'inherit'  as CssKnownProps['fontWeight'        ],
        fontStyle          : 'inherit'  as CssKnownProps['fontStyle'         ],
        textDecoration     : 'inherit'  as CssKnownProps['textDecoration'    ],
        lineHeight         : 'inherit'  as CssKnownProps['lineHeight'        ],
        
        
        
        // lists:
        listStylePosition  : 'inside'   as CssKnownProps['listStylePosition' ],
        
        
        
        // ols:
        olListStyleType    : 'decimal'  as CssKnownProps['listStyleType'     ],
        
        
        
        // uls:
        ulListStyleType    : 'disc'     as CssKnownProps['listStyleType'     ],
        
        
        
        // lis:
        liTextAlign        : 'start'    as CssKnownProps['textAlign'         ],
    };
}, { prefix: 'pList' });
export { plainLists as default }
