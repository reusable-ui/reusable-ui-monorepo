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
    spacers,
}                           from '@reusable-ui/spacers' // a spacer (gap) management system



// configs:
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
