// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    rule,
    variants,
    ifEmpty,
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
    // a border (stroke) management system:
    borderRadiuses,
    
    
    
    // a typography management system:
    typos,
    
    
    
    // reusable common layouts:
    fillTextLineHeightLayout,
    fillTextLineWidthLayout,
    
    
    
    // react helper hooks:
    useMergeClasses,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // nude variant of UI:
    ifNotNude,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // react components:
    PopupProps,
    Popup,
}                           from '@reusable-ui/popup'           // a base component



// configs:
export const [badges, badgeValues, cssBadgeConfig] = cssConfig(() => {
    const basics = {
        // spacings:
        paddingInline   : '0.65em'                                          as CssKnownProps['paddingInline'],
        paddingBlock    : '0.35em'                                          as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        whiteSpace      : 'normal'                                          as CssKnownProps['whiteSpace'    ],
        fontSize        : '0.75em'                                          as CssKnownProps['fontSize'      ],
        fontWeight      : typos.fontWeightBold                              as CssKnownProps['fontWeight'    ],
    };
    
    
    
    return {
        ...basics,
        
        
        
        // spacings:
        paddingInlineSm : [['calc(', basics.paddingInline, '/', 1.25, ')']] as CssKnownProps['paddingInline'],
        paddingBlockSm  : [['calc(', basics.paddingBlock , '/', 1.25, ')']] as CssKnownProps['paddingBlock' ],
        paddingInlineLg : [['calc(', basics.paddingInline, '*', 1.25, ')']] as CssKnownProps['paddingInline'],
        paddingBlockLg  : [['calc(', basics.paddingBlock , '*', 1.25, ')']] as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        fontSizeSm      : [['calc(', basics.fontSize     , '/', 1.25, ')']] as CssKnownProps['fontSize'      ],
        fontSizeLg      : [['calc(', basics.fontSize     , '*', 1.25, ')']] as CssKnownProps['fontSize'      ],
    };
}, { prefix: 'bge' });



// styles:
export type BadgeStyle = 'regular'|'pill'|'square'|'circle' // might be added more styles in the future
export interface BadgeVariant {
    badgeStyle ?: BadgeStyle
}
export const useBadgeVariant = ({badgeStyle}: BadgeVariant) => {
    return {
        class: (badgeStyle === 'regular') ? null : badgeStyle,
    };
};



