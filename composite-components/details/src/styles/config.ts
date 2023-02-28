// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui components:
import {
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component



// configs:
export const [details, detailsValues, cssDetailsConfig] = cssConfig(() => {
    return {
        // layouts:
        togglerDisplay   : 'block'                  as CssKnownProps['display'  ],
        togglerTextAlign : 'start'                  as CssKnownProps['textAlign'],
        
        
        
        // borders:
        borderStyle      : basics.borderStyle       as CssKnownProps['borderStyle' ],
        borderWidth      : basics.borderWidth       as CssKnownProps['borderWidth' ],
        borderColor      : basics.borderColor       as CssKnownProps['borderColor' ],
        
        borderRadius     : basics.borderRadius      as CssKnownProps['borderRadius'],
        borderRadiusSm   : basics.borderRadiusSm    as CssKnownProps['borderRadius'],
        borderRadiusLg   : basics.borderRadiusLg    as CssKnownProps['borderRadius'],
    };
}, { prefix: 'dtl' });
