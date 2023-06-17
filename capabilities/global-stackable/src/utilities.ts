// react:
import type {
    // react:
    default as React,
}                           from 'react'

// reusable-ui utilities:
import {
    // utilities:
    isClientSide,
}                           from '@reusable-ui/client-sides'    // a set of client-side functions



// utilities:
export const getViewportOrDefault = (viewport: React.RefObject<Element>|Element|null|undefined): Element|undefined => {
    if (!isClientSide) return undefined; // server side => always return undefined
    
    
    
    return (
        // custom viewport (if was set):
        (
            viewport
            ?
            ((Object.getPrototypeOf(viewport) === Object.prototype) ? (viewport as React.RefObject<Element>)?.current : (viewport as Element))
            :
            null
        )
        ??
        // the default viewport is <body>:
        document.body
    );
};
