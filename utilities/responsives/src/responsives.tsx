// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useCallback,
    useEffect,
    
    
    
    // utilities:
    startTransition,
    
    
    
    // contexts:
    createContext,
    useContext,
}                           from 'react'

// reusable-ui utilities:
import {
    // utilities:
    isReusableUiComponent,
}                           from '@reusable-ui/utilities'       // common utility functions
import {
    // hooks:
    useIsomorphicLayoutEffect,
    useTriggerRender,
    useEvent,
    useMergeRefs,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui components:
import type {
    // react components:
    GenericProps,
}                           from '@reusable-ui/generic'         // a generic component



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



// hooks:
export interface ClientAreaResizeObserverOptions {
    // responsives:
    horzResponsive? : boolean
    vertResponsive? : boolean
}
export const useClientAreaResizeObserver = (resizingElementRefs: Map<React.Key, Element|null>, clientAreaResizeCallback: () => void, options: ClientAreaResizeObserverOptions = {}) => {
    // options:
    const {
        horzResponsive = true,
        vertResponsive = false,
    } = options;
    
    
    
    // states:
    const [prevSizes] = useState<Map<Element, ResizeObserverSize>>(() => new Map()); // remember prev element's sizes
    
    
    
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        // setups:
        const handleResize = (entries: ResizeObserverEntry[]) => {
            let resized = false;
            for (const entry of entries) {
                const currentSize = entry.contentBoxSize[0];
                
                
                
                const prevSize = prevSizes.get(entry.target);
                if (prevSize && !resized) { // if has prev size record => now is the resize event
                         if (horzResponsive && (prevSize.inlineSize !== currentSize.inlineSize)) { // resized at horz axis
                        resized = true; // mark has resized
                    } // if
                    else if (vertResponsive && (prevSize.blockSize  !== currentSize.blockSize )) { // resized at vert axis
                        resized = true; // mark has resized
                    } // if
                } // if
                
                
                
                // record the current size to be compared in the future event:
                prevSizes.set(entry.target, currentSize);
            } // for
            
            
            
            // fire the resize callback:
            if (resized) clientAreaResizeCallback();
        };
        
        const observer = new ResizeObserver(handleResize);
        const sizeOptions : ResizeObserverOptions = { box: 'content-box' }; // only watch for client area
        resizingElementRefs.forEach((outerElm) => !!outerElm && observer.observe(outerElm, sizeOptions));
        
        
        
        // cleanups:
        return () => {
            observer.disconnect();
            prevSizes.clear(); // un-reference all Element(s)
        };
    }, [...resizingElementRefs.values(), horzResponsive, vertResponsive, clientAreaResizeCallback]); // runs once
};



// react components:

interface ChildWithRefProps
    extends
        // bases:
        Pick<GenericProps<Element>, 'outerRef'>,
        Pick<React.RefAttributes<Element>, 'ref'>
{
    // refs:
    childId   : React.Key
    childRefs : Map<React.Key, Element|null>
    
    
    
    // components:
    component : React.ReactElement<GenericProps<Element>|React.HTMLAttributes<HTMLElement>|React.SVGAttributes<SVGElement>>
}
const ChildWithRef = (props: ChildWithRefProps): JSX.Element => {
    // rest props:
    const {
        // refs:
        childId,
        childRefs,
        
        
        
        // components:
        component,
    ...restComponentProps} = props;
    
    
    
    // verifies:
    const isReusableUiChildComponent : boolean = isReusableUiComponent<GenericProps<Element>>(component);
    
    
    
    // refs:
    const childOuterRefInternal = useEvent<React.RefCallback<Element>>((outerElm) => {
        childRefs.set(childId, outerElm);
    });
    const mergedChildOuterRef   = useMergeRefs(
        // preserves the original `outerRef` from `component`:
        (
            isReusableUiChildComponent
            ?
            (component.props as GenericProps<Element>).outerRef
            :
            (component.props as React.RefAttributes<Element>).ref
        ),
        
        
        
        // preserves the original `outerRef|ref` from `props`:
        (
            isReusableUiChildComponent
            ?
            (props as GenericProps<Element>).outerRef
            :
            (props as React.RefAttributes<Element>).ref
        ),
        
        
        
        childOuterRefInternal,
    );
    
    
    
    // jsx:
    return React.cloneElement(component,
        // props:
        {
            // other props:
            ...restComponentProps,
            
            
            
            // refs:
            [isReusableUiChildComponent ? 'outerRef' : 'ref'] : mergedChildOuterRef,
        },
    );
};



export type Fallbacks<TFallback> = [TFallback, ...TFallback[]]
export interface ResponsiveProviderProps<TFallback> extends ClientAreaResizeObserverOptions
{
    // responsives:
    fallbacks      : Fallbacks<TFallback>
    useTransition ?: boolean
    
    
    
