// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useMemo,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useIsomorphicLayoutEffect,
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks

// other libs:
import {
    // types:
    Placement             as FloatingPlacement,
    Middleware            as FloatingMiddleware,
    Strategy              as FloatingStrategy,
    Side                  as FloatingSide,
    
    ComputePositionReturn as FloatingPosition,
    DetectOverflowOptions,
    
    
    
    // utilities:
    computePosition,
    flip,
    shift,
    offset,
}                           from '@floating-ui/dom'             // a floating UI utility



// hooks:

// features:

//#region floatable
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
    
    
    
    // classes:
    const classes = useMergeClasses(
        // floatable:
        (floatingOn || null) && 'overlay',
    );
    
    
    
    // handlers:
    const handleFloatingUpdateInternal = useEvent<EventHandler<FloatingPosition>>((floatingPosition) => {
        // conditions:
        const floatingUi = outerRef.current;
        if (!floatingUi) return; // <floatingUi> was unloaded => nothing to do
        
        
        
        const {
            strategy  : position,
            x, y,
            placement : dynamicFloatingPlacement,
        } = floatingPosition;
        
        
        
        const style = (floatingUi as unknown as HTMLElement|SVGElement).style;
        style.position = position;
        style.left = `${x}px`;
        style.top  = `${y}px`;
        
        
        
        if (dynamicFloatingPlacement) {
            const classList = floatingUi.classList;
            if (!classList.contains(dynamicFloatingPlacement)) {
                classList.remove(
                    'top', 'right', 'bottom', 'left',
                    'top-start', 'top-end', 'right-start', 'right-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end',
                );
                classList.add(dynamicFloatingPlacement);
            } // if
        } // if
    });
    const handleFloatingUpdate         = useMergeEvents(
        // preserves the original `onFloatingUpdate`:
        onFloatingUpdate,
        
        
        
        // actions:
        handleFloatingUpdateInternal,
    );
    
    
    
    // dom effects:
    const isLoaded = useRef<boolean>(true);
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!isVisible)  return; // <floatingUi> is fully hidden => no need to update
        
        const target     = (floatingOn instanceof Element) ? floatingOn : floatingOn?.current;
        if (!target)     return; // [floatingOn] was not specified => nothing to do
        
        const floatingUi = outerRef.current;
        if (!floatingUi) return; // <floatingUi> was unloaded => nothing to do
        
        
        
        // marks:
        isLoaded.current = true;
        
        
        
        // handlers:
        const ancestors : Element[] = [];
        if (typeof(window) !== 'undefined') { // client_side only
            const theBody = window.document?.body;
            for (let parent = floatingUi.parentElement; parent; parent = parent.parentElement) {
                ancestors.push(parent); // collect the ancestor(s)
                if (parent === theBody) break; // stop iterating when reaching the <body>
            } // for
        } // if
        const detectOverflowOptions: Partial<DetectOverflowOptions> = {
            boundary: ancestors,
        };
        const defaultMiddleware: FloatingMiddleware[] = [
            ...((floatingOffset || floatingShift) ? [offset({ // requires to be placed at the first order
                mainAxis  : floatingOffset,
                crossAxis : floatingShift,
            })] : []),
            
            ...(floatingAutoFlip  ? [flip(detectOverflowOptions) ] : []),
            ...(floatingAutoShift ? [shift(detectOverflowOptions)] : []),
        ];
        
        const triggerFloatingUpdate = async () => {
            // calculate the proper position of the <floatingUi>:
            const floatingPosition = await computePosition(/*reference: */target, /*floating: */floatingUi as unknown as HTMLElement, /*options: */{
                placement  : floatingPlacement,
                middleware : await (async (): Promise<FloatingMiddleware[]> => {
                    if (Array.isArray(floatingMiddleware)) return floatingMiddleware;
                    
                    
                    
                    if (floatingMiddleware) return await floatingMiddleware(defaultMiddleware);
                    return defaultMiddleware;
                })(),
                strategy   : floatingStrategy,
            });
            
            
            
            if (!isLoaded.current) return;
            
            
            
            // trigger the `onFloatingUpdate`
            handleFloatingUpdate?.(floatingPosition);
        };
        let scrollHandled = false;
        const handleOffsetAncestorsScroll = () => {
            // conditions:
            if (scrollHandled) return; // already handled => nothing to do
            
            
            
            // actions:
            scrollHandled = true; // mark as handled
            requestAnimationFrame(() => { // the throttling limit
                triggerFloatingUpdate();
                scrollHandled = false; // un-mark as handled
            });
        };
        
        
        
        // setups:
        
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
        const elmResizeObserver = new ResizeObserver(triggerFloatingUpdate);
        elmResizeObserver.observe(target, { box: 'border-box' });
        for (const offsetAncestor of offsetAncestors) {
            elmResizeObserver.observe(offsetAncestor, { box: 'content-box' });
        } // for
        elmResizeObserver.observe(floatingUi, { box: 'border-box' });
        
        
        
        // cleanups:
        return () => {
            // marks:
            isLoaded.current = false;
            
            
            
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
    }, [
        // conditions:
        isVisible,
        
        
        
        // floatable:
        floatingOn,
        floatingPlacement,
        floatingMiddleware,
        floatingStrategy,
        
        floatingAutoFlip,
        floatingAutoShift,
        floatingOffset,
        floatingShift,
        
        
        
        // handlers:
        handleFloatingUpdate,
    ]);
    
    
    
    // return the implementations:
    return useMemo(() => ({
        outerRef,
        classes,
    }), [outerRef, classes]);
};

export type { FloatingPlacement, FloatingMiddleware, FloatingStrategy, FloatingPosition, FloatingSide }
//#endregion floatable
