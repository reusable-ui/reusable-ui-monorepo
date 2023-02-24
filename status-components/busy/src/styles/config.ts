// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript



// configs:
export const [busies, busyValues, cssBusyConfig] = cssConfig(() => {
    const basics = {
        // typos:
        fontSize   : '1em'                                          as CssKnownProps['fontSize'      ],
    };
    
    
    
    return {
        ...basics,
        
        
        
        // typos:
        fontSizeSm : [['calc(', basics.fontSize, '/', 1.25, ')']]   as CssKnownProps['fontSize'      ],
        fontSizeLg : [['calc(', basics.fontSize, '*', 1.25, ')']]   as CssKnownProps['fontSize'      ],
    };
}, { prefix: 'busy' });
