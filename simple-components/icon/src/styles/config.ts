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
    basics as basicConfigVars,
}                           from '@reusable-ui/basic'           // a base component



// configs:
export const [icons, iconValues, cssIconConfig] = cssConfig(() => {
    const bases = {
        // color:
        color      : 'currentColor'                                 as CssKnownProps['backgroundColor'],
        altColor   : 'gray'                                         as CssKnownProps['backgroundColor'],
        
        
        
        // sizes:
        sizeMd     : '24px'                                         as CssKnownProps['blockSize'      ],
        
        
        
        // animations:
        transition : basicConfigVars.transition                     as CssKnownProps['transition'     ],
    };
    
    
    
    const subs = {
        // sizes:
        sizeXs     : [['calc(', bases.sizeMd, '*', 0.50  , ')']]    as CssKnownProps['blockSize'      ],
        sizeSm     : [['calc(', bases.sizeMd, '*', 0.75  , ')']]    as CssKnownProps['blockSize'      ],
        
        sizeLg     : [['calc(', bases.sizeMd, '*', 1.50  , ')']]    as CssKnownProps['blockSize'      ],
        sizeXl     : [['calc(', bases.sizeMd, '*', 2.00  , ')']]    as CssKnownProps['blockSize'      ],
        size1em    : '1em'                                          as CssKnownProps['blockSize'      ],
    };
    
    
    
    const defaults = {
        // sizes:
        size       :            bases.sizeMd                        as CssKnownProps['blockSize'      ],
    };
    
    
    
    return {
        ...bases,
        ...subs,
        ...defaults,
    };
}, { prefix: 'ico' });