    // children:
    children       : React.ReactNode | ((fallback: TFallback) => React.ReactNode)
}
const ResponsiveProvider = <TFallback,>(props: ResponsiveProviderProps<TFallback>): JSX.Element|null => {
    // rest props:
    const {
        // responsives:
        fallbacks,
        useTransition = true,
        
        
        
        // children:
        children: childrenFn,
    } = props;
    
    
    
    // refs:
    const [childRefs] = useState<Map<React.Key, Element|null>>(() => new Map<React.Key, Element|null>());
    
    
    
    // states:
    // local storages without causing to (re)render, we need to manual control the (re)render event:
    const currentFallbackIndex = useRef(0);
    
    // manually controls the (re)render event:
    const [triggerRender, generation] = useTriggerRender();
    
    
    
    // fn props:
    const maxFallbackIndex = (fallbacks.length - 1);
    const currentFallback  = (currentFallbackIndex.current <= maxFallbackIndex) ? fallbacks[currentFallbackIndex.current] : fallbacks[maxFallbackIndex];
    
    const childrenOrigin   = (
        (typeof(childrenFn) !== 'function')
        ?
        childrenFn
        :
        childrenFn(currentFallback)
    );
    const childrenWithRefs = React.Children.map<React.ReactNode, React.ReactNode>(childrenOrigin, (child, childIndex) => {
        // conditions:
        if (!React.isValidElement(child)) return child;
        
        
        
        // rest props:
        const {
            // refs:
            childId   : childChildId,   // sanitize the child's [childId  ] prop (if exist), so it wouldn't collide with <ChildWithRef>'s [childId  ] prop
            childRefs : childChildRefs, // sanitize the child's [childRefs] prop (if exist), so it wouldn't collide with <ChildWithRef>'s [childRefs] prop
            
            
            
            // components:
            component : childComponent, // sanitize the child's [component] prop (if exist), so it wouldn't collide with <ChildWithRef>'s [component] prop
        ...restChildProps} = child.props;
        
        
        
        // jsx:
        const childId = child.key ?? childIndex;
        if (!childRefs.has(childId)) childRefs.set(childId, null); // initially, set the outerElm ref as null to maintain the `childRefs`'s size remain constant between renders
        return (
            <ChildWithRef
                // other props:
                {...restChildProps} // steals (almost) all child's props, so the <Owner> can recognize the <ChildWithRef> as <Child>
                
                
                
                // refs:
                childId={childId}
                childRefs={childRefs}
                
                
                
                // components:
                component={
                    // clone child element with (almost) blank props:
                    <child.type
                        // identifiers:
                        key={child.key}
                        
                        
                        
                        // refs:
                        // restore the sanitized child's [childId  ] prop (if exist):
                        {...(('childId'   in child.props) ? { childId  : childChildId   } : null)}
                        // restore the sanitized child's [childRefs] prop (if exist):
                        {...(('childRefs' in child.props) ? { childRefs: childChildRefs } : null)}
                        
                        
                        
                        // components:
                        // restore the sanitized child's [component] prop (if exist):
                        {...(('component' in child.props) ? { component: childComponent } : null)}
                    />
                }
            />
        );
    });
    
    
    
    // dom effects:
    //#region reset the fallback index to zero every container's client area resized
    const clientAreaResizeCallback = useCallback((): void => {
        // reset to the first fallback (0th):
        currentFallbackIndex.current = 0;
        
        if (useTransition) {
            // lazy responsives => a bit delayed of responsives is ok:
            startTransition(() => {
                triggerRender();
            });
        }
        else {
            // greedy responsives => no delayed of responsives:
            triggerRender();
        } // if
    }, [useTransition]);
    useClientAreaResizeObserver(childRefs, clientAreaResizeCallback, props);
    //#endregion reset the fallback index to zero every container's client area resized
    
    //#region (re)calculates the existence of overflowed_layout each time the generation updated
    const cssLoaded = useRef<boolean>(false);
    useEffect(() => {
        // setups:
        const cancelTimeout = setTimeout(() => {
            cssLoaded.current = true;
            triggerRender();
        }, 1); // assumes all cssfn was fully loaded after 1ms since the event of first paint
        
        
        
        // cleanups:
        return () => {
            clearTimeout(cancelTimeout);
        };
    }, []);
    
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (currentFallbackIndex.current >= maxFallbackIndex) return; // maximum fallbacks has already reached => nothing more fallback
        if (!cssLoaded.current) return; // the cssfn is not fully loaded => ignore
        
        
        
        const hasOverflowed = Array.from(childRefs.values()).some((outerElm) => !!outerElm && isOverflowed(outerElm));
        if (hasOverflowed) {
            // current fallback has a/some overflowed_layout => not satisfied => try the next fallback:
            currentFallbackIndex.current++;
            
            // an urgent update, the user should not to see any overflowed_layout:
            triggerRender();
        } // if
    }, [generation]); // runs each time the generation updated
    //#endregion (re)calculates the existence of overflowed_layout each time the generation updated
    
    
    
    // jsx:
    return (
        <ResponsiveContext.Provider value={{ currentFallback }}>
            {childrenWithRefs}
        </ResponsiveContext.Provider>
    );
};
export {
    ResponsiveProvider,
    ResponsiveProvider as default,
}
