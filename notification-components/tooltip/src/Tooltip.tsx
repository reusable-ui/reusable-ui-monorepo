// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useRef,
    useCallback,
}                           from 'react'

// cssfn:
import type {
    // types:
    Optional,
}                           from '@cssfn/types'                 // cssfn general types
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    rules,
    variants,
    states,
    
    
    
    // combinators:
    children,
    
    
    
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
    usesPrefixedProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'         // a spacer (gap) management system
import {
    // configs:
    typos,
}                           from '@reusable-ui/typos'           // a typography management system
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
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // hooks:
    usesSizeVariant,
}                           from '@reusable-ui/basic'           // a base component
export type {
    // types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
    PopupSide,
}                           from '@reusable-ui/popup'           // a base component
import {
    // types:
    PopupPlacement,
    PopupMiddleware,
    PopupPosition,
    PopupSide,
    
    
    
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
    arrowMiddleware,
}                           from '@floating-ui/dom'             // a popup utility



// defaults:
const _defaultArrowAriaHidden : boolean            = true      // the arrow is just for decoration purpose, no meaningful content
const _defaultArrowClasses    : Optional<string>[] = ['arrow']



// styles:
const arrowElm = ':where(.arrow)' // zero specificity



export const usesTooltipLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesPopupLayout(),
        ]),
        ...style({
            // layouts:
            display : 'block',
            
            
            
            // children:
            ...children(arrowElm, {
                // layouts:
                content     : '""',
                display     : 'block',
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
        }),
    });
};
export const usesTooltipVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(tooltips);
    
    
    
    return style({
        ...imports([
            // variants:
            usesPopupVariants(),
            
            // layouts:
            sizeVariantRule,
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

export const useTooltipStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesTooltipLayout(),
        
        // variants:
        usesTooltipVariants(),
        
        // states:
        usesTooltipStates(),
    ]),
}), { id: '3h41koviqh' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [tooltips, tooltipValues, cssTooltipConfig] = cssConfig(() => {
    const basics = {
        // sizes:
        arrowInlineSize      : '0.8rem'                                                                     as CssKnownProps['inlineSize'],
        arrowBlockSize       : '0.8rem'                                                                     as CssKnownProps['blockSize' ],
        
     // arrowClipPath        : 'polygon(100% 0, 100% 100%, 0 100%)'                                         as CssKnownProps['clipPath'  ],
        arrowClipPath        : 'polygon(200% -100%, 200% 200%, -100% 200%)'                                 as CssKnownProps['clipPath'  ], // compensates for boxShadow
        
        arrowTopTransform    : [['scaleX(0.7)', 'translateY(calc((50% - 0.8px) *  1))', 'rotate(45deg)' ]]  as CssKnownProps['transform' ],
        arrowRightTransform  : [['scaleY(0.7)', 'translateX(calc((50% - 0.8px) * -1))', 'rotate(135deg)']]  as CssKnownProps['transform' ],
        arrowBottomTransform : [['scaleX(0.7)', 'translateY(calc((50% - 0.8px) * -1))', 'rotate(225deg)']]  as CssKnownProps['transform' ],
        arrowLeftTransform   : [['scaleY(0.7)', 'translateX(calc((50% - 0.8px) *  1))', 'rotate(315deg)']]  as CssKnownProps['transform' ],
        
        
        
        // borders:
        boxShadow            : [[0, 0, '10px', 'rgba(0,0,0,0.5)']]                                          as CssKnownProps['boxShadow'],
        
        
        
        // typos:
        whiteSpace           : 'normal'                                                                     as CssKnownProps['whiteSpace'],
        fontSize             : [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']]                as CssKnownProps['fontSize'  ],
        fontSizeSm           : typos.fontSizeSm                                                             as CssKnownProps['fontSize'  ],
        fontSizeLg           : typos.fontSizeNm                                                             as CssKnownProps['fontSize'  ],
    };
    
    
    
    return {
        ...basics,
        
        
        
        // sizes:
        arrowInlineSizeSm    : [['calc((', basics.arrowInlineSize, ')*0.75)']]                              as CssKnownProps['inlineSize'],
        arrowBlockSizeSm     : [['calc((', basics.arrowBlockSize , ')*0.75)']]                              as CssKnownProps['blockSize' ],
        arrowInlineSizeLg    : [['calc((', basics.arrowInlineSize, ')*1.50)']]                              as CssKnownProps['inlineSize'],
        arrowBlockSizeLg     : [['calc((', basics.arrowBlockSize , ')*1.50)']]                              as CssKnownProps['blockSize' ],
    };
}, { prefix: 'ttip' });



// utilities:
const isTargetEnabled = (target: Element|null|undefined): boolean => {
    // conditions:
    if (!target) return false; // if no target => assumes target as disabled
    
    
    
    return !target.matches(':disabled, [aria-disabled]:not([aria-disabled="false"])')
};



export interface ArrowProps {
    arrow     : Element
    placement : PopupPlacement
}
export type ArrowSize           = readonly [number, number]
export type CalculateArrowSize  = (props: ArrowProps) => Promise<ArrowSize>
const defaultCalculateArrowSize : CalculateArrowSize = async ({ arrow }) => {
    const { width, height, }   = arrow.getBoundingClientRect();
    return [
        (width  / 2) - 1,
        (height / 2) - 1,
    ];
};



// react components:

export interface ArrowComponentProps
{
    // refs:
    arrowRef       ?: React.Ref<Element> // setter ref
    
    
    
    // components:
    arrowComponent ?: React.ReactComponentElement<any, GenericProps<Element>>
}

export interface TooltipProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        PopupProps<TElement>,
        
        // components:
        ArrowComponentProps
{
    // popups:
    unsafe_calculateArrowSize ?: CalculateArrowSize
    
    
    
    // debounces:
    activeDelay               ?: number
    passiveDelay              ?: number
}
const Tooltip = <TElement extends Element = HTMLElement>(props: TooltipProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet          = useTooltipStyleSheet();
    
    
    
    // states:
    const [activeDn, setActiveDn] = useState<boolean>(false);
    
    
    
    // rest props:
    const {
        // accessibilities:
        active,
        
        
        
        // popups:
        unsafe_calculateArrowSize : calculateArrowSize = defaultCalculateArrowSize,
        
        
        
        // debounces:
        activeDelay  = 300,
        passiveDelay = 500,
        
        
        
        // components:
        arrowRef,
        arrowComponent = (<Generic<Element> /> as React.ReactComponentElement<any, GenericProps<Element>>),
    ...restPopupProps} = props;
    
    
    
    // refs:
    const arrowRefInternal = useRef<HTMLElement|SVGElement|null>(null);
    const mergedArrowRef   = useMergeRefs(
        // preserves the original `arrowRef` from `arrowComponent`:
        arrowComponent.props.elmRef,
        
        
        
        // preserves the original `arrowRef` from `props`:
        arrowRef,
        
        
        
        arrowRefInternal,
    );
    
    
    
    // fn props:
    const activeFn = active /*controllable*/ ?? activeDn /*uncontrollable*/;
    
    
    
    // callbacks:
    /**
     * Calculates the required offset (space) for the <arrow>.
     */
    const arrowOffsetMiddleware = useCallback((arrow: Element): PopupMiddleware => {
        return {
            name: 'arrowOffset',
            async fn({ placement, x, y }) {
                const [width, height]  = await (async (): Promise<ArrowSize> => {
                    const tooltip = arrow.parentElement;
                    if (!tooltip) {
                        // measure size:
                        return await calculateArrowSize({ arrow: arrow, placement });
                    } // if
                    
                    
                    
                    // backup:
                    const tooltipStyle = tooltip.style;
                    const {
                        display,
                        visibility,
                        transition,
                        animation,
                    } = tooltipStyle;
                    
                    
                    
                    try {
                        // temporary modify:
                        tooltipStyle.display    = 'block';
                        tooltipStyle.visibility = 'hidden';
                        tooltipStyle.transition = 'none';
                        tooltipStyle.animation  = 'none';
                        
                        
                        
                        // measure size:
                        return await calculateArrowSize({ arrow: arrow, placement });
                    }
                    finally {
                        // restore:
                        tooltipStyle.display    = display;
                        tooltipStyle.visibility = visibility;
                        tooltipStyle.transition = transition;
                        tooltipStyle.animation  = animation;
                    } // try
                })();
                
                
                
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
    const middlewareWithArrow   = useCallback(async (defaultMiddleware: PopupMiddleware[]) => {
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
                element : arrow,
                padding : maxBorderRadius ?? 0,
            }),
        ];
    }, [arrowOffsetMiddleware]);
    
    
    
    // handlers:
    const handleArrowPosition   = useEvent<EventHandler<PopupPosition>>((popupPosition) => {
        const arrow = arrowRefInternal.current;
        if (!arrow) return;
        
        
        
        const { middlewareData, placement } = popupPosition;
        const { x, y } = middlewareData.arrow ?? {};
        const basePlacement : PopupSide = placement.split('-')[0] as PopupSide;
        const invertBasePlacement : PopupSide = {
            top    : 'bottom',
            right  : 'left',
            bottom : 'top',
            left   : 'right',
        }[basePlacement] as PopupSide;
        
        
        
        const arrowStyle                = arrow.style;
        arrowStyle.left                 = ((x ?? false) !== false) ? `${x}px` : '';
        arrowStyle.top                  = ((y ?? false) !== false) ? `${y}px` : '';
        arrowStyle.right                = '';
        arrowStyle.bottom               = '';
        arrowStyle[invertBasePlacement] = '';
    }, []);
    const handlePopupUpdate     = useMergeEvents(
        // preserves the original `onPopupUpdate`:
        props.onPopupUpdate,
        
        
        
        // popups:
        handleArrowPosition,
    );
    
    
    
    // jsx:
    return (
        <Popup<TElement>
            // other props:
            {...restPopupProps}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? 'tooltip'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // accessibilities:
            active={activeFn}
            
            
            
            // handlers:
            onPopupUpdate={handlePopupUpdate}
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
                }
            )}
        </Popup>
    );
};
export {
    Tooltip,
    Tooltip as default,
}
