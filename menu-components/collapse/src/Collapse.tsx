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
    typos,
}                           from '@reusable-ui/typos'           // a typography management system
import {
    // hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
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
    arrow as arrowMiddleware,
}                           from '@floating-ui/dom'             // a popup utility



// defaults:
const _defaultArrowAriaHidden : boolean            = true      // the arrow is just for decoration purpose, no meaningful content
const _defaultArrowClasses    : Optional<string>[] = ['arrow']



// styles:
const arrowElm = ':where(.arrow)' // zero specificity



export const usesCollapseLayout = () => {
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
                ...usesCssProps(usesPrefixedProps(collapses, 'arrow')), // apply config's cssProps starting with arrow***
            }),
            
            
            
            // customize:
            ...usesCssProps(collapses), // apply config's cssProps
        }),
    });
};
export const usesCollapseVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(collapses);
    
    
    
    return style({
        ...imports([
            // variants:
            usesPopupVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
    });
};
export const usesCollapseStates = () => {
    return style({
        ...imports([
            // states:
            usesPopupStates(),
        ]),
    });
};

export const useCollapseStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesCollapseLayout(),
        
        // variants:
        usesCollapseVariants(),
        
        // states:
        usesCollapseStates(),
    ]),
}), { id: 'gh2oi6zjs0' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [collapses, collapseValues, cssCollapseConfig] = cssConfig(() => {
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
}, { prefix: 'clps' });



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

export interface CollapseProps<TElement extends Element = HTMLElement>
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
const Collapse = <TElement extends Element = HTMLElement>(props: CollapseProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet          = useCollapseStyleSheet();
    
    
    
    // states:
    const [activeDn, setActiveDn] = useState<boolean>(false);
    
    
    
    // rest props:
    const {
        // accessibilities:
        active,
        
        
        
        // popups:
        unsafe_calculateArrowSize : calculateArrowSize = defaultCalculateArrowSize,
        popupMiddleware,
        
        
        
        // debounces:
        activeDelay  = 300,
        passiveDelay = 500,
        
        
        
        // components:
        arrowRef,
        arrowComponent = (<Generic<Element> /> as React.ReactComponentElement<any, GenericProps<Element>>),
    ...restPopupProps} = props;
    
    
    
    // refs:
    const arrowRefInternal = useRef<Element|null>(null);
    const mergedArrowRef   = useMergeRefs(
        // preserves the original `arrowRef` from `arrowComponent`:
        arrowComponent.props.elmRef,
        
        
        
        // preserves the original `arrowRef` from `props`:
        arrowRef,
        
        
        
        arrowRefInternal,
    );
    
    
    
    // fn props:
    const isControllableActive = (active !== undefined);
    const activeFn = active /*controllable*/ ?? activeDn /*uncontrollable*/;
    
    
    
    // jsx:
    return (
        <Popup<TElement>
            // other props:
            {...restPopupProps}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? 'collapse'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // accessibilities:
            active={activeFn}
        />
    );
};
export {
    Collapse,
    Collapse as default,
}
