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
    
    
    
    // utilities:
    computePosition,
    flip,
    shift,
    offset,
    autoUpdate,
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
        (floatingOn || null) && floatingPlacement,
    );
    
    
    
    // handlers:
    const handleFloatingUpdateInternal = useEvent<EventHandler<FloatingPosition>>((floatingPosition) => {
        // conditions:
        const floatingUi = outerRef.current;
        if (!floatingUi) return; // <floatingUi> was unloaded => nothing to do
        
        
        
        const {
            strategy: position,
            x, y,
        } = floatingPosition;
        
        
        
        const style = (floatingUi as unknown as HTMLElement|SVGElement).style;
        style.position = position;
        style.left = `${x}px`;
        style.top  = `${y}px`;
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
        const triggerFloatingUpdate = async () => {
            // calculate the proper position of the <floatingUi>:
            const floatingPosition = await computePosition(/*reference: */target, /*floating: */floatingUi as unknown as HTMLElement, /*options: */{
                placement  : floatingPlacement,
                middleware : await (async (): Promise<FloatingMiddleware[]> => {
                    if (Array.isArray(floatingMiddleware)) return floatingMiddleware;
                    
                    
                    
                    const defaultMiddleware: FloatingMiddleware[] = [
                        ...((floatingOffset || floatingShift) ? [offset({ // requires to be placed at the first order
                            mainAxis  : floatingOffset,
                            crossAxis : floatingShift,
                        })] : []),
                        
                        ...(floatingAutoFlip  ? [flip() ] : []),
                        ...(floatingAutoShift ? [shift()] : []),
                    ];
                    
                    
                    
                    if (floatingMiddleware) return await floatingMiddleware(defaultMiddleware);
                    return defaultMiddleware;
                })(),
                strategy   : floatingStrategy,
            });
            
            
            
            if (!isLoaded.current) return;
            
            
            
            // trigger the `onFloatingUpdate`
            handleFloatingUpdate?.(floatingPosition);
        };
        
        
        
        // setups:
        
        const elmResizeObserver = new ResizeObserver(triggerFloatingUpdate);
        elmResizeObserver.observe(target, { box: 'border-box' });
        elmResizeObserver.observe(floatingUi, { box: 'border-box' });
        
        // the live trigger:
        const stopUpdate = autoUpdate(/*reference: */target, /*floating: */floatingUi as unknown as HTMLElement, triggerFloatingUpdate);
        
        
        
        // cleanups:
        return () => {
            isLoaded.current = false;
            elmResizeObserver.disconnect();
            stopUpdate();
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
