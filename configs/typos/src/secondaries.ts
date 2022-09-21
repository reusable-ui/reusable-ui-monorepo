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



//#region configs
export const [secondaries, secondaryValues, cssSecondaryConfig] = cssConfig(() => {
    return {
        // appearances:
        opacity        : 0.65      as CssKnownProps['opacity'],
        
        
        
        // foregrounds:
        foreg          : 'inherit' as CssKnownProps['foreground'],
        
        
        
        // typos:
        fontSize       : 'inherit' as CssKnownProps['fontSize'      ],
        fontFamily     : 'inherit' as CssKnownProps['fontFamily'    ],
        fontWeight     : 'inherit' as CssKnownProps['fontWeight'    ],
        fontStyle      : 'inherit' as CssKnownProps['fontStyle'     ],
        textDecoration : 'inherit' as CssKnownProps['textDecoration'],
        lineHeight     : 'inherit' as CssKnownProps['lineHeight'    ],
    };
}, { prefix: 'sec' });
export { secondaries as default }
//#endregion configs



//#region style sheets
styleSheets([
    globalScope({
        ...rule(['small', '.txt-sec'], {
            // customize:
            ...usesCssProps(secondaries),
        }),
    }),
]);
//#endregion style sheets
