// cssfn:
import {
    // cssfn css specific types:
    CssRule,
    CssStyleCollection,
    
    
    
    // writes css in javascript:
    rule,
}                           from '@cssfn/core'                  // writes css in javascript



// rules:
export const ifGlobalModal = (styles: CssStyleCollection): CssRule => rule('body>*>&', styles);
