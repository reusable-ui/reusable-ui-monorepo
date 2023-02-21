// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    escapeSvg,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript



// configs:
export const [radios, radioValues, cssRadioConfig] = cssConfig(() => {
    return {
        // animations:
        // forked from Bootstrap 5:
        indicator : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='2' fill='#000'/></svg>")}")` as CssKnownProps['maskImage'],
    };
}, { prefix: 'rad' });
