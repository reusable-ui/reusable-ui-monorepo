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
    const basics = {
        // color:
        color      : 'currentColor'                                 as CssKnownProps['backgroundColor'],
        altColor   : 'gray'                                         as CssKnownProps['backgroundColor'],
        
        
        // sizes:
        sizeMd     : '24px'                                         as CssKnownProps['blockSize'],
    };
    
    
    
    return {
        ...basics,
        
        
        
        // sizes:
        size       :            basics.sizeMd                       as CssKnownProps['blockSize'],
        sizeXs     : [['calc(', basics.sizeMd, '*', 0.50  , ')']]   as CssKnownProps['blockSize'],
        sizeSm     : [['calc(', basics.sizeMd, '*', 0.75  , ')']]   as CssKnownProps['blockSize'],
        sizeLg     : [['calc(', basics.sizeMd, '*', 1.50  , ')']]   as CssKnownProps['blockSize'],
        sizeXl     : [['calc(', basics.sizeMd, '*', 2.00  , ')']]   as CssKnownProps['blockSize'],
        size1em    : '1em'                                          as CssKnownProps['blockSize'],
        
        
        
        // animations:
        transition : basicConfigVars.transition                     as CssKnownProps['transition'],
    };
}, { prefix: 'ico' });
