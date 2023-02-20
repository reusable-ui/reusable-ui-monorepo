// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                          // writes css in javascript



// configs:
export const [inputs, inputValues, cssInputConfig] = cssConfig(() => {
    return {
        // appearances:
        placeholderOpacity : 0.5    as CssKnownProps['opacity'],
        
        
        
        // backgrounds:
        backgGrad : [
            ['linear-gradient(180deg, rgba(0,0,0, 0.2), rgba(255,255,255, 0.2))', 'border-box'],
        ]                           as CssKnownProps['backgroundImage'],
    };
}, { prefix: 'inp' });
