// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript



// configs:
export const [busies, busyValues, cssBusyConfig] = cssConfig(() => {
    const bases = {
        // typos:
        fontSizeMd : '1em'                                          as CssKnownProps['fontSize'],
    };
    
    
    
    const subs = {
        // typos:
        fontSizeSm : [['calc(', bases.fontSizeMd, '/', 1.25, ')']]  as CssKnownProps['fontSize'],
        fontSizeLg : [['calc(', bases.fontSizeMd, '*', 1.25, ')']]  as CssKnownProps['fontSize'],
    };
    
    
    
    const defaults = {
        // typos:
        fontSize   : bases.fontSizeMd                               as CssKnownProps['fontSize'],
    };
    
    
    
    return {
        ...bases,
        ...subs,
        ...defaults,
    };
}, { prefix: 'busy' });
