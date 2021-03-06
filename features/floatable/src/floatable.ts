// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useReducer,
    useRef,
    useMemo,
}                           from 'react'

// reusable-ui:
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



// utilities:
type Coordinate = Pick<FloatingPosition, 'x'|'y'|'placement'>
const coordinateReducer = (oldCoordinate: Coordinate|null, newCoordinate: Coordinate|null): Coordinate|null => {
    if (
        (oldCoordinate === newCoordinate)
        ||
        (
            !!oldCoordinate  &&  !!newCoordinate
            &&
            (oldCoordinate.x === newCoordinate.x)
            &&
            (oldCoordinate.y === newCoordinate.y)
            &&
            (oldCoordinate.placement === newCoordinate.placement)
        )
    ) return oldCoordinate;
    
    return newCoordinate;
};



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
    // states:
    const [floatingPos, setFloatingPos] = useReducer(coordinateReducer, null);
    
    
    
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
        ( floatingOn                 || null) && 'overlay',
        ((floatingOn && floatingPos) || null) && floatingPos?.placement,
    );
    
    
    
    // styles:
    const style = useMemo(() => ({
        // positions:
        position : ( floatingOn                 || undefined) && floatingStrategy,
        left     : ((floatingOn && floatingPos) || undefined) && `${floatingPos?.x}px`,
        top      : ((floatingOn && floatingPos) || undefined) && `${floatingPos?.y}px`,
    }), [floatingOn, floatingPos, floatingStrategy]);
    
    
    
    // handlers:
    const handleFloatingUpdateInternal = useEvent<EventHandler<FloatingPosition>>((floatingPosition) => {
        setFloatingPos(floatingPosition);
    }, []);
    const handleFloatingUpdate         = useMergeEvents(
        // preserves the original `onFloatingUpdate`:
        onFloatingUpdate,
        
        
        
        // actions:
        handleFloatingUpdateInternal,
    );
    
    
    
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!isVisible)  return; // <floatingUi> is fully hidden => no need to update
        
        const target     = (floatingOn instanceof Element) ? floatingOn : floatingOn?.current;
        if (!target)     return; // [floatingOn] was not specified => nothing to do
        
        const floatingUi = outerRef.current;
        if (!floatingUi) return; // <floatingUi> was unloaded => nothing to do
        
        
        
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
            
            
            
            // trigger the `onFloatingUpdate`
            handleFloatingUpdate?.(floatingPosition);
        };
        
        
        
        // setups:
        
        // the first trigger:
        const cancelTimeout = setTimeout(() => { // wait until all cssfn (both for <floatingUi> and <target>) are fully loaded
            triggerFloatingUpdate();
        }, 0);
        
        // the live trigger:
        const stopUpdate = autoUpdate(/*reference: */target, /*floating: */floatingUi as unknown as HTMLElement, triggerFloatingUpdate);
        
        
        
        // cleanups:
        return () => {
            clearTimeout(cancelTimeout);
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
        style,
    }), [outerRef, classes, style]);
};

export type { FloatingPlacement, FloatingMiddleware, FloatingStrategy, FloatingPosition, FloatingSide }
//#endregion floatable
