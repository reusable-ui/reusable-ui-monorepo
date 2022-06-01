// react:
import { 
// hooks:
useCallback, useEffect, useMemo, } from 'react';
import { 
// rules:
rule, 
// rule shortcuts:
atGlobal, 
// styles:
vars, 
// style sheets:
styleSheet, 
// utilities:
iif, } from '@cssfn/cssfn';
// reusable-ui:
import { 
// hooks:
useIsomorphicLayoutEffect, } from '@reusable-ui/hooks'; // react helper hooks
// other libs:
import { Subject, } from 'rxjs';
// defaults:
const defaultElementResizeOptions = { box: 'border-box' };
const defaultWindowResizeOptions = { box: 'content-box' };
// utilities:
const isRef = (elementRef) => {
    return (!!elementRef
        &&
            ('current' in elementRef));
};
const getElement = (elementRef) => {
    return isRef(elementRef) ? elementRef.current : elementRef;
};
export const useElementResizeObserver = (elementRef, elementResizeCallback, options = defaultElementResizeOptions) => {
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        const element = getElement(elementRef);
        if (!element)
            return;
        // handlers:
        const handleResize = (() => {
            switch (options.box ?? 'content-box') {
                case 'content-box':
                    return ([entry]) => {
                        elementResizeCallback(element, entry.contentBoxSize[0]);
                    };
                case 'border-box':
                    return ([entry]) => {
                        elementResizeCallback(element, entry.borderBoxSize[0]);
                    };
                case 'device-pixel-content-box':
                    return ([entry]) => {
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
export const useWindowResizeObserver = (windowResizeCallback, options = defaultWindowResizeOptions) => {
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (typeof (window) === 'undefined')
            return;
        // handlers:
        const handleResize = (() => {
            switch (options.box ?? 'content-box') {
                case 'content-box':
                    return () => {
                        windowResizeCallback({
                            inlineSize: window.innerWidth,
                            blockSize: window.innerHeight,
                        });
                    };
                case 'border-box':
                    return () => {
                        windowResizeCallback({
                            inlineSize: window.outerWidth,
                            blockSize: window.outerHeight,
                        });
                    };
                case 'device-pixel-content-box':
                    const scale = window.devicePixelRatio;
                    return () => {
                        windowResizeCallback({
                            inlineSize: window.innerWidth * scale,
                            blockSize: window.innerHeight * scale,
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
const reusableLiveStyleSheets = [];
const allocateLiveStyleSheet = () => {
    const reusableLiveStyleSheet = reusableLiveStyleSheets.find(([inUse]) => !inUse);
    if (reusableLiveStyleSheet) { // found => re-use it
        reusableLiveStyleSheet[0] = true; // mark as in_use
        return reusableLiveStyleSheet[1]; // return the liveStyleSheet
    } // if
    // create a new liveStyleSheet:
    const newLiveStyleSheet = new Subject();
    styleSheet(newLiveStyleSheet);
    reusableLiveStyleSheets.push([
        true,
        newLiveStyleSheet // the new liveStyleSheet
    ]);
    return newLiveStyleSheet;
};
const releaseLiveStyleSheet = (liveStyleSheet) => {
    for (let index = 0; index < reusableLiveStyleSheets.length; index++) {
        if (reusableLiveStyleSheets[index][1] === liveStyleSheet) { // equal by reference
            reusableLiveStyleSheets[index][0] = false; // mark as free
            liveStyleSheet.next(null); // deactivate generated styleSheet
            return; // stop the search
        } // if
    } // for
};
export const useElementCssSize = (elementRef, options) => {
    // cssfn:
    const liveStyleSheet = useMemo(allocateLiveStyleSheet, []);
    // dom effects:
    const { selector = ':root', varInlineSize, varBlockSize, } = options;
    const elementResizeCallback = useCallback((_element, size) => {
        // update the `liveStyleSheet`:
        liveStyleSheet.next({
            ...atGlobal({
                ...rule(selector, {
                    ...iif(!!varInlineSize, vars({
                        [varInlineSize ?? '']: `${size.inlineSize}px`,
                    })),
                    ...iif(!!varBlockSize, vars({
                        [varBlockSize ?? '']: `${size.blockSize}px`,
                    })),
                }),
            }),
        });
    }, [selector, varInlineSize, varBlockSize]); // regenerates the callback if `varInlineSize` and/or `varBlockSize` changed
    useElementResizeObserver(elementRef, elementResizeCallback);
    useEffect(() => {
        // cleanups:
        return () => {
            // deactivate the `liveStyleSheet`:
            releaseLiveStyleSheet(liveStyleSheet);
        };
    }, []); // runs once at startup
};
export const useWindowCssSize = (options) => {
    // cssfn:
    const liveStyleSheet = useMemo(allocateLiveStyleSheet, []);
    // dom effects:
    const { selector = ':root', varInlineSize, varBlockSize, } = options;
    const windowResizeCallback = useCallback((size) => {
        // update the `liveStyleSheet`:
        liveStyleSheet.next({
            ...atGlobal({
                ...rule(selector, {
                    ...iif(!!varInlineSize, vars({
                        [varInlineSize ?? '']: `${size.inlineSize}px`,
                    })),
                    ...iif(!!varBlockSize, vars({
                        [varBlockSize ?? '']: `${size.blockSize}px`,
                    })),
                }),
            }),
        });
    }, [selector, varInlineSize, varBlockSize]); // regenerates the callback if `varInlineSize` and/or `varBlockSize` changed
    useWindowResizeObserver(windowResizeCallback);
    useEffect(() => {
        // cleanups:
        return () => {
            // deactivate the `liveStyleSheet`:
            releaseLiveStyleSheet(liveStyleSheet);
        };
    }, []); // runs once at startup
};
export const UseElementCssSize = (props) => {
    // hooks:
    useElementCssSize(props.elementRef, props);
    // jsx:
    return null;
};
export const UseWindowCssSize = (props) => {
    // hooks:
    useWindowCssSize(props);
    // jsx:
    return null;
};