export const usesBadgeLayout = () => {
    // dependencies:
    
    // features:
    const {paddingRule, paddingVars} = usesPadding(badges);
    
    
    
    return style({
        ...imports([
            // layouts:
            usesPopupLayout(),
            
            // features:
            paddingRule,
        ]),
        ...style({
            // layouts:
            display       : 'inline-block', // use inline block, so it takes the width & height as needed
            ...ifEmpty({
                display   : 'inline-grid',  // required for filling the width & height using `::before` & `::after`
            }),
            
            
            
            // positions:
            verticalAlign : 'baseline',    // <Badge>'s text should be aligned with sibling text, so the <Badge> behave like <span> wrapper
            
            
            
            // sizes:
            justifySelf   : 'center', // protect from stretching by flex/grid
            alignSelf     : 'center', // protect from stretching by flex/grid
            ...ifEmpty({
                // makes the width and height equal, by filling `width === height === line(Height/Width)`:
                
                // width  : '1em', // not working, (font-width  !== 1em) if the font-size is fractional number
                // height : '1em', // not working, (font-height !== 1em) if the font-size is fractional number
                
                ...children('::before', {
                    ...imports([
                        fillTextLineHeightLayout(),
                    ]),
                }),
                ...children('::after', {
                    ...imports([
                        fillTextLineWidthLayout(),
                    ]),
                }),
            }),
            
            
            
            // spacings:
            ...ifEmpty({
                // makes the width and height equal, by making `paddingInline === paddingBlock`:
                [paddingVars.paddingInline] : paddingVars.paddingBlock,
            }),
            
            
            
            // typos:
            lineHeight    : 1,
            textAlign     : 'center',
            
            
            
            // customize:
            ...usesCssProps(badges), // apply config's cssProps
            
            
            
            // spacings:
         // padding       : paddingVars.padding,
            paddingInline : paddingVars.paddingInline,
            paddingBlock  : paddingVars.paddingBlock,
        }),
    });
};
export const usesBadgeVariants = () => {
    // dependencies:
    
    // features:
    const {borderVars   } = usesBorder();
    const {paddingVars  } = usesPadding();
    
    // variants:
    const {resizableRule} = usesResizable(badges);
    
    
    
    return style({
        /* write specific badgeStyle first, so it can be overriden by `.nude`, `.mild`, `.outlined`, etc */
        ...variants([
            rule(['.pill', '.circle'], {
                // borders:
                // big rounded corners on top:
                [borderVars.borderStartStartRadius] : borderRadiuses.pill,
                [borderVars.borderStartEndRadius  ] : borderRadiuses.pill,
                // big rounded corners on bottom:
                [borderVars.borderEndStartRadius  ] : borderRadiuses.pill,
                [borderVars.borderEndEndRadius    ] : borderRadiuses.pill,
            }),
            rule(['.square', '.circle'], {
                ...ifNotNude({
                    // spacings:
                    // makes the width and height equal, by making `paddingInline === paddingBlock`:
                    [paddingVars.paddingInline] : paddingVars.paddingBlock,
                }),
            }),
            rule('.pill', {
                // customize:
                ...usesCssProps(usesPrefixedProps(badges, 'pill')), // apply config's cssProps starting with pill***
            }),
            rule('.square', {
                // customize:
                ...usesCssProps(usesPrefixedProps(badges, 'square')), // apply config's cssProps starting with square***
            }),
            rule('.circle', {
                // customize:
                ...usesCssProps(usesPrefixedProps(badges, 'circle')), // apply config's cssProps starting with circle***
            }),
        ]),
        ...imports([
            // variants:
            usesPopupVariants(),
            resizableRule,
        ]),
    });
};
export const usesBadgeStates = () => {
    return style({
        ...imports([
            // states:
            usesPopupStates(),
        ]),
    });
};

export const useBadgeStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesBadgeLayout(),
        
        // variants:
        usesBadgeVariants(),
        
        // states:
        usesBadgeStates(),
    ]),
}), { id: 'a7wkthow0k' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface BadgeProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        PopupProps<TElement, TExpandedChangeEvent>,
        
        // variants:
        BadgeVariant
{
    // accessibilities:
    label ?: string
}
const Badge = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: BadgeProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet   = useBadgeStyleSheet();
    
    
    
    // variants:
    const badgeVariant = useBadgeVariant(props);
    
    
    
    // rest props:
    const {
        // variants:
        badgeStyle : _badgeStyle, // remove
        
        
        
        // accessibilities:
        label,
        
        
        
        // states:
        expanded,
        
        
        
        // children:
        children,
    ...restPopupProps} = props;
    
    
    
    // fn props:
    /*
     * state is expand/collapse based on [controllable expanded] (if set) and fallback to [uncontrollable expanded]
     */
    const autoExpanded : boolean = !!(props.children || false);
    const expandedFn   : boolean = expanded /*controllable*/ ?? autoExpanded /*uncontrollable*/;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        badgeVariant.class,
    );
    
    
    
    // jsx:
    return (
        <Popup<TElement, TExpandedChangeEvent>
            // other props:
            {...restPopupProps}
            
            
            
            // semantics:
            tag={props.tag ?? 'span'}
            
            aria-label={props['aria-label'] ?? label}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            
            
            
            // states:
            expanded={expandedFn}
        >
            { props.children }
        </Popup>
    );
};
export {
    Badge,
    Badge as default,
}
