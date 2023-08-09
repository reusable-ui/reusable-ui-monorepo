// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useMemo,
    useState,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useIsomorphicLayoutEffect,
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeClasses,
    useMountedFlag,
}                           from '@reusable-ui/hooks'           // react helper hooks

// other libs:
import {
    // types:
    Placement             as FloatingPlacement,
    Middleware            as FloatingMiddleware,
    Strategy              as FloatingStrategy,
    Side                  as FloatingSide,
    
    ComputePositionReturn as FloatingPosition,
    
    
    
    // utilities:
    computePosition,
    flip,
    shift,
    offset,
}                           from '@floating-ui/dom'             // a floating UI utility



// hooks:

// capabilities:

//#region floatable
export interface ImperativeFloatable {
    updateFloatingPosition(): Promise<void>
}
export interface FloatableProps
{
    // floatable:
    floatingOn         ?: React.RefObject<Element>|Element|null // getter ref
    floatingPlacement  ?: FloatingPlacement
    floatingMiddleware ?: FloatingMiddleware[] | ((defaultMiddleware: FloatingMiddleware[]) => Promise<FloatingMiddleware[]>)
    floatingStrategy   ?: FloatingStrategy
    
    floatingAutoFlip   ?: boolean
    floatingAutoShift  ?: boolean
    floatingOffset     ?: number
    floatingShift      ?: number
    
