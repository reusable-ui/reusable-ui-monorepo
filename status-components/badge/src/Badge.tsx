// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    ifEmpty,
    
    
    
    //combinators:
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
    borderRadiuses,
}                           from '@reusable-ui/borders'         // a border (stroke) management system
import {
    // styles:
    fillTextLineHeightLayout,
    fillTextLineWidthLayout,
}                           from '@reusable-ui/layouts'         // reusable common layouts
import {
    // configs:
    typos,
}                           from '@reusable-ui/typos'           // a typography management system
import {
    // hooks:
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import type {
    // type:
    ExpandedChangeEvent,
}                           from '@reusable-ui/collapsible'     // a capability of UI to expand/reduce its size or toggle the visibility
import {
    // hooks:
    usesSizeVariant,
    ifNotNude,
    usesBorder,
    usesPadding,
    extendsPadding,
}                           from '@reusable-ui/basic'           // a base component
import {
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // react components:
    PopupProps,
    Popup,
}                           from '@reusable-ui/popup'           // a base component



// hooks:

// appearances:

//#region badge style
export type BadgeStyle = 'pill'|'square'|'circle' // might be added more styles in the future
export interface BadgeVariant {
    badgeStyle ?: BadgeStyle
}
export const useBadgeVariant = (props: BadgeVariant) => {
    return {
        class: props.badgeStyle ?? null,
    };
};
//#endregion badge style



// styles:
export const usesBadgeLayout = () => {
    // dependencies:
    
    // spacings:
    const [, paddings] = usesPadding();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesPopupLayout(),
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
                [paddings.paddingInline] : paddings.paddingBlock,
            }),
            
            
            
            // typos:
            lineHeight    : 1,
            textAlign     : 'center',
            
            
            
            // customize:
            ...usesCssProps(badges), // apply config's cssProps
            
            
            
            // spacings:
            
            // let's Reusable-UI system to manage paddingInline & paddingBlock:
            ...extendsPadding(badges),
        }),
    });
};
export const usesBadgeVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(badges);
    
    // borders:
    const [, borders      ] = usesBorder();
    
    // spacings:
    const [, paddings     ] = usesPadding();
    
    
    
    return style({
        ...imports([
            // variants:
            usesPopupVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
        ...variants([
            rule(['.pill', '.circle'], {
                // borders:
                // big rounded corners on top:
                [borders.borderStartStartRadius] : borderRadiuses.pill,
                [borders.borderStartEndRadius  ] : borderRadiuses.pill,
                // big rounded corners on bottom:
                [borders.borderEndStartRadius  ] : borderRadiuses.pill,
                [borders.borderEndEndRadius    ] : borderRadiuses.pill,
            }),
            rule(['.square', '.circle'], {
                ...ifNotNude({
                    // spacings:
                    // makes the width and height equal, by making `paddingInline === paddingBlock`:
                    [paddings.paddingInline] : paddings.paddingBlock,
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

export const useBadgeStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesBadgeLayout(),
        
        // variants:
        usesBadgeVariants(),
        
        // states:
        usesBadgeStates(),
    ]),
}), { id: 'a7wkthow0k' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [badges, badgeValues, cssBadgeConfig] = cssConfig(() => {
    const basics = {
        // spacings:
        paddingInline   : '0.65em'                                          as CssKnownProps['paddingInline'],
        paddingBlock    : '0.35em'                                          as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        whiteSpace      : 'normal'                                          as CssKnownProps['whiteSpace'],
        fontSize        : '0.75em'                                          as CssKnownProps['fontSize'],
        fontWeight      : typos.fontWeightBold                              as CssKnownProps['fontWeight'],
    };
    
    
    
    return {
        ...basics,
        
        
        
        // spacings:
        paddingInlineSm : [['calc(', basics.paddingInline, '/', 1.25, ')']] as CssKnownProps['paddingInline'],
        paddingBlockSm  : [['calc(', basics.paddingBlock , '/', 1.25, ')']] as CssKnownProps['paddingBlock' ],
        paddingInlineLg : [['calc(', basics.paddingInline, '*', 1.25, ')']] as CssKnownProps['paddingInline'],
        paddingBlockLg  : [['calc(', basics.paddingBlock , '*', 1.25, ')']] as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        fontSizeSm      : [['calc(', basics.fontSize     , '/', 1.25, ')']] as CssKnownProps['fontSize'],
        fontSizeLg      : [['calc(', basics.fontSize     , '*', 1.25, ')']] as CssKnownProps['fontSize'],
    };
}, { prefix: 'bge' });



// react components:
export interface BadgeProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        PopupProps<TElement, TExpandedChangeEvent>,
        
        // appearances:
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
        // appearances:
        badgeStyle : _badgeStyle,
        
        
        
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
            
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            
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
