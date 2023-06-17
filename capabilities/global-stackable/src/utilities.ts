// react:
import type {
    // react:
    default as React,
}                           from 'react'



// utilities:
export const getViewportOrDefault = (viewport: React.RefObject<Element>|Element|null|undefined): Element => {
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
