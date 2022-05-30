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



export type WindowResizeCallback = (size: ResizeObserverSize) => void
export const useWindowResizeObserver =   (windowResizeCallback: WindowResizeCallback, options = defaultWindowResizeOptions) => {
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (typeof(window) === 'undefined') return;
        
        
        
        // handlers:
        const handleResize = ((): (() => void) => {
            switch (options.box ?? 'content-box') {
                case 'content-box':
                    return () => {
                        windowResizeCallback({
                            inlineSize : window.innerWidth,
                            blockSize  : window.innerHeight,
                        });
                    };
                case 'border-box':
                    return () => {
                        windowResizeCallback({
                            inlineSize : window.outerWidth,
                            blockSize  : window.outerHeight,
                        });
                    };
                case 'device-pixel-content-box':
                    const scale = window.devicePixelRatio;
                    return () => {
                        windowResizeCallback({
                            inlineSize : window.innerWidth  * scale,
                            blockSize  : window.innerHeight * scale,
                        });
                    };
                default:
                    throw TypeError();
            } // switch
        })();
        
        
        
        // setups:
        window.addEventListener('resize', handleResize);
        handleResize(); // the first trigger similar to `ResizeObserver`
        
        
        
        // cleanups:
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowResizeCallback]);
};
