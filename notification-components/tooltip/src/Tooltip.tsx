// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useEffect,
}                           from 'react'
import {
    createPortal,
}                           from 'react-dom'

// cssfn:
import type {
    // cssfn general types:
    Optional,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    
    
    
    // a capability of UI to float/overlay on the top/beside the another UI:
    FloatingMiddleware,
    FloatingPosition,
    FloatingSide,
    
    
    
    // a capability of UI to stack on top-most of another UI(s) regardless of DOM's stacking context:
    StackableProps,
    useStackable,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
    
    
    
    // a capability of UI to be focused
    selectorFocusVisibleWithin,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // react components:
    PopupProps,
    Popup,
}                           from '@reusable-ui/popup'           // a base component

// other libs:
import {
    // utilities:
    arrow as arrowMiddleware,
}                           from '@floating-ui/dom'             // a popup utility

// internals:
import {
    // features:
    CalculateArrowSize,
    calculateArrowSize as defaultCalculateArrowSize,
}                           from './features/arrow.js'



// defaults:
const _defaultArrowAriaHidden : boolean            = true      // the arrow is just for decoration purpose, no meaningful content
const _defaultArrowClasses    : Optional<string>[] = ['arrow']
const _defaultExpandDelay     : number             = 300 /* ms */
const _defaultCollapseDelay   : number             = 500 /* ms */


// styles:
export const useTooltipStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: '3h41koviqh' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// utilities:
const isTargetEnabled = (target: Element|null|undefined): boolean => {
    // conditions:
    if (!target) return false; // if no target => assumes target as disabled
    
    
    
    return !target.matches(':disabled, [aria-disabled]:not([aria-disabled="false"])')
};



// react components:

export interface ArrowComponentProps<TElement extends Element = HTMLElement>
{
    // refs:
    arrowRef       ?: React.Ref<TElement> // setter ref
    
    
    
    // components:
    arrowComponent ?: React.ReactComponentElement<any, GenericProps<TElement>>
}

