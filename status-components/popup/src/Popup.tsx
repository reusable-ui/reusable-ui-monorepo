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
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
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
    // utilities:
    cssVar,
    fallbacks,
}                           from '@cssfn/css-var'               // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    colors,
}                           from '@reusable-ui/colors'          // a color management system
import {
    // styles:
    stripoutPopup,
}                           from '@reusable-ui/stripouts'       // removes browser's default stylesheet
import {
    // hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usePropEnabled,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    ThemeName,
    usesThemeVariant,
    usesThemeDefault as basicUsesThemeDefault,
    usesAnim,
    fallbackNoneBoxShadow,
    fallbackNoneFilter,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ActivePassiveVars,
    ifActived,
    ifActivating,
    ifPassivating,
    ifPassived,
    ifActive,
    ifPassive,
    usesActivePassiveState as indicatorUsesActivePassiveState,
    useActivePassiveState,
    
    
    
    // styles:
    usesIndicatorLayout,
    usesIndicatorVariants,
    usesIndicatorStates,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from '@reusable-ui/indicator'       // a base component

// other libs:
import type {
    // types:
    Placement             as PopupPlacement,
    Middleware            as PopupMiddleware,
    Strategy              as PopupStrategy,
    
    ComputePositionReturn as PopupPosition,
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
    const [activePassiveStateRule] = usesActivePassiveState();
    
    
    
    return style({
        ...imports([
            // accessibilities:
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
    targetRef       ?: React.RefObject<HTMLElement>|HTMLElement|null // getter ref
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
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restIndicatorProps}
            
            
            
            // refs:
            elmRef={mergedElmRef}
            
            
            
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
