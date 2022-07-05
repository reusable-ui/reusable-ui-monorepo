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
    vars,
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
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ActivePassiveVars,
    ifActivating,
    ifPassivating,
    ifPassived,
    usesEnableDisableState,
    usesActivePassiveState as indicatorUsesActivePassiveState,
    useActivePassiveState,
    
    
    
    // styles:
    usesIndicatorLayout,
    usesIndicatorVariants,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from '@reusable-ui/indicator'       // a base component

// other libs:
import {
    // types:
    Placement             as PopupPlacement,
    Middleware            as PopupMiddleware,
    Strategy              as PopupStrategy,
    
    ComputePositionReturn as PopupPosition,
    
    
    
    // utilities:
    computePosition,
    flip,
    shift,
    offset,
    autoUpdate,
}                           from '@floating-ui/dom'             // a popup utility



// hooks:

// accessibilities:

//#region activePassive
/**
 * Uses active & passive states.
 * @returns A `StateMixin<ActivePassiveVars>` represents active & passive state definitions.
 */
export const usesActivePassiveState = (): StateMixin<ActivePassiveVars> => {
    // dependencies:
    
    // accessibilities:
    const [activeRule, actives] = indicatorUsesActivePassiveState();
    
    
    
    return [
        () => style({
            ...imports([
                // accessibilities:
                activeRule,
            ]),
            ...states([
                ifActivating({
                    ...vars({
                        [actives.anim  ] : popups.animActive,
                    }),
                }),
                ifPassivating({
                    ...vars({
                        [actives.anim  ] : popups.animPassive,
                    }),
                }),
            ]),
        }),
        actives,
    ];
};
//#endregion activePassive



// styles:
export const usesPopupLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesIndicatorLayout(),
        ]),
        ...style({
            // positions:
            ...rule('.overlay', {
                zIndex: 1080,
            }),
            
            
            
            // customize:
            ...usesCssProps(popups), // apply config's cssProps
        }),
    });
};
export const usesPopupVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(popups);
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
    });
};
export const usesPopupStates = () => {
    // dependencies:
    
    // states:
    const [enableDisableStateRule] = usesEnableDisableState();
    const [activePassiveStateRule] = usesActivePassiveState();
    
    
    
    return style({
        ...imports([
            // accessibilities:
            enableDisableStateRule,
            activePassiveStateRule,
        ]),
        ...states([
            ifPassived({
                // appearances:
                display: 'none', // hide the popup
            }),
        ]),
    });
};

