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
    // hooks:
    ExpandCollapseVars,
    ifExpanding,
    ifCollapsing,
    ifCollapsed,
    usesExpandCollapseState as baseUsesExpandCollapseState,
    ExpandChangeEvent,
    ExpandableProps,
    useExpandCollapseState,
}                           from '@reusable-ui/expandable'      // a capability of UI to expand/reduce its size or toggle the visibility
import {
    // types:
    StateMixin,
    
    
    
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
    Placement             as PopupPlacement,
    Middleware            as PopupMiddleware,
    Strategy              as PopupStrategy,
    Side                  as PopupSide,
    
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

//#region expandable
/**
 * Uses expand & collapse states.
 * @returns A `StateMixin<ExpandCollapseVars>` represents expand & collapse state definitions.
 */
export const usesExpandCollapseState = (): StateMixin<ExpandCollapseVars> => {
    // dependencies:
    
    // accessibilities:
    const [expandRule, expands] = baseUsesExpandCollapseState();
    
    
    
    return [
        () => style({
            ...imports([
                // accessibilities:
                expandRule,
            ]),
            ...states([
                ifExpanding({
                    ...vars({
                        [expands.anim] : popups.animExpand,
                    }),
                }),
                ifCollapsing({
                    ...vars({
                        [expands.anim] : popups.animCollapse,
                    }),
                }),
            ]),
        }),
        expands,
    ];
};
//#endregion expandable



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
    const [expandCollapseStateRule] = usesExpandCollapseState();
    
    
    
    return style({
        ...imports([
            // accessibilities:
            expandCollapseStateRule,
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
    keyframesExpand.value   = 'expand';   // the @keyframes name should contain 'expand'   in order to be recognized by `useExpandCollapseState`
    const [keyframesCollapseRule, keyframesCollapse] = keyframes({
        from  : frameExpanded,
        '30%' : frameIntermediate,
        to    : frameCollapsed,
    });
    keyframesCollapse.value = 'collapse'; // the @keyframes name should contain 'collapse' in order to be recognized by `useExpandCollapseState`
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
export interface PopupProps<TElement extends Element = HTMLElement, TExpandChangeEvent extends ExpandChangeEvent = ExpandChangeEvent>
    extends
        // bases:
        BasicProps<TElement>,
        
        // accessibilities:
        Omit<ExpandableProps<TExpandChangeEvent>,
            |'onExpandedChange' // not implemented yet
        >
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
const Popup = <TElement extends Element = HTMLElement, TExpandChangeEvent extends ExpandChangeEvent = ExpandChangeEvent>(props: PopupProps<TElement, TExpandChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet              = usePopupStyleSheet();
    
    
    
    // states:
    
    // accessibilities:
    const expandCollapseState     = useExpandCollapseState<TElement, TExpandChangeEvent>(props);
    const isVisible               = expandCollapseState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    const [popupPos, setPopupPos] = useReducer(coordinateReducer, null);
    
    
    
    // rest props:
    const {
        // remove states props:
        
        // accessibilities:
        expanded         : _expanded,
        
        
        
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
        
        
        
        // accessibilities:
        expandCollapseState.class,
    );
    const classes      = useMergeClasses(
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
        expandCollapseState.handleAnimationEnd,
    );
    
    
    
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!isVisible) return; // <Popup> is fully hidden => no need to update
        
        const target = (targetRef instanceof Element) ? targetRef : targetRef?.current;
        if (!target)    return; // [targetRef] was not specified => nothing to do
        
        const popup  = popupRefInternal.current;
        if (!popup)     return; // <Popup> was unloaded => nothing to do
        
        
        
        // handlers:
        const triggerPopupUpdate = async () => {
            // calculate the proper position of the <Popup>:
            const popupPosition = await computePosition(/*reference: */target, /*floating: */popup as unknown as HTMLElement, /*options: */{
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
        const stopUpdate = autoUpdate(target, popup as unknown as HTMLElement, triggerPopupUpdate);
        
        
        
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

export type { PopupPlacement, PopupMiddleware, PopupStrategy, PopupPosition, PopupSide }
