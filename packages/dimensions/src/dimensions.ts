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
const isRef      = <TElement extends Element = Element>(elementRef: TElement|React.RefObject<TElement>|null): elementRef is React.RefObject<TElement> => {
    return (
        !!elementRef
        &&
        ('current' in elementRef)
    );
};
const getElement = <TElement extends Element = Element>(elementRef: TElement|React.RefObject<TElement>|null): TElement|null => {
    return isRef(elementRef) ? elementRef.current : elementRef;
};



export type ElementResizeCallback<TElement extends Element = Element> = (element: TElement, size: ResizeObserverSize) => void
export const useElementResizeObserver = <TElement extends Element = Element>(elementRef: TElement|React.RefObject<TElement>|null, elementResizeCallback: ElementResizeCallback<TElement>, options = defaultElementResizeOptions) => {
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        const element = getElement(elementRef);
        if (!element) return;
        
        
        
        // handlers:
        const handleResize = ((): ((entries: ResizeObserverEntry[]) => void) => {
            switch (options.box ?? 'content-box') {
                case 'content-box':
                    return ([entry]: ResizeObserverEntry[]) => {
                        elementResizeCallback(element, entry.contentBoxSize[0]);
                    };
                case 'border-box':
                    return ([entry]: ResizeObserverEntry[]) => {
                        elementResizeCallback(element, entry.borderBoxSize[0]);
                    };
                case 'device-pixel-content-box':
                    return ([entry]: ResizeObserverEntry[]) => {
                        elementResizeCallback(element, entry.devicePixelContentBoxSize[0]);
                    };
                default:
                    throw TypeError();
            } // switch
        })();
        
        
        
        // setups:
        const observer = new ResizeObserver(handleResize);
        observer.observe(element, options);
        
        
        
        // cleanups:
        return () => {
            observer.disconnect();
        };
    }, [getElement(elementRef), elementResizeCallback]);
};



export type WindowResizeCallback = (size: ResizeObserverSize) => void
export const useWindowResizeObserver = (windowResizeCallback: WindowResizeCallback, options = defaultWindowResizeOptions) => {
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
