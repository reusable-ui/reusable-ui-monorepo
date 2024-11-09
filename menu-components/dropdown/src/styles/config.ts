// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript



// configs:
export const [dropdowns, dropdownValues, cssDropdownConfig] = cssConfig(() => {
    return {
        // sizes:
        inlineSize : 'fit-content'  as CssKnownProps['inlineSize'], // in usual floating dropdown layout (regradless the collapsing orientation: 'inline|block'), the width  is usually `fit-content`
        blockSize  : 'fit-content'  as CssKnownProps['blockSize' ], // in usual floating dropdown layout (regradless the collapsing orientation: 'inline|block'), the height is usually `fit-content`
        
        
        
        // borders:
        // dropdownUiBoxShadow : [[0, 0, '10px', 'rgba(0,0,0,0.5)']] as CssKnownProps['boxShadow'], // doesn't work perfectly with borderRadius
        filter     : [
            ['drop-shadow(', 0, 0, '10px', 'rgba(0,0,0,0.5)', ')'],
        ]                           as CssKnownProps['filter'    ], // create a shadow using `drop-shadow`, so that the SHAPE of the shadow follows the SHAPE of the <DropdownUi>
    };
}, { prefix: 'ddwn' });
