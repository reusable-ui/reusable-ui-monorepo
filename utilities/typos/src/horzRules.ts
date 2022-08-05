// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'     // cssfn css specific types
import {
    // rules:
    rule,
    
    
    
    // scopes:
    globalScope,
    
    
    
    // style sheets:
    styleSheets,
}                           from '@cssfn/cssfn'         // writes css in javascript
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'    // reads/writes css variables configuration

// reusable-ui:
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