export const usePopupStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesPopupLayout(),
        
        // variants:
        usesPopupVariants(),
        
        // states:
        usesPopupStates(),
    ]),
}), { id: 'usjjnl1scl' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [popups, popupValues, cssPopupConfig] = cssConfig(() => {
    //#region keyframes
    const framePassived     = style({
        opacity   : 0,
        transform : 'scale(0)',
    });
    const frameIntermediate = style({
        transform : 'scale(1.02)',
    });
    const frameActived      = style({
        opacity   : 1,
        transform : 'scale(1)',
    });
    const [keyframesActiveRule , keyframesActive ] = keyframes({
        from  : framePassived,
        '70%' : frameIntermediate,
        to    : frameActived,
    });
    keyframesActive.value  = 'active';  // the @keyframes name should contain 'active'  in order to be recognized by `useActivePassiveState`
    const [keyframesPassiveRule, keyframesPassive] = keyframes({
        from  : frameActived,
        '30%' : frameIntermediate,
        to    : framePassived,
    });
    keyframesPassive.value = 'passive'; // the @keyframes name should contain 'passive' in order to be recognized by `useActivePassiveState`
    //#endregion keyframes
    
    
    
    return {
        // animations:
        ...keyframesActiveRule,
        ...keyframesPassiveRule,
        animActive    : [
            ['300ms', 'ease-out', 'both', keyframesActive ],
        ]                           as CssKnownProps['anim'],
        animPassive   : [
            ['500ms', 'ease-out', 'both', keyframesPassive],
        ]                           as CssKnownProps['anim'],
    };
}, { prefix: 'pop' });



// utilities:
type Coordinate = Pick<PopupPosition, 'x'|'y'|'placement'>
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



// react components:
export interface PopupProps<TElement extends Element = Element>
    extends
        // bases:
        IndicatorProps<TElement>
{
    // popups:
    targetRef       ?: React.RefObject<Element>|Element|null // getter ref
    popupPlacement  ?: PopupPlacement
    popupMiddleware ?: PopupMiddleware[] | ((defaultMiddleware: PopupMiddleware[]) => Promise<PopupMiddleware[]>)
    popupStrategy   ?: PopupStrategy
    
    popupAutoFlip   ?: boolean
    popupAutoShift  ?: boolean
    popupOffset     ?: number
    popupShift      ?: number
    
    onPopupUpdate   ?: EventHandler<PopupPosition>
    
    
    
    // behaviors:
    lazy            ?: boolean
    
    
    
    // children:
    children        ?: React.ReactNode
}
const Popup = <TElement extends Element = Element>(props: PopupProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet              = usePopupStyleSheet();
    
    
    
    // states:
    
    // accessibilities:
    const activePassiveState      = useActivePassiveState<TElement>(props);
    const isVisible               = activePassiveState.active || (!!activePassiveState.class); // visible = showing, shown, hidding ; !visible = hidden
    const [popupPos, setPopupPos] = useReducer(coordinateReducer, null);
    
    
    
    // rest props:
    const {
        // popups:
        targetRef,
        popupPlacement   = 'top',
        popupMiddleware,
        popupStrategy    = 'absolute',
        
        popupAutoFlip    = false,
        popupAutoShift   = false,
        popupOffset      = 0,
        popupShift       = 0,
        
        onPopupUpdate,
        
        
        
        // styles:
        style,
        
        
        
        // behaviors:
        lazy             = false,
        
        
        
        // children:
        children,
    ...restIndicatorProps} = props;
    
    
    
    // refs:
    const popupRefInternal = useRef<TElement|null>(null);
    const mergedElmRef     = useMergeRefs(
        // preserves the original `elmRef`:
        props.elmRef,
        
        
        
        popupRefInternal,
    );
    
    
    
    // classes:
    const classes = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // popups:
        ( targetRef              || null) && 'overlay',
        ((targetRef && popupPos) || null) && popupPos?.placement,
    );
    
    
    
    // styles:
    const mergedStyle = useMemo(() => ({
        // positions:
        position : ( targetRef              || undefined) && popupStrategy,
        left     : ((targetRef && popupPos) || undefined) && `${popupPos?.x}px`,
        top      : ((targetRef && popupPos) || undefined) && `${popupPos?.y}px`,
        
        
        
        // preserves the original `style` (can overwrite the `icon.style`):
        ...(style ?? {}),
    }), [popupStrategy, popupPos, style]);
    
    
    
    // handlers:
    const handlePopupUpdateInternal = useEvent<EventHandler<PopupPosition>>((popupPosition) => {
        setPopupPos(popupPosition);
    }, []);
    const handlePopupUpdate         = useMergeEvents(
        // preserves the original `onPopupUpdate`:
        onPopupUpdate,
        
        
        
        // popups:
        handlePopupUpdateInternal,
    );
    const handleAnimationEnd        = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        
        // accessibilities:
        activePassiveState.handleAnimationEnd,
    );
    
    
    
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!isVisible) return; // <Popup> is fully hidden => no need to update
        
        const target = (targetRef instanceof Element) ? targetRef : targetRef?.current;
        if (!target)    return; // [targetRef] was not specified => nothing to do
        
        const popup  = popupRefInternal.current;
        if (!popup)     return; // <Popup> was unloaded => nothing to do
        if (!(popup instanceof HTMLElement)) return; // the floating-ui only supports manipulating HTMLElement
        
        
        
        // handlers:
        const triggerPopupUpdate = async () => {
            // calculate the proper position of the <Popup>:
            const popupPosition = await computePosition(/*reference: */target, /*floating: */popup, /*options: */{
                placement  : popupPlacement,
                middleware : await (async (): Promise<PopupMiddleware[]> => {
                    if (Array.isArray(popupMiddleware)) return popupMiddleware;
                    
                    
                    
                    const defaultMiddleware: PopupMiddleware[] = [
                        ...((popupOffset || popupShift) ? [offset({ // requires to be placed at the first order
                            mainAxis  : popupOffset,
                            crossAxis : popupShift,
                        })] : []),
                        
                        ...(popupAutoFlip  ? [flip() ] : []),
                        ...(popupAutoShift ? [shift()] : []),
                    ];
                    
                    
                    
                    if (popupMiddleware) return await popupMiddleware(defaultMiddleware);
                    return defaultMiddleware;
                })(),
                strategy   : popupStrategy,
            });
            
            
            
            // trigger the `onPopupUpdate`
            handlePopupUpdate?.(popupPosition);
        };
        
        
        
        // setups:
        
        // the first trigger:
        const cancelTimeout = setTimeout(() => { // wait until all cssfn (both for <Popup> and <Target>) are fully loaded
            triggerPopupUpdate();
        }, 0);
        
        // the live trigger:
        const stopUpdate = autoUpdate(target, popup, triggerPopupUpdate);
        
        
        
        // cleanups:
        return () => {
            clearTimeout(cancelTimeout);
            stopUpdate();
        };
    }, [
        // conditions:
        isVisible,
        
        
        
        // popups:
        targetRef,
        popupPlacement,
        popupMiddleware,
        popupStrategy,
        
        popupAutoFlip,
        popupAutoShift,
        popupOffset,
        popupShift,
        
        
        
        // handlers:
        handlePopupUpdate,
    ]);
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restIndicatorProps}
            
            
            
            // refs:
            elmRef={mergedElmRef}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? 'status'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            classes={classes}
            
            
            
            // styles:
            style={mergedStyle}
            
            
            
            // handlers:
            onAnimationEnd={handleAnimationEnd}
        >
            { (!lazy || isVisible) && children }
        </Indicator>
    );
};
export {
    Popup,
    Popup as default,
}

export type { PopupPlacement, PopupMiddleware, PopupStrategy, PopupPosition }
