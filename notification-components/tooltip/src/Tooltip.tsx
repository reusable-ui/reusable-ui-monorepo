// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useCallback,
    useEffect,
}                           from 'react'

// cssfn:
import {
    // cssfn general types:
    Optional,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    rule,
    rules,
    children,
    style,
    imports,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a typography management system:
    typos,
    
    
    
    // react helper hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    
    
    
    // a capability of UI to float/overlay on the top/beside the another UI:
    FloatingPlacement,
    FloatingMiddleware,
    FloatingPosition,
    FloatingSide,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
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
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // react components:
    PopupProps,
    Popup,
}                           from '@reusable-ui/popup'           // a base component

// other libs:
import {
    // utilities:
    arrow as arrowMiddleware,
}                           from '@floating-ui/dom'             // a popup utility



// defaults:
const _defaultArrowAriaHidden : boolean            = true      // the arrow is just for decoration purpose, no meaningful content
const _defaultArrowClasses    : Optional<string>[] = ['arrow']



// configs:
export const [tooltips, tooltipValues, cssTooltipConfig] = cssConfig(() => {
    const basics = {
        // sizes:
        arrowInlineSize       : '0.8rem'                                                                    as CssKnownProps['inlineSize'],
        arrowBlockSize        : '0.8rem'                                                                    as CssKnownProps['blockSize' ],
        
     // arrowClipPath         : 'polygon(100% 0, 100% 100%, 0 100%)'                                        as CssKnownProps['clipPath'  ],
        arrowClipPath         : 'polygon(200% -100%, 200% 200%, -100% 200%)'                                as CssKnownProps['clipPath'  ], // compensates for boxShadow
        
        arrowTopTransform     : [['scaleX(0.7)', 'translateY(calc((50% - 0.8px) *  1))', 'rotate(45deg)' ]] as CssKnownProps['transform' ],
        arrowRightTransform   : [['scaleY(0.7)', 'translateX(calc((50% - 0.8px) * -1))', 'rotate(135deg)']] as CssKnownProps['transform' ],
        arrowBottomTransform  : [['scaleX(0.7)', 'translateY(calc((50% - 0.8px) * -1))', 'rotate(225deg)']] as CssKnownProps['transform' ],
        arrowLeftTransform    : [['scaleY(0.7)', 'translateX(calc((50% - 0.8px) *  1))', 'rotate(315deg)']] as CssKnownProps['transform' ],
        
        
        
        // borders:
        boxShadow             : [[0, 0, '10px', 'rgba(0,0,0,0.5)']]                                         as CssKnownProps['boxShadow'],
        
        
        
        // typos:
        whiteSpace            : 'normal'                                                                    as CssKnownProps['whiteSpace'],
        fontSize              : [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']]               as CssKnownProps['fontSize'  ],
        fontSizeSm            : typos.fontSizeSm                                                            as CssKnownProps['fontSize'  ],
        fontSizeLg            : typos.fontSizeNm                                                            as CssKnownProps['fontSize'  ],
    };
    
    
    
    return {
        ...basics,
        
        
        
        // sizes:
        arrowInlineSizeSm     : [['calc((', basics.arrowInlineSize, ')*0.75)']]                             as CssKnownProps['inlineSize'],
        arrowBlockSizeSm      : [['calc((', basics.arrowBlockSize , ')*0.75)']]                             as CssKnownProps['blockSize' ],
        arrowInlineSizeLg     : [['calc((', basics.arrowInlineSize, ')*1.50)']]                             as CssKnownProps['inlineSize'],
        arrowBlockSizeLg      : [['calc((', basics.arrowBlockSize , ')*1.50)']]                             as CssKnownProps['blockSize' ],
        
        
        
        // animations:
        topTransformOrigin    : 'bottom'                                                                    as CssKnownProps['transformOrigin'],
        rightTransformOrigin  : 'left'                                                                      as CssKnownProps['transformOrigin'],
        bottomTransformOrigin : 'top'                                                                       as CssKnownProps['transformOrigin'],
        leftTransformOrigin   : 'right'                                                                     as CssKnownProps['transformOrigin'],
    };
}, { prefix: 'ttip' });



// styles:
export const arrowElm = '.arrow' // one degree specificity to overwrite <Arrow> component



export const usesTooltipLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesPopupLayout(),
        ]),
        ...style({
            // layouts:
            display : 'inline-block', // use inline block, so it takes the width & height as needed
            
            
            
            // sizes:
            justifySelf   : 'center',         // protect from stretching by flex/grid
            alignSelf     : 'center',         // protect from stretching by flex/grid
            flex          : [[0, 0, 'auto']], // protect from stretching by flex
            
            
            
            // children:
            ...children(arrowElm, {
                // layouts:
                content     : '""',
                display     : 'inline-block', // use inline block, so it takes the width & height as needed
                ...rule([':not(.overlay)&', '.nude&'], {
                    display : 'none', // the arrow is not supported when [not overlayed] or [nude=true]
                }),
                
                
                
                // positions:
                position    : 'absolute', // absolute position, so we can move the location easily
                
                
                
                // backgrounds:
                backg       : 'inherit', // copy the background color. for background image, it may look strange
                
                
                
                // borders:
                border      : 'inherit', // copy border style|width|color
                boxShadow   : 'inherit', // copy shadow
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(tooltips, 'arrow')), // apply config's cssProps starting with arrow***
                ...rules([
                    ...['top', 'bottom', 'left', 'right']
                    .map((tooltipPos) =>
                        rule([
                            `.${tooltipPos}&`,
                            `.${tooltipPos}-start&`,
                            `.${tooltipPos}-end&`,
                        ], {
                            // customize:
                            ...usesCssProps(usesPrefixedProps(usesPrefixedProps(tooltips, 'arrow'), tooltipPos)), // apply config's cssProps starting with arrow*** and then starting with ***${tooltipPos}
                        }),
                    ),
                ]),
            }),
            
            
            
            // customize:
            ...usesCssProps(tooltips), // apply config's cssProps
            ...rules([
                ...['top', 'bottom', 'left', 'right']
                .map((tooltipPos) =>
                    rule([
                        `.${tooltipPos}&`,
                        `.${tooltipPos}-start&`,
                        `.${tooltipPos}-end&`,
                    ], {
                        // customize:
                        ...usesCssProps(usesPrefixedProps(tooltips, tooltipPos)), // apply config's cssProps starting with ***${tooltipPos}
                    }),
                ),
            ]),
        }),
    });
};
export const usesTooltipVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(tooltips);
    
    
    
    return style({
        ...imports([
            // variants:
            usesPopupVariants(),
            resizableRule,
        ]),
    });
};
export const usesTooltipStates = () => {
    return style({
        ...imports([
            // states:
            usesPopupStates(),
        ]),
    });
};

