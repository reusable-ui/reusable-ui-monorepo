// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useReducer,
    useRef,
    useMemo,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    states,
    keyframes,
    
    
    
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // hooks:
    useIsomorphicLayoutEffect,
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    ifCollapsed,
    usesCollapsible,
    ExpandedChangeEvent,
    CollapsibleProps,
    useCollapsible,
}                           from '@reusable-ui/collapsible'     // a capability of UI to expand/reduce its size or toggle the visibility
import {
    // hooks:
    usesSizeVariant,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component

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
export interface FloatableProps
{
    // floatings:
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
export const useFloatable = (props: FloatableProps) => {
    // states:
    const [floatingPos, setFloatingPos] = useReducer(coordinateReducer, null);
    
    
    
    // rest props:
    const {
        // floatings:
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
    const outerRef = useRef<Element|null>(null);
    
    
    
    // classes:
    const classes = useMergeClasses(
        // floatings:
        ( floatingOn                 || null) && 'overlay',
        ((floatingOn && floatingPos) || null) && floatingPos?.placement,
    );
    
    
    
    // styles:
    const style = useMemo(() => ({
        // positions:
        position : ( floatingOn                 || undefined) && floatingStrategy,
        left     : ((floatingOn && floatingPos) || undefined) && `${floatingPos?.x}px`,
        top      : ((floatingOn && floatingPos) || undefined) && `${floatingPos?.y}px`,
    }), [floatingStrategy, floatingPos]);
    
    
    
    // handlers:
    const handleFloatingUpdateInternal = useEvent<EventHandler<FloatingPosition>>((floatingPosition) => {
        setFloatingPos(floatingPosition);
    }, []);
    const handleFloatingUpdate         = useMergeEvents(
        // preserves the original `onFloatingUpdate`:
        onFloatingUpdate,
        
        
        
        // floatings:
        handleFloatingUpdateInternal,
    );
    
    
    
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!isVisible)   return; // <Popup> is fully hidden => no need to update
        
        const target      = (floatingOn instanceof Element) ? floatingOn : floatingOn?.current;
        if (!target)      return; // [floatingOn] was not specified => nothing to do
        
        const floatingElm = outerRef.current;
        if (!floatingElm) return; // <Popup> was unloaded => nothing to do
        
        
        
        // handlers:
        const triggerFloatingUpdate = async () => {
            // calculate the proper position of the <Popup>:
            const floatingPosition = await computePosition(/*reference: */target, /*floating: */floatingElm as unknown as HTMLElement, /*options: */{
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
        const cancelTimeout = setTimeout(() => { // wait until all cssfn (both for <Popup> and <Target>) are fully loaded
            triggerFloatingUpdate();
        }, 0);
        
        // the live trigger:
        const stopUpdate = autoUpdate(target, floatingElm as unknown as HTMLElement, triggerFloatingUpdate);
        
        
        
        // cleanups:
        return () => {
            clearTimeout(cancelTimeout);
            stopUpdate();
        };
    }, [
        // conditions:
        isVisible,
        
        
        
        // floatings:
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
};