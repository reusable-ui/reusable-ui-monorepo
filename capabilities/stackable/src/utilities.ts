// react:
import type {
    // react:
    default as React,
}                           from 'react'



// utilities:
export const getViewportOrDefault = (modalViewport: React.RefObject<Element>|Element|null|undefined): Element => {
    return (
        // custom viewport (if was set):
        (
            modalViewport
            ?
            ((Object.getPrototypeOf(modalViewport) === Object.prototype) ? (modalViewport as React.RefObject<Element>)?.current : (modalViewport as Element))
            :
            null
        )
        ??
        // the default viewport is <body>:
        document.body
    );
};
