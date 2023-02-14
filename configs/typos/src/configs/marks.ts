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
import {
    // configs:
    borders,
    borderRadiuses,
}                           from '@reusable-ui/borders' // a border (stroke) management system



// configs:
export const [marks, markValues, cssMarkConfig] = cssConfig(() => {
    return {
        // backgrounds:
        backg             : colors.warningThin as CssKnownProps['background'],
        
        
        
        // foregrounds:
        foreg             : 'inherit'          as CssKnownProps['foreground'],
        
        
        
        // borders:
        border            : borders.default    as CssKnownProps['border'      ],
        borderRadius      : borderRadiuses.sm  as CssKnownProps['borderRadius'],
        
        
        
        // spacings:
        paddingInline     : '0.2em'            as CssKnownProps['paddingInline'],
        paddingBlock      : '0em'              as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        fontSize          : 'inherit'          as CssKnownProps['fontSize'      ],
        fontFamily        : 'inherit'          as CssKnownProps['fontFamily'    ],
        fontWeight        : 'inherit'          as CssKnownProps['fontWeight'    ],
        fontStyle         : 'inherit'          as CssKnownProps['fontStyle'     ],
        textDecoration    : 'inherit'          as CssKnownProps['textDecoration'],
        lineHeight        : 'inherit'          as CssKnownProps['lineHeight'    ],
        overflowWrap      : 'inherit'          as CssKnownProps['overflowWrap'  ],
    };
}, { prefix: 'mrk' });
export { marks as default }
