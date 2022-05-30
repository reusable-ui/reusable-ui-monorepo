// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui:
import {
    // hooks:
    useIsomorphicLayoutEffect,
}                           from '@reusable-ui/hooks'   // react helper hooks



// defaults:
const defaultElementResizeOptions : ResizeObserverOptions = { box: 'border-box'  };
const defaultWindowResizeOptions  : ResizeObserverOptions = { box: 'content-box' };



// utilities:
const isRef      = <TElement extends Element = Element>(test: TElement|React.RefObject<TElement>|null): test is React.RefObject<TElement> => {
    return (
        !!test
        &&
        ('current' in test)
    );
};
const getElement = <TElement extends Element = Element>(resizingElementRef: TElement|React.RefObject<TElement>|null): TElement|null => {
    return isRef(resizingElementRef) ? resizingElementRef.current : resizingElementRef;
};



export type ResizeObserverCallback<TElement extends Element = Element> = (resizingElement: TElement, size: ResizeObserverSize) => void
export const useResizeObserver =  <TElement extends Element = Element>(resizingElementRef: TElement|React.RefObject<TElement>|null, resizeObserverCallback: ResizeObserverCallback<TElement>, options = defaultElementResizeOptions) => {
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        const resizingElement = getElement(resizingElementRef);
        if (!resizingElement) return;
        
        
        
        // handlers:
        const handleResize = ((): ((entries: ResizeObserverEntry[]) => void) => {
            switch (options.box ?? 'content-box') {
                case 'content-box':
                    return ([entry]: ResizeObserverEntry[]) => {
                        resizeObserverCallback(resizingElement, entry.contentBoxSize[0]);
                    };
                case 'border-box':
                    return ([entry]: ResizeObserverEntry[]) => {
                        resizeObserverCallback(resizingElement, entry.borderBoxSize[0]);
                    };
                case 'device-pixel-content-box':
                    return ([entry]: ResizeObserverEntry[]) => {
                        resizeObserverCallback(resizingElement, entry.devicePixelContentBoxSize[0]);
                    };
                default:
                    throw TypeError();
            } // switch
        })();
        
        
        
        // setups:
        const observer = new ResizeObserver(handleResize);
        observer.observe(resizingElement, options);
        
        
        
        // cleanups:
        return () => {
            observer.disconnect();
        };
    }, [getElement(resizingElementRef), resizeObserverCallback]);
};
