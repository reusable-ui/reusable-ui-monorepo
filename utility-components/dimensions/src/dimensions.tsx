// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useEffect,
    useMemo,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssCustomName,
    CssCustomSimpleRef,
    CssStyle,
    CssSelector,
    
    
    
    // writes css in javascript:
    rule,
    atGlobal,
    vars,
    styleSheet,
    iif,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // react helper hooks:
    useIsomorphicLayoutEffect,
    useEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// other libs:
import {
    Subject,
}                           from 'rxjs'



// defaults:
const _defaultElementResizeOptions : ResizeObserverOptions = { box: 'border-box'  }
const _defaultWindowResizeOptions  : ResizeObserverOptions = { box: 'content-box' }



// utilities:
const isRef      = <TElement extends Element = HTMLElement>(elementRef: TElement|React.RefObject<TElement>|null): elementRef is React.RefObject<TElement> => {
    return (
        !!elementRef
        &&
        ('current' in elementRef)
    );
};
const getElement = <TElement extends Element = HTMLElement>(elementRef: TElement|React.RefObject<TElement>|null): TElement|null => {
    return isRef(elementRef) ? elementRef.current : elementRef;
};



// hooks:
export type ElementResizeCallback<TElement extends Element = HTMLElement> = (size: ResizeObserverSize, element: TElement) => void
export const useElementResizeObserver = <TElement extends Element = HTMLElement>(elementRef: TElement|React.RefObject<TElement>|null, elementResizeCallback: ElementResizeCallback<TElement>, options = _defaultElementResizeOptions) => {
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
                        elementResizeCallback(entry.contentBoxSize[0], element);
                    };
                case 'border-box':
                    return ([entry]: ResizeObserverEntry[]) => {
                        elementResizeCallback(entry.borderBoxSize[0], element);
                    };
                case 'device-pixel-content-box':
                    return ([entry]: ResizeObserverEntry[]) => {
                        elementResizeCallback(entry.devicePixelContentBoxSize[0], element);
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
export const useWindowResizeObserver = (windowResizeCallback: WindowResizeCallback, options = _defaultWindowResizeOptions) => {
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



const useResizeHandler = (liveStyleSheet: Subject<CssStyle|null>, options: CssSizeOptions) => {
    // dom effects:
    const {
        selector = ':root',
        varInlineSize,
        varBlockSize,
    } = options;
    return useEvent((size: ResizeObserverSize) => {
        // update the `liveStyleSheet`:
        liveStyleSheet.next({
            ...atGlobal({
                ...rule(selector, {
                    ...iif(!!varInlineSize, vars({
                        [varInlineSize ?? ''] : `${size.inlineSize}px`,
                    })),
                    ...iif(!!varBlockSize, vars({
                        [varBlockSize  ?? ''] : `${size.blockSize }px`,
                    })),
                }),
            }),
        });
    });
};



type ReusableLiveStyleSheet = [boolean, Subject<CssStyle|null>];
const reusableLiveStyleSheets : ReusableLiveStyleSheet[] = [];
const allocateLiveStyleSheet = (): Subject<CssStyle|null> => {
    const reusableLiveStyleSheet = reusableLiveStyleSheets.find(([inUse]) => !inUse);
    if (reusableLiveStyleSheet) { // found => re-use it
        reusableLiveStyleSheet[0] = true; // mark as in_use
        return reusableLiveStyleSheet[1]; // return the liveStyleSheet
    } // if
    
    
    
    // create a new liveStyleSheet:
    const newLiveStyleSheet = new Subject<CssStyle|null>();
    styleSheet(newLiveStyleSheet, { ssr: false });
    reusableLiveStyleSheets.push([
        true,             // mark as in_use
        newLiveStyleSheet // the new liveStyleSheet
    ]);
    return newLiveStyleSheet;
};
const releaseLiveStyleSheet = (liveStyleSheet: Subject<CssStyle|null>): void => {
    for (let index = 0; index < reusableLiveStyleSheets.length; index++) {
        if (reusableLiveStyleSheets[index][1] === liveStyleSheet) { // equal by reference
            reusableLiveStyleSheets[index][0] = false; // mark as free
            liveStyleSheet.next(null); // deactivate generated styleSheet
            return; // stop the search
        } // if
    } // for
};

export interface CssSizeOptions extends ResizeObserverOptions {
    selector      ?: CssSelector
    varInlineSize ?: CssCustomName|CssCustomSimpleRef
    varBlockSize  ?: CssCustomName|CssCustomSimpleRef
}
export const useElementCssSize = <TElement extends Element = HTMLElement>(elementRef: TElement|React.RefObject<TElement>|null, options: CssSizeOptions) => {
    // cssfn:
    const liveStyleSheet = useMemo(allocateLiveStyleSheet, []);
    
    
    
    // dom effects:
    const handleElementResize = useResizeHandler(liveStyleSheet, options);
    useElementResizeObserver(elementRef, handleElementResize);
    
    
    
    useEffect(() => {
        // cleanups:
        return () => {
            // deactivate the `liveStyleSheet`:
            releaseLiveStyleSheet(liveStyleSheet);
        };
    }, []); // runs once at startup
};
export const useWindowCssSize  = (options: CssSizeOptions) => {
    // cssfn:
    const liveStyleSheet = useMemo(allocateLiveStyleSheet, []);
    
    
    
    // dom effects:
    const handleWindowResize = useResizeHandler(liveStyleSheet, options);
    useWindowResizeObserver(handleWindowResize);
    
    
    
    useEffect(() => {
        // cleanups:
        return () => {
            // deactivate the `liveStyleSheet`:
            releaseLiveStyleSheet(liveStyleSheet);
        };
    }, []); // runs once at startup
};



// react components:
export interface UseElementCssSizeProps<TElement extends Element = HTMLElement> extends CssSizeOptions
{
    elementRef: TElement|React.RefObject<TElement>|null
}
export const UseElementCssSize = <TElement extends Element = HTMLElement>(props: UseElementCssSizeProps<TElement>): JSX.Element|null => {
    // hooks:
    useElementCssSize(props.elementRef, props);
    
    
    
    // jsx:
    return null;
};

export interface UseWindowCssSizeProps extends CssSizeOptions
{
}
export const UseWindowCssSize = (props: UseWindowCssSizeProps): JSX.Element|null => {
    // hooks:
    useWindowCssSize(props);
    
    
    
    // jsx:
    return null;
};