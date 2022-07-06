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
import {
    // hooks:
    usesSizeVariant,
    ifNotNude,
    usesBorder,
    usesPadding,
    extendsPadding,
}                           from '@reusable-ui/basic'           // a base component
export {
    // types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
}                           from '@reusable-ui/popup'           // a base component
import {
    // styles:
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
    
    
    
    // react components:
    PopupProps,
    Popup,
}                           from '@reusable-ui/popup'           // a base component
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
    usesContentChildren,
    
    
    
    // configs:
    contents,
}                           from '@reusable-ui/content'         // a base component



// styles:
const iconElm    = ':where(.icon)';   // zero specificity
const bodyElm    = ':where(.body)';   // zero specificity
const controlElm = ':where(.button)'; // zero specificity



export const usesAlertLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesPopupLayout(),
            usesContentLayout(),
        ]),
        ...style({
            // layouts:
            display             : 'grid',        // use css grid for layouting, so we can customize the desired area later.
            
            // explicit areas:
            /*
                just one explicit area: `body`
                `icon` & `button` rely on implicit area
            */
            gridTemplateRows    : [['auto'/*fluid height*/]],
            gridTemplateColumns : [['auto'/*fluid width*/ ]],
            gridTemplateAreas   : [[
                '"body"',
            ]],
            
            // implicit areas:
            gridAutoFlow        : 'column',      // if child's gridArea was not specified => place it automatically at horz direction
            gridAutoRows        : 'min-content', // other areas than `body` should take the minimum required height
            gridAutoColumns     : 'min-content', // other areas than `body` should take the minimum required width
            // the gridArea's size configured as *minimum* content's size required => no free space left to distribute => so (justify|algin)Content is *not required*
            
            // child default sizes:
            justifyItems        : 'stretch',     // each section fills the entire area's width
            alignItems          : 'stretch',     // each section fills the entire area's height
            
            
            
            // customize:
            ...usesCssProps(alerts), // apply config's cssProps
            
            
            
            // spacings:
            
            // let's Reusable-UI system to manage paddingInline & paddingBlock:
            ...extendsPadding(alerts),
        }),
    });
};
export const usesAlertVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(alerts);
    
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
                ...usesCssProps(usesPrefixedProps(alerts, 'pill')), // apply config's cssProps starting with pill***
            }),
            rule('.square', {
                // customize:
                ...usesCssProps(usesPrefixedProps(alerts, 'square')), // apply config's cssProps starting with square***
            }),
            rule('.circle', {
                // customize:
                ...usesCssProps(usesPrefixedProps(alerts, 'circle')), // apply config's cssProps starting with circle***
            }),
        ]),
    });
};
export const usesAlertStates = () => {
    return style({
        ...imports([
            // states:
            usesPopupStates(),
        ]),
    });
};

export const useAlertStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesAlertLayout(),
        
        // variants:
        usesAlertVariants(),
        
        // states:
        usesAlertStates(),
    ]),
}), { id: 'a5qyy5nbby' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [alerts, alertValues, cssAlertConfig] = cssConfig(() => {
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
}, { prefix: 'alrt' });



// react components:
export interface AlertProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        PopupProps<TElement>
{
    // accessibilities:
    label ?: string
}
const Alert = <TElement extends Element = HTMLElement>(props: AlertProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet   = useAlertStyleSheet();
    
    
    
    // rest props:
    const {
        // appearances:
        alertStyle : _alertStyle,
        
        
        
        // accessibilities:
        active,
        label,
        
        
        
        // children:
        children,
    ...restPopupProps} = props;
    
    
    
    // fn props:
    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const autoActive : boolean = !!(props.children || false);
    const activeFn   : boolean = active /*controllable*/ ?? autoActive /*uncontrollable*/;
    
    
    
    // jsx:
    return (
        <Popup<TElement>
            // other props:
            {...restPopupProps}
            
            
            
            // semantics:
            tag={props.tag ?? 'span'}
            semanticRole={props.semanticRole ?? 'status'}
            
            aria-label={props['aria-label'] ?? label}
            
            
            
            // variants:
            mild={props.mild ?? false}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // accessibilities:
            active={activeFn}
        >
            { props.children }
        </Popup>
    );
};
export {
    Alert,
    Alert as default,
}
