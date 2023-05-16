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
export const [cards, cardValues, cssCardConfig] = cssConfig(() => {
    const bases = {
        // borders:
        borderStyle    : basics.borderStyle     as CssKnownProps['borderStyle' ],
        borderWidth    : basics.borderWidth     as CssKnownProps['borderWidth' ],
        borderColor    : basics.borderColor     as CssKnownProps['borderColor' ],
        
        borderRadiusSm : basics.borderRadiusSm  as CssKnownProps['borderRadius'],
        borderRadiusMd : basics.borderRadiusMd  as CssKnownProps['borderRadius'],
        borderRadiusLg : basics.borderRadiusLg  as CssKnownProps['borderRadius'],
        
        
        
        // animations:
        transition     : basics.transition      as CssKnownProps['transition'  ],
        itemTransition : basics.transition      as CssKnownProps['transition'  ],
        
        
        
        // sizes:
        boxSizing      : 'border-box'           as CssKnownProps['boxSizing'   ], // the final size is including borders & paddings
        blockSize      : '100%'                 as CssKnownProps['blockSize'   ], // fills the entire parent's height if the parent has a specific height, otherwise no effect
        
        
        
        // typos:
        overflowWrap   : 'break-word'           as CssKnownProps['overflowWrap'], // prevents a long word from breaking Card layout
        
        
        
        // captions:
        captionFilter  : [[
            'brightness(70%)',
            'contrast(140%)',
        ]]                                      as CssKnownProps['filter'      ],
    };
    
    
    
    const defaults = {
        // borders:
        borderRadius   : bases.borderRadiusMd   as CssKnownProps['borderRadius'],
    };
    
    
    
    return {
        ...bases,
        ...defaults,
    };
}, { prefix: 'card' });
