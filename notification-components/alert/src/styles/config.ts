// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a spacer (gap) management system:
    spacers,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// configs:
export const [alerts, alertValues, cssAlertConfig] = cssConfig(() => {
    const bases = {
        // icons:
        iconShapeOutside : 'circle(50%)'            as CssKnownProps['shapeOutside'], // assumes the icon shape is always a circle
        
        iconMarginSm     : spacers.sm               as CssKnownProps['margin'      ],
        iconMarginMd     : spacers.md               as CssKnownProps['margin'      ],
        iconMarginLg     : spacers.lg               as CssKnownProps['margin'      ],
        
        
        
        // controls:
        controlMarginSm  : spacers.sm               as CssKnownProps['margin'      ],
        controlMarginMd  : spacers.md               as CssKnownProps['margin'      ],
        controlMarginLg  : spacers.lg               as CssKnownProps['margin'      ],
    };
    
    
    
    const defaults = {
        // icons:
        iconMargin       : bases.iconMarginMd       as CssKnownProps['margin'      ],
        
        // controls:
        controlMargin    : bases.controlMarginMd    as CssKnownProps['margin'      ],
    };
    
    
    
    return {
        ...bases,
        ...defaults,
    };
}, { prefix: 'alrt' });