export const useTooltipStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesTooltipLayout(),
        
        // variants:
        usesTooltipVariants(),
        
        // states:
        usesTooltipStates(),
    ]),
}), { id: '3h41koviqh' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// utilities:
const isTargetEnabled = (target: Element|null|undefined): boolean => {
    // conditions:
    if (!target) return false; // if no target => assumes target as disabled
    
    
    
    return !target.matches(':disabled, [aria-disabled]:not([aria-disabled="false"])')
};



export interface ArrowProps {
    arrow     : Element
    placement : FloatingPlacement
}
export type ArrowSize           = readonly [number, number]
export type CalculateArrowSize  = (props: ArrowProps) => Promise<ArrowSize>
const defaultCalculateArrowSize : CalculateArrowSize = async ({ arrow }) => {
    const tooltipStyle = arrow.parentElement?.style;
    const {
        display,
        visibility,
        transition,
        animation,
    } = tooltipStyle ?? {};
    try {
        // temporary modify:
        if (tooltipStyle) {
            tooltipStyle.display    = 'inline-block';
            tooltipStyle.visibility = 'hidden';
            tooltipStyle.transition = 'none';
            tooltipStyle.animation  = 'none';
        } // if
        
        
        
        // perform main calculations:
        const { width, height, }   = arrow.getBoundingClientRect();
        return [
            (width  / 2) - 1,
            (height / 2) - 1,
        ];
    }
    finally {
        // restore:
        if (tooltipStyle) {
            tooltipStyle.display    = display    ?? '';
            tooltipStyle.visibility = visibility ?? '';
            tooltipStyle.transition = transition ?? '';
            tooltipStyle.animation  = animation  ?? '';
        } // if
    } // try
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
    const styleSheet          = useTooltipStyleSheet();
    
    
    
    // states:
    const [expandedDn, setExpandedDn] = useState<boolean>(false);
    
    
    
    // rest props:
    const {
        // states:
        expanded,
        
        
        
        // floatable:
        unsafe_calculateArrowSize : calculateArrowSize = defaultCalculateArrowSize,
        floatingMiddleware,
        
        
        
        // debounces:
        expandDelay    = 300,
        collapseDelay  = 500,
        
        
        
        // components:
        arrowRef,
        arrowComponent = (<Generic<Element> /> as React.ReactComponentElement<any, GenericProps<Element>>),
    ...restPopupProps} = props;
    
    
    
    // refs:
    const arrowRefInternal = useRef<Element|null>(null);
    const mergedArrowRef   = useMergeRefs(
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
    const arrowOffsetMiddleware    = useCallback((arrow: Element): FloatingMiddleware => {
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
    }, [calculateArrowSize]);
    
    /**
     * Attaches an arrow element to the <Tooltip>.
     */
    const middlewareWithArrow      = useCallback(async (defaultMiddleware: FloatingMiddleware[]): Promise<FloatingMiddleware[]> => {
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
    }, [arrowOffsetMiddleware]);
    const mergedFloatingMiddleware = useCallback(async (defaultMiddleware: FloatingMiddleware[]): Promise<FloatingMiddleware[]> => {
        if (Array.isArray(floatingMiddleware)) return floatingMiddleware;
        
        
        
        const defaultMiddleware2 = await middlewareWithArrow(defaultMiddleware);
        
        
        
        // preserves the original `floatingMiddleware`:
        return floatingMiddleware ? await floatingMiddleware(defaultMiddleware2) : defaultMiddleware2;
    }, [floatingMiddleware, middlewareWithArrow]);
    
    
    
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
    return (
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
    );
};
export {
    Tooltip,
    Tooltip as default,
}
