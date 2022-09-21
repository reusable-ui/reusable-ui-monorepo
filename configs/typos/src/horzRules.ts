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

// reusable-ui configs:
import {
    // configs:
    borders,
}                           from '@reusable-ui/borders' // a border (stroke) management system
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers' // a spacer (gap) management system



//#region configs
export const [horzRules, horzRuleValues, cssHorzRuleConfig] = cssConfig(() => {
    return {
        // appearances:
        opacity        : 0.25               as CssKnownProps['opacity'],
        
        
        
        // foregrounds:
        foreg          : 'inherit'          as CssKnownProps['foreground'],
        
        
        
        // spacings:
        marginInlineStart : '0em'           as CssKnownProps['marginInlineStart'],
        marginInlineEnd   : '0em'           as CssKnownProps['marginInlineEnd'  ],
        marginBlockStart  : spacers.default as CssKnownProps['marginBlockStart' ],
        marginBlockEnd    : spacers.default as CssKnownProps['marginBlockEnd'   ],
    };
}, { prefix: 'hr' });
export { horzRules as default }
//#endregion configs



//#region style sheets
styleSheets([
    globalScope({
        ...rule('hr', {
            // layouts:
            display               : 'block',
            
            
            
            // borders:
            border                : '0em',
            borderBlockStart      : borders.default,
            borderBlockStartColor : 'currentcolor',
            
            
            
            // customize:
            ...usesCssProps(horzRules),
        }),
    }),
]);
//#endregion style sheets
