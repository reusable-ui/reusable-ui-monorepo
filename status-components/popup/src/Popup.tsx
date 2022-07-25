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
}                           from '@floating-ui/dom'             // a popup utility



// styles:
export const usesPopupLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBasicLayout(),
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
            usesBasicVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
    });
};
export const usesPopupStates = () => {
    // dependencies:
    
    // states:
    const [collapsibleRule] = usesCollapsible(popups);
    
    
    
    return style({
        ...imports([
            // states:
            collapsibleRule,
        ]),
        ...states([
            ifCollapsed({
                // appearances:
                display: 'none', // hide the <Popup>
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
    const frameCollapsed    = style({
        opacity   : 0,
        transform : 'scale(0)',
    });
    const frameIntermediate = style({
        transform : 'scale(1.02)',
    });
    const frameExpanded     = style({
        opacity   : 1,
        transform : 'scale(1)',
    });
    const [keyframesExpandRule  , keyframesExpand  ] = keyframes({
        from  : frameCollapsed,
        '70%' : frameIntermediate,
        to    : frameExpanded,
    });
    keyframesExpand.value   = 'expand';   // the @keyframes name should contain 'expand'   in order to be recognized by `useCollapsible`
    const [keyframesCollapseRule, keyframesCollapse] = keyframes({
        from  : frameExpanded,
        '30%' : frameIntermediate,
        to    : frameCollapsed,
    });
    keyframesCollapse.value = 'collapse'; // the @keyframes name should contain 'collapse' in order to be recognized by `useCollapsible`
    //#endregion keyframes
    
    
    
    return {
        // animations:
        ...keyframesExpandRule,
        ...keyframesCollapseRule,
        animExpand       : [
            ['300ms', 'ease-out', 'both', keyframesExpand  ],
        ]                                                       as CssKnownProps['anim'],
        animCollapse     : [
            ['500ms', 'ease-out', 'both', keyframesCollapse],
        ]                                                       as CssKnownProps['anim'],
    };
}, { prefix: 'pop' });



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



// react components:
export interface PopupProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        BasicProps<TElement>,
        
        // states:
        CollapsibleProps<TExpandedChangeEvent>
{
    // floatings:
    floatingTarget     ?: React.RefObject<Element>|Element|null // getter ref
    floatingPlacement  ?: FloatingPlacement
    floatingMiddleware ?: FloatingMiddleware[] | ((defaultMiddleware: FloatingMiddleware[]) => Promise<FloatingMiddleware[]>)
    floatingStrategy   ?: FloatingStrategy
    
    floatingAutoFlip   ?: boolean
    floatingAutoShift  ?: boolean
    floatingOffset     ?: number
    floatingShift      ?: number
    
    onFloatingUpdate   ?: EventHandler<FloatingPosition>
    
    
    
    // behaviors:
    lazy            ?: boolean
    
    
    
    // children:
    children        ?: React.ReactNode
}
const Popup = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: PopupProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet                    = usePopupStyleSheet();
    
    
    
    // states:
    const collapsibleState              = useCollapsible<TElement, TExpandedChangeEvent>(props);
    const isVisible                     = collapsibleState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    
    const [floatingPos, setFloatingPos] = useReducer(coordinateReducer, null);
    
    
    
    // rest props:
    const {
        // remove states props:
        
        // accessibilities:
        expanded         : _expanded,
        
        
        
        // floatings:
        floatingTarget,
        floatingPlacement   = 'top',
        floatingMiddleware,
        floatingStrategy    = 'absolute',
        
        floatingAutoFlip    = false,
        floatingAutoShift   = false,
        floatingOffset      = 0,
        floatingShift       = 0,
        
        onFloatingUpdate,
        
        
        
        // styles:
        style,
        
        
        
        // behaviors:
        lazy             = false,
        
        
        
        // children:
        children,
    ...restBasicProps} = props;
    
    
    
    // refs:
    const popupRefInternal = useRef<TElement|null>(null);
    const mergedElmRef     = useMergeRefs(
        // preserves the original `elmRef`:
        props.elmRef,
        
        
        
        popupRefInternal,
    );
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // states:
        collapsibleState.class,
    );
    const classes      = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // floatings:
        ( floatingTarget                 || null) && 'overlay',
        ((floatingTarget && floatingPos) || null) && floatingPos?.placement,
    );
    
    
    
    // styles:
    const mergedStyle = useMemo(() => ({
        // positions:
        position : ( floatingTarget                 || undefined) && floatingStrategy,
        left     : ((floatingTarget && floatingPos) || undefined) && `${floatingPos?.x}px`,
        top      : ((floatingTarget && floatingPos) || undefined) && `${floatingPos?.y}px`,
        
        
        
        // preserves the original `style` (can overwrite the `.style`):
        ...(style ?? {}),
    }), [floatingStrategy, floatingPos, style]);
    
    
    
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
    const handleAnimationEnd        = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        
        // states:
        collapsibleState.handleAnimationEnd,
    );
    
    
    
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!isVisible) return; // <Popup> is fully hidden => no need to update
        
        const target = (floatingTarget instanceof Element) ? floatingTarget : floatingTarget?.current;
        if (!target)    return; // [floatingTarget] was not specified => nothing to do
        
        const popup  = popupRefInternal.current;
        if (!popup)     return; // <Popup> was unloaded => nothing to do
        
        
        
        // handlers:
        const triggerFloatingUpdate = async () => {
            // calculate the proper position of the <Popup>:
            const floatingPosition = await computePosition(/*reference: */target, /*floating: */popup as unknown as HTMLElement, /*options: */{
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
        const stopUpdate = autoUpdate(target, popup as unknown as HTMLElement, triggerFloatingUpdate);
        
        
        
        // cleanups:
        return () => {
            clearTimeout(cancelTimeout);
            stopUpdate();
        };
    }, [
        // conditions:
        isVisible,
        
        
        
        // floatings:
        floatingTarget,
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
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...restBasicProps}
            
            
            
            // refs:
            elmRef={mergedElmRef}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? 'status'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            classes={classes}
            
            
            
            // styles:
            style={mergedStyle}
                    
                    
                    
            // [open]:
            {...collapsibleState.props}
            
            
            
            // handlers:
            onAnimationEnd={handleAnimationEnd}
        >
            { (!lazy || isVisible) && children }
        </Basic>
    );
};
export {
    Popup,
    Popup as default,
}

export type { FloatingPlacement, FloatingMiddleware, FloatingStrategy, FloatingPosition, FloatingSide }