export interface TooltipProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        PopupProps<TElement, TExpandedChangeEvent>,
        
        // capabilities:
        StackableProps,
        
        // components:
        ArrowComponentProps<Element>
{
    // floatable:
    unsafe_calculateArrowSize ?: CalculateArrowSize
    
    
    
    // debounces:
    expandDelay               ?: number
    collapseDelay             ?: number
}
const Tooltip = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: TooltipProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet                  = useTooltipStyleSheet();
    
    
    
    // states:
    const [expandedDn, setExpandedDn] = useState<boolean>(false);
    
    
    
    // capabilities:
    const {portalElm}                 = useStackable(props);
    
    
    
    // rest props:
    const {
        // states:
        expanded,
        
        
        
        // floatable:
        unsafe_calculateArrowSize : calculateArrowSize = defaultCalculateArrowSize,
        floatingMiddleware,
        
        
        
        // stackable:
        viewport       : _viewport,             // remove
        
        
        
        // debounces:
        expandDelay    = _defaultExpandDelay,   // remove
        collapseDelay  = _defaultCollapseDelay, // remove
        
        
        
        // components:
        arrowRef,
        arrowComponent = (<Generic<Element> /> as React.ReactComponentElement<any, GenericProps<Element>>),
    ...restPopupProps} = props;
    
    
    
    // refs:
    const arrowRefInternal  = useRef<Element|null>(null);
    const mergedArrowRef    = useMergeRefs(
        // preserves the original `elmRef` from `arrowComponent`:
        arrowComponent.props.elmRef,
        
        
        
        // preserves the original `arrowRef` from `props`:
        arrowRef,
        
        
        
        arrowRefInternal,
    );
    
    
    
    // fn props:
    const isControllableExpanded = (expanded !== undefined);
    const expandedFn             = expanded /*controllable*/ ?? expandedDn /*uncontrollable*/;
    
    
    
    // callbacks:
    /**
     * Calculates the required offset (space) for the <arrow>.
     */
    const arrowOffsetMiddleware    = useEvent((arrow: Element): FloatingMiddleware => {
        return {
            name: 'arrowOffset',
            async fn({ placement, x, y }) {
                const [width, height] = await calculateArrowSize({ arrow: arrow, placement });
                
                
                
                const basePlacement = placement.split('-')[0];
                const isTop         = (basePlacement === 'top'   );
                const isBottom      = (basePlacement === 'bottom');
                const isLeft        = (basePlacement === 'left'  );
                const isRight       = (basePlacement === 'right' );
                return {
                    x : x - (isLeft ? width  : 0) + (isRight  ? width  : 0),
                    y : y - (isTop  ? height : 0) + (isBottom ? height : 0),
                };
            },
        };
    });
    
    /**
     * Attaches an arrow element to the <Tooltip>.
     */
    const middlewareWithArrow      = useEvent(async (defaultMiddleware: FloatingMiddleware[]): Promise<FloatingMiddleware[]> => {
        const arrow = arrowRefInternal.current;
        if (!arrow) return defaultMiddleware;
        
        
        
        const maxBorderRadius = ((): number => {
            const tooltip = arrow.parentElement;
            if (!tooltip) return 0;
            
            
            
            const tooltipStyle = getComputedStyle(tooltip);
            return Math.max(
                Number.parseFloat(tooltipStyle.borderStartStartRadius),
                Number.parseFloat(tooltipStyle.borderStartEndRadius  ),
                Number.parseFloat(tooltipStyle.borderEndStartRadius  ),
                Number.parseFloat(tooltipStyle.borderEndEndRadius    ),
            );
        })();
        
        
        
        // `arrowOffsetMiddleware` should be inserted *after* the `offset` middleware,
        // so we need to find the index of `offset` middleware:
        const offsetMiddlewareIndex      = defaultMiddleware.findIndex((middleware) => (middleware.name === 'offset'));
        const arrowOffsetMiddlewareIndex = offsetMiddlewareIndex + 1;
        return [
            ...defaultMiddleware.slice(0, arrowOffsetMiddlewareIndex), // the `offset` middleware and prev(s)
            arrowOffsetMiddleware(arrow),                              // the inserted `arrowOffsetMiddleware`
            ...defaultMiddleware.slice(arrowOffsetMiddlewareIndex),    // the rest middleware(s)
            
            arrowMiddleware({                                          // the last `arrowMiddleware`
                element : arrow as HTMLElement,
                padding : maxBorderRadius ?? 0,
            }),
        ];
    });
    const mergedFloatingMiddleware = useEvent(async (defaultMiddleware: FloatingMiddleware[]): Promise<FloatingMiddleware[]> => {
        if (Array.isArray(floatingMiddleware)) return floatingMiddleware;
        
        
        
        const defaultMiddleware2 = await middlewareWithArrow(defaultMiddleware);
        
        
        
        // preserves the original `floatingMiddleware`:
        return floatingMiddleware ? await floatingMiddleware(defaultMiddleware2) : defaultMiddleware2;
    });
    
    
    
    // handlers:
    const handleArrowPosition      = useEvent<EventHandler<FloatingPosition>>((floatingPosition) => {
        const arrow = arrowRefInternal.current;
        if (!arrow) return;
        
        
        
        const { middlewareData, placement } = floatingPosition;
        const { x, y } = middlewareData.arrow ?? {};
        const basePlacement : FloatingSide = placement.split('-')[0] as FloatingSide;
        const invertBasePlacement : FloatingSide = {
            top    : 'bottom',
            right  : 'left',
            bottom : 'top',
            left   : 'right',
        }[basePlacement] as FloatingSide;
        
        
        
        const arrowStyle                = (arrow as (HTMLElement|SVGElement)).style;
        arrowStyle.left                 = ((x ?? false) !== false) ? `${x}px` /* set */ : '' /* reset */;
        arrowStyle.top                  = ((y ?? false) !== false) ? `${y}px` /* set */ : '' /* reset */;
        arrowStyle.right                = ''; /* reset */
        arrowStyle.bottom               = ''; /* reset */
        arrowStyle[invertBasePlacement] = '0px'; /* top => bottom:0px | bottom => top:0px | left => right:0px | right => left:0px */
    });
    const handleFloatingUpdate     = useMergeEvents(
        // preserves the original `onFloatingUpdate`:
        props.onFloatingUpdate,
        
        
        
        // actions:
        handleArrowPosition,
    );
    
    
    
    // dom effects:
    const [targetStates] = useState({
        hovered    : false,
        focused    : false,
        
        expanded   : false,
        expanding  : undefined as ReturnType<typeof setTimeout>|undefined,
        collapsing : undefined as ReturnType<typeof setTimeout>|undefined,
    });
    useEffect(() => {
        // conditions:
        if (isControllableExpanded) return; // controllable [expanded] is set => no uncontrollable required
        
        const floatingOn = props.floatingOn;
        const target     = (floatingOn instanceof Element) ? floatingOn : floatingOn?.current;
        if (!target)                return; // [floatingOn] was not specified => nothing to do
        
        
        
        // handlers:
        const handleDelayExpand   = () => {
            // conditions:
            if (targetStates.collapsing) {
                clearTimeout(targetStates.collapsing);  // cancel the collapsing process (if not too late)
                targetStates.collapsing = undefined;    // mark there's no running collapsing process
            } // if
            if (targetStates.expanded) return;          // already expanded => nothing to change
            
            
            
            if (!targetStates.expanding) {              // there's no running expanding process => create a new one
                targetStates.expanding = setTimeout(() => {
                    // conditions:
                    if (targetStates.expanded) return;  // already expanded => nothing to change
                    
                    
                    
                    targetStates.expanded = true;       // now mark as expanded
                    setExpandedDn(true);                // expand the <Tooltip>
                }, expandDelay);
            } // if
        };
        const handleDelayCollapse = () => {
            // conditions:
            if (targetStates.expanding) {
                clearTimeout(targetStates.expanding);   // cancel the expanding process (if not too late)
                targetStates.expanding = undefined;     // mark there's no running expanding process
            } // if
            if (!targetStates.expanded) return;         // already collapsed => nothing to change
            
            
            
            if (!targetStates.collapsing) {             // there's no running collapsing process => create a new one
                targetStates.collapsing = setTimeout(() => {
                    // conditions:
                    if (!targetStates.expanded) return; // already collapsed => nothing to change
                    
                    
                    
                    targetStates.expanded = false;      // now mark as collapsed
                    setExpandedDn(false);               // collapse the <Tooltip>
                }, collapseDelay);
            } // if
        };
        const handleChange = () => {
            const expanded = (targetStates.hovered || targetStates.focused);
            if (expanded) {
                handleDelayExpand();
            }
            else {
                handleDelayCollapse();
            } // if
        };
        const handleHover  = () => {
            if (!isTargetEnabled(target)) return; // <target> is disabled => no <Tooltip> required
            
            
            
            targetStates.hovered = true;
            handleChange();
        };
        const handleLeave  = () => {
            if (!isTargetEnabled(target)) return; // <target> is disabled => no <Tooltip> required
            
            
            
            targetStates.hovered = false;
            handleChange();
        };
        const handleFocus  = (event: Event) => {
            if (!isTargetEnabled(target)) return; // <target> is disabled => no <Tooltip> required
            if (!(event.currentTarget as HTMLElement|null)?.matches?.(selectorFocusVisibleWithin))
                                          return; // not :focus-visible-within => supporess the actual focus
            
            
            
            targetStates.focused = true;
            handleChange();
        };
        const handleBlur   = () => {
            if (!isTargetEnabled(target)) return; // <target> is disabled => no <Tooltip> required
            
            
            
            targetStates.focused = false;
            handleChange();
        };
        const handleKeyDown  = handleFocus;
        
        
        
        // setups:
        targetStates.hovered  = target.matches(':hover');
        targetStates.focused  = target.matches(selectorFocusVisibleWithin);
        targetStates.expanded = (targetStates.hovered || targetStates.focused);
        
        target.addEventListener('mouseenter', handleHover);
        target.addEventListener('mouseleave', handleLeave);
        target.addEventListener('focus'     , handleFocus, { capture: true }); // force `focus` as bubbling
        target.addEventListener('blur'      , handleBlur , { capture: true }); // force `blur`  as bubbling
        target.addEventListener('keydown'   , handleKeyDown);
        
        
        
        // cleanups:
        return () => {
            target.removeEventListener('mouseenter', handleHover);
            target.removeEventListener('mouseleave', handleLeave);
            target.removeEventListener('focus'     , handleFocus, { capture: true });
            target.removeEventListener('blur'      , handleBlur , { capture: true });
            target.removeEventListener('keydown'   , handleKeyDown);
        };
    }, [isControllableExpanded, props.floatingOn, expandDelay, collapseDelay]);
    
    
    
    // jsx:
    if (!portalElm) return null; // server side -or- client side but not already hydrated => nothing to render
    return createPortal( // workaround for zIndex stacking context
        <Popup<TElement, TExpandedChangeEvent>
            // other props:
            {...restPopupProps}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? 'tooltip'}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // states:
            expanded={expandedFn}
            
            
            
            // floatable:
            floatingPlacement  = {props.floatingPlacement ?? 'top'}
            floatingAutoFlip   = {props.floatingAutoFlip  ?? true }
            floatingAutoShift  = {props.floatingAutoShift ?? true }
            
            floatingMiddleware = {mergedFloatingMiddleware}
            
            
            
            // handlers:
            onFloatingUpdate={handleFloatingUpdate}
        >
            { props.children }
            
            {/* <Arrow> */}
            {React.cloneElement<GenericProps<Element>>(arrowComponent,
                // props:
                {
                    // refs:
                    elmRef        : mergedArrowRef,
                    
                    
                    
                    // semantics:
                    'aria-hidden' : arrowComponent.props['aria-hidden'] ?? _defaultArrowAriaHidden,
                    
                    
                    
                    // classes:
                    classes       : arrowComponent.props.classes ?? _defaultArrowClasses,
                },
            )}
        </Popup>
    , portalElm);
};
export {
    Tooltip,
    Tooltip as default,
}