    onFloatingUpdate   ?: EventHandler<FloatingPosition>
}
export const useFloatable = <TElement extends Element = HTMLElement>(props: FloatableProps, isVisible: boolean = true) => {
    // rest props:
    const {
        // floatable:
        floatingOn,
        floatingPlacement   = 'top',
        floatingMiddleware,
        floatingStrategy    = 'absolute',
        
        floatingAutoFlip    = false,
        floatingAutoShift   = false,
        floatingOffset      = 0,
        floatingShift       = 0,
        
        onFloatingUpdate,
    } = props;
    
    
    
    // refs:
    const outerRef = useRef<TElement|null>(null);
    
    
    
    // states:
    const [dynamicFloatingPlacement, setDynamicFloatingPlacement] = useState<FloatingPlacement>(floatingPlacement);
    
    const isMounted = useMountedFlag();
    
    
    
    // classes:
    const classes = useMergeClasses(
        // floatable:
        (floatingOn || null) && 'overlay',
        (floatingOn || null) && dynamicFloatingPlacement,
    );
    
    
    
    // handlers:
    const handleFloatingUpdateInternal = useEvent<EventHandler<FloatingPosition>>((floatingPosition) => {
        // conditions:
        const floatingUi = outerRef.current;
        if (!floatingUi) return; // <floatingUi> was unloaded => nothing to do
        
        
        
        const {
            strategy  : position,
            x, y,
            placement : newDynamicFloatingPlacement,
        } = floatingPosition;
        
        
        
        const style = (floatingUi as unknown as HTMLElement|SVGElement).style;
        style.position = position;
        style.left = `${x}px`;
        style.top  = `${y}px`;
        
        
        
        if (dynamicFloatingPlacement !== newDynamicFloatingPlacement) {
            // instantly change the className:
            const classList = floatingUi.classList;
            classList.remove(dynamicFloatingPlacement);
            classList.add(newDynamicFloatingPlacement);
            
            // change the className for next re-render:
            setDynamicFloatingPlacement(newDynamicFloatingPlacement)
        } // if
    });
    const handleFloatingUpdate         = useMergeEvents(
        // preserves the original `onFloatingUpdate`:
        onFloatingUpdate,
        
        
        
        // actions:
        handleFloatingUpdateInternal,
    );
    
    
    
    // unstable callbacks:
    const getMiddleware          = useMemo<() => Promise<FloatingMiddleware[]>>(() => {
        const defaultMiddleware: FloatingMiddleware[] = [
            ...((floatingOffset || floatingShift) ? [offset({ // requires to be placed at the first order
                mainAxis  : floatingOffset,
                crossAxis : floatingShift,
            })] : []),
            
            ...(floatingAutoFlip  ? [flip() ] : []),
            ...(floatingAutoShift ? [shift()] : []),
        ];
        const middleware : FloatingMiddleware[] | ((defaultMiddleware: FloatingMiddleware[]) => Promise<FloatingMiddleware[]>) = (
            floatingMiddleware // array -or- async function
            ??
            defaultMiddleware  // array
        );
        return async () => Array.isArray(middleware) ? middleware : (await middleware(defaultMiddleware));
    }, [
        // floatable:
        floatingMiddleware,
        
        floatingAutoFlip,
        floatingAutoShift,
        floatingOffset,
        floatingShift,
    ]);
    
    // stable callbacks:
    const updateFloatingPosition = useEvent(async (): Promise<void> => {
        // conditions:
        if (!isMounted.current) return; // unmounted => abort
        
        if (!isVisible)         return; // <floatingUi> is fully hidden => no need to update
        
        const floatingUi = outerRef.current;
        if (!floatingUi)        return; // <floatingUi> was unloaded => nothing to do
        
        const target     = (floatingOn instanceof Element) ? floatingOn : floatingOn?.current;
        if (!target)            return; // [floatingOn] was not specified => nothing to do
        
        
        
        // calculate the proper position of the <floatingUi>:
        const floatingPosition = await computePosition(/*reference: */target, /*floating: */floatingUi as unknown as HTMLElement, /*options: */{
            placement  : floatingPlacement,
            middleware : await getMiddleware(),
            strategy   : floatingStrategy,
        });
        if (!isMounted.current) return; // unmounted => abort
        
        
        
        // trigger the `onFloatingUpdate`
        handleFloatingUpdate?.(floatingPosition);
    });
    
    
    
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        // actions:
        updateFloatingPosition();
    }, [
        // conditions:
        isVisible,         // update the position when <floatingUi> (re)shwon
        
        
        
        // floatable:
        floatingOn,        // update the position when <floatingUi> change the target
        floatingPlacement, // update the position when the floating placement change
        floatingStrategy,  // update the position when the floating strategy  change
        
        floatingAutoFlip,  // update the position when the floating autoFlip  change
        floatingAutoShift, // update the position when the floating autoShift change
        floatingOffset,    // update the position when the floating offset    change
        floatingShift,     // update the position when the floating shift     change
    ]);
    
    useIsomorphicLayoutEffect(() => {
        // conditions:
        const floatingUi = outerRef.current;
        if (!floatingUi)        return; // <floatingUi> was unloaded => nothing to do
        
        const target     = (floatingOn instanceof Element) ? floatingOn : floatingOn?.current;
        if (!target)            return; // [floatingOn] was not specified => nothing to do
        
        
        
        // handlers:
        let scrollHandled = false;
        const handleOffsetAncestorsScroll = () => {
            // conditions:
            if (scrollHandled) return; // already being handled => nothing to do
            
            
            
            // actions:
            scrollHandled = true; // mark as handled
            requestAnimationFrame(() => { // the throttling limit
                updateFloatingPosition();
                scrollHandled = false; // un-mark as handled
            });
        };
        
        
        
        // setups:
        let cleanups : (() => void)|undefined = undefined;
        const cancelRequest = requestAnimationFrame(() => { // avoids *force-reflow* of calling `(target as HTMLElement).offsetParent` by delaying the execution
            // watch scrolling of <target>'s <parent> up to <offsetParent>:
            const offsetAncestors : Element[] = [];
            if (typeof(window) !== 'undefined') { // client_side only
                const offsetParent = (target as HTMLElement).offsetParent;
                if (offsetParent) {
                    for (let parent = floatingUi.parentElement; parent; parent = parent.parentElement) {
                        offsetAncestors.push(parent); // collect the ancestor(s)
                        if (parent === offsetParent) break; // stop iterating on nearest offsetParent
                    } // for
                } // if
            } // if
            for (const offsetAncestor of offsetAncestors) {
                offsetAncestor.addEventListener('scroll', handleOffsetAncestorsScroll, { passive: true });
            } // for
            if (typeof(document) !== 'undefined') {
                document.addEventListener('scroll', handleOffsetAncestorsScroll, { passive: true });
            } // if
            
            
            
            // watch size changes of the <target>, <ancestor>s, & <floatingUi>:
            const elmResizeObserver = new ResizeObserver(updateFloatingPosition);
            elmResizeObserver.observe(target, { box: 'border-box' });
            for (const offsetAncestor of offsetAncestors) {
                elmResizeObserver.observe(offsetAncestor, { box: 'content-box' });
            } // for
            elmResizeObserver.observe(floatingUi, { box: 'border-box' });
            
            
            
            cleanups = () => {
                // un-watch scrolling of <target>'s <parent> up to <offsetParent>:
                for (const offsetAncestor of offsetAncestors) {
                    offsetAncestor.removeEventListener('scroll', handleOffsetAncestorsScroll);
                } // for
                if (typeof(document) !== 'undefined') {
                    document.removeEventListener('scroll', handleOffsetAncestorsScroll);
                } // if
                
                
                
                // un-watch size changes of the <target>, <ancestor>s, & <floatingUi>:
                elmResizeObserver.disconnect();
            };
        });
        
        
        
        // cleanups:
        return () => {
            cancelAnimationFrame(cancelRequest);
            cleanups?.();
        };
    }, [
        // floatable:
        floatingOn,        // update the position when <floatingUi> change the target
    ]);
    
    
    
    // return the implementations:
    return useMemo(() => ({
        outerRef,
        classes,
    }), [outerRef, classes]);
};

export type { FloatingPlacement, FloatingMiddleware, FloatingStrategy, FloatingPosition, FloatingSide }
//#endregion floatable
