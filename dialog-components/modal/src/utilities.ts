// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssRule,
    CssStyleCollection,
    
    
    
    // writes css in javascript:
    rule,
}                           from '@cssfn/core'                  // writes css in javascript



// utilities:
export const getViewportOrDefault = (modalViewport: React.RefObject<Element>|Element|null|undefined): Element => {
    return (
        // custom viewport (if was set):
        (
            modalViewport
            ?
            ((modalViewport.constructor === Object) ? (modalViewport as React.RefObject<Element>)?.current : (modalViewport as Element))
            :
            null
        )
        ??
        // the default viewport is <body>:
        document.body
    );
};



// rules:
export const ifGlobalModal = (styles: CssStyleCollection): CssRule => rule('body>*>&', styles);
