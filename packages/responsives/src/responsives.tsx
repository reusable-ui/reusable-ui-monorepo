// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useRef as _useRef, // avoids eslint check
    useCallback,
    
    
    
    // contexts:
    createContext,
    useContext,
}                           from 'react'

// reusable-ui:
import {
    // utilities:
    setRef,
}                           from '@reusable-ui/utilities'   // react helper hooks



// contexts:

/**
 * Contains responsive props.
 */
export interface Responsive<TFallback> {
    currentFallback : TFallback
}

/**
 * A react context for responsive stuff.
 */
export const ResponsiveContext = createContext<Responsive<any>>(/*defaultValue :*/{
    currentFallback : undefined,
});
ResponsiveContext.displayName  = 'Responsive';



// hooks:
export const useResponsiveCurrentFallback = <TFallback,>() => {
    // contexts:
    const responsiveContext = useContext(ResponsiveContext);
    return responsiveContext.currentFallback as TFallback;
};



// utilities:
const isOverflowable = (element: Element): boolean => {
    const {
        display,
        // overflowX,
        // overflowY,
    } = getComputedStyle(element); // warning: force reflow => major performance bottleneck!
    if (display === 'none') return false; // hidden element => not overflowable
    // if (
    //     (overflowX !== 'visible')
    //     &&
    //     (overflowY !== 'visible')
    // )                       return false; // hidden/scroll/clip/overlay/auto/ => not overflowable
    
    return true; // all checks passed
};

const hasOverflowedDescendant = (element: Element, minLeft: number|null, minTop: number|null, maxRight: number|null, maxBottom: number|null): boolean => {
    const pixelScale = ((typeof(window) !== 'undefined') && window.devicePixelRatio) || 1;
    const children   = element.children;
    for (let index = 0; index < children.length; index++) {
        const child = children[index];
        
        
        
        // skip non-overflowable child:
        if (!isOverflowable(child)) continue;
        
        
        
        // measures child's boundaries:
        let {
            left   : childLeft,
            top    : childTop,
            right  : childRight,
            bottom : childBottom,
        } = child.getBoundingClientRect(); // warning: force reflow => major performance bottleneck!
        // snap fractional css_pixel to nearest integer device_pixel:
        childLeft   = Math.round(childLeft   * pixelScale);
        childTop    = Math.round(childTop    * pixelScale);
        childRight  = Math.round(childRight  * pixelScale);
        childBottom = Math.round(childBottom * pixelScale);
        
        
        
        const {
            marginLeft   : marginLeftStr,
            marginTop    : marginTopStr,
            marginRight  : marginRightStr,
            marginBottom : marginBottomStr,
        } = getComputedStyle(child); // warning: force reflow => major performance bottleneck!
        // snap fractional css_pixel to nearest integer device_pixel:
        const marginLeft     = ((parseFloat(marginLeftStr  ) || 0) * pixelScale);
        const marginTop      = ((parseFloat(marginTopStr   ) || 0) * pixelScale);
        const marginRight    = ((parseFloat(marginRightStr ) || 0) * pixelScale);
        const marginBottom   = ((parseFloat(marginBottomStr) || 0) * pixelScale);
        // add cummulative shifts from ancestor:
        const minLeftShift   = (minLeft   === null) ? null : Math.round(minLeft   + marginLeft  );
        const minTopShift    = (minTop    === null) ? null : Math.round(minTop    + marginTop   );
        const maxRightShift  = (maxRight  === null) ? null : Math.round(maxRight  - marginRight );
        const maxBottomShift = (maxBottom === null) ? null : Math.round(maxBottom - marginBottom);
        
        
        
        // compares child's boundaries vs max boundaries:
        if (
            (
                (minLeftShift !== null)
                &&
                (childLeft  < minLeftShift)    // smaller than minimum => overflowed
            )
            ||
            (
                (minTopShift !== null)
                &&
                (childTop  < minTopShift)      // smaller than minimum => overflowed
            )
            ||
            (
                (maxRightShift !== null)
                &&
                (childRight  > maxRightShift)  // bigger than maximum => overflowed
            )
            ||
            (
                (maxBottomShift !== null)
                &&
                (childBottom > maxBottomShift) // bigger than maximum => overflowed
            )
        ) {
            return true; // found
        } // if
        
        
        
        // nested search
        if (hasOverflowedDescendant(child, minLeftShift, minTopShift, maxRightShift, maxBottomShift)) return true; // found
    } // for
    
    return false; // not found
};

export const isOverflowed = (element: Element): boolean => {
    // ignores non-overflowable child:
    if (!isOverflowable(element)) return false;
    
    
    
    const {
        clientWidth,
        clientHeight,
        scrollWidth,
        scrollHeight,
    } = element; // warning: force reflow => major performance bottleneck!
    if (
        (scrollWidth  > clientWidth ) // horz scrollbar detected
        ||
        (scrollHeight > clientHeight) // vert scrollbar detected
    ) {
        return true;
    } // if
    
    
    
    const pixelScale = ((typeof(window) !== 'undefined') && window.devicePixelRatio) || 1;
    
    
    
    //#region handle padding right & bottom
    const {
        paddingLeft   : paddingLeftStr,
        paddingTop    : paddingTopStr,
        paddingRight  : paddingRightStr,
        paddingBottom : paddingBottomStr,
    } = getComputedStyle(element); // warning: force reflow => major performance bottleneck!
    // snap fractional css_pixel to nearest integer device_pixel:
    const paddingLeft   = ((parseFloat(paddingLeftStr  ) || 0) * pixelScale);
    const paddingTop    = ((parseFloat(paddingTopStr   ) || 0) * pixelScale);
    const paddingRight  = ((parseFloat(paddingRightStr ) || 0) * pixelScale);
    const paddingBottom = ((parseFloat(paddingBottomStr) || 0) * pixelScale);
    
    
    
    const {
        left   : elmLeft,
        top    : elmTop,
        right  : elmRight,
        bottom : elmBottom,
    } = element.getBoundingClientRect(); // warning: force reflow => major performance bottleneck!
    const minLeft   = Math.round((elmLeft   * pixelScale) + paddingLeft  );
    const minTop    = Math.round((elmTop    * pixelScale) + paddingTop   );
    const maxRight  = Math.round((elmRight  * pixelScale) - paddingRight );
    const maxBottom = Math.round((elmBottom * pixelScale) - paddingBottom);
    
    
    
    return hasOverflowedDescendant(element, minLeft, minTop, maxRight, maxBottom);
    //#endregion handle padding right & bottom
};
