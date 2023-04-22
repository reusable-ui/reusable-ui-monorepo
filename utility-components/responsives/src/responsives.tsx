// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    
    
    
    // utilities:
    startTransition,
    
    
    
    // contexts:
    createContext,
    useContext,
}                           from 'react'

// reusable-ui core:
import {
    // a set of React node utility functions:
    isReusableUiComponent,
    
    
    
    // react helper hooks:
    useIsomorphicLayoutEffect,
    useTriggerRender,
    useEvent,
    useMergeRefs,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

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
    const pixelScale = ((typeof(window) !== 'undefined') && window.devicePixelRatio) || 1; // compensates for inaccurate calculation by rounding effect
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
    
    
    
    const pixelScale = ((typeof(window) !== 'undefined') && window.devicePixelRatio) || 1; // compensates for inaccurate calculation by rounding effect
    
    
    
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

const getElements = (elementRefs: Map<any, Element|null>|Iterable<Element|null>|React.RefObject<Element>): (Element|null)[] => {
    if (elementRefs instanceof Map) return Array.from(elementRefs.values());
    if (Symbol.iterator in elementRefs) return Array.from(elementRefs as Iterable<Element|null>);
    return [(elementRefs as React.RefObject<Element>).current];
}



// hooks:
export interface ResponsiveResizeObserverOptions {
    // responsives:
    horzResponsive ?: boolean
    vertResponsive ?: boolean
}
export const useResponsiveResizeObserver = (resizingElementRefs: Map<any, Element|null>|Iterable<Element|null>|React.RefObject<Element>, responsiveResizeCallback: () => void, options: ResponsiveResizeObserverOptions = {}) => {
    // options:
    const {
        horzResponsive = true,
        vertResponsive = false,
    } = options;
    
    
    
    // dom effects:
    const [prevSizes] = useState<WeakMap<Element, ResizeObserverSize>>(() => new Map()); // remember prev element's sizes
    useIsomorphicLayoutEffect(() => {
        // setups:
        const clientAreaResizeObserver = new ResizeObserver((entries) => {
            let hasResized = false;
            for (const entry of entries) {
                // conditions:
                const item = entry.target;
                if (!item.parentElement) continue; // the item is being removed => ignore
                
                
                
                const currentSize = entry.contentBoxSize[0]; // get the client size
                const prevSize    = prevSizes.get(item);     // get the previous client size (for size-changed detection)
                if (prevSize && !hasResized) { // if has prev size record => partially/fully compare prev vs current
                    if      (horzResponsive && (prevSize.inlineSize !== currentSize.inlineSize)) { // resized at horz axis
                        hasResized = true; // mark has resized
                    } // if
                    else if (vertResponsive && (prevSize.blockSize  !== currentSize.blockSize )) { // resized at vert axis
                        hasResized = true; // mark has resized
                    } // if
                } // if
                
                
                
                // record the current size to be compared in the future event:
                prevSizes.set(item, currentSize);
            } // for
            
            
            
            // fire the resize callback:
            if (hasResized) responsiveResizeCallback();
        });
        
        
        
        //#region resize of <descendant>s may cause the <container>s overflowed
        const descendantsResizeObserver = new ResizeObserver((entries) => {
            let hasResized = false;
            for (const entry of entries) {
                // conditions:
                const item = entry.target;
                if (!item.parentElement) continue; // the item is being removed => ignore
                
                
                
                const currentSize = entry.borderBoxSize[0]; // get the offset size
                const prevSize    = prevSizes.get(item);     // get the previous client size (for size-changed detection)
                if (prevSize && !hasResized) { // if has prev size record => fully compare prev vs current
                    if (
                        (prevSize.inlineSize !== currentSize.inlineSize)
                        ||
                        (prevSize.blockSize  !== currentSize.blockSize )
                    ) {
                        const {
                            display,
                            position,
                        } = getComputedStyle(item); // warning: force reflow => major performance bottleneck!
                        if (
                            (display !== 'none')    // ignore hidden element
                            &&
                            (position === 'static') // ignore position other than 'static' (ignore 'relative'|'absolute'|'fixed'|'sticky')
                        ) {
                            hasResized = true; // mark has resized
                        } // if
                    } // if
                } // if
                
                
                
                // record the current size to be compared in the future event:
                prevSizes.set(item, currentSize);
            } // for
            
            
            
            // fire the resize callback:
            if (hasResized) {
                const hasOverflowed = getElements(resizingElementRefs).some((outerElm) => !!outerElm && isOverflowed(outerElm));
                if (hasOverflowed) responsiveResizeCallback();
            } // if
        });
        //#endregion resize of <descendant>s may cause the <container>s overflowed
        
        
        
        getElements(resizingElementRefs).forEach((outerElm) => {
            // conditions:
            if (!outerElm) return;
            
            
            
            // watchdog for the <container>:
            clientAreaResizeObserver.observe(outerElm, { box: 'content-box' }); // watch for client size changed
            
            
            
            // watchdog for the <container>'s <descendant>s:
            // we only watchdog for the direct children (not the deep <descendant>s), for performance reason
            for (const descendant of outerElm.children) {
                descendantsResizeObserver.observe(descendant, { box: 'border-box' }) // watch for offset size changed
            } // for
        });
        
        
        
        // cleanups:
        return () => {
            clientAreaResizeObserver.disconnect();
            descendantsResizeObserver.disconnect();
        };
    }, [...getElements(resizingElementRefs), responsiveResizeCallback, horzResponsive, vertResponsive]);
}



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
export interface ResponsiveProviderProps<TFallback>
    extends
        ResponsiveResizeObserverOptions
{
    // responsives:
    fallbacks       : Fallbacks<TFallback>
    useTransition  ?: boolean
    
    
    
    // children:
    children       : React.ReactNode | ((fallback: TFallback) => React.ReactNode)
}
const ResponsiveProvider = <TFallback,>(props: ResponsiveProviderProps<TFallback>): JSX.Element|null => {
    // rest props:
    const {
        // responsives:
        fallbacks,
        useTransition  = true,
        
        
        
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
        if (!React.isValidElement<{}>(child)) return child; // not an <Element> => ignore
        
        
        
        // props:
        const childProps = child.props;
        
        
        
        // jsx:
        const childId = child.key ?? childIndex;
        if (!childRefs.has(childId)) childRefs.set(childId, null); // initially, set the outerElm ref as null to maintain the `childRefs`'s size remain constant between renders
        return (
            <ChildWithRef
                // other props:
                {...childProps} // steals all child's props, so the <Owner> can recognize the <ChildWithRef> as <TheirChild>
                
                
                
                // refs:
                childId={childId}
                childRefs={childRefs}
                
                
                
                // components:
                component={
                    // clone child element with (almost) blank props:
                    <child.type
                        // identifiers:
                        key={child.key}
                        
                        
                        
                        //#region restore conflicting props
                        {...{
                            ...(('childId'   in childProps) ? { childId   : childProps.childId   } : undefined),
                            ...(('childRefs' in childProps) ? { childRefs : childProps.childRefs } : undefined),
                            ...(('component' in childProps) ? { component : childProps.component } : undefined),
                        }}
                        //#endregion restore conflicting props
                    />
                }
            />
        );
    });
    
    
    
    // dom effects:
    //#region reset the fallback index to zero every <container>'s client area resized
    const handleResponsiveResize = useEvent((): void => {
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
    });
    useResponsiveResizeObserver(childRefs, handleResponsiveResize, props);
    //#endregion reset the fallback index to zero every <container>'s client area resized
    
    //#region (re)calculates the existence of overflowed_layout each time the generation updated
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (currentFallbackIndex.current >= maxFallbackIndex) return; // maximum fallbacks has already reached => nothing more fallback
        
        
        
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
