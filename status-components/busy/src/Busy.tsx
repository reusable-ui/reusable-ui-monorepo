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
    
    BadgeStyle,
}                           from '@reusable-ui/badge'           // a base component
import {
    // styles:
    usesBadgeLayout,
    usesBadgeVariants,
    usesBadgeStates,
    
    
    
    // react components:
    BadgeProps,
    Badge,
}                           from '@reusable-ui/badge'           // a base component



// styles:
export const usesBusyLayout = () => {
    // dependencies:
    
    // spacings:
    const [, paddings] = usesPadding();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesBadgeLayout(),
        ]),
        ...style({
            // layouts:
            display       : 'inline-block', // use inline block, so it takes the width & height as needed
            ...ifEmpty({
                display   : 'inline-grid',  // required for filling the width & height using `::before` & `::after`
            }),
            
            
            
            // positions:
            verticalAlign : 'baseline',    // <Busy>'s text should be aligned with sibling text, so the <Busy> behave like <span> wrapper
            
            
            
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
            ...usesCssProps(busies), // apply config's cssProps
            
            
            
            // spacings:
            
            // let's Reusable-UI system to manage paddingInline & paddingBlock:
            ...extendsPadding(busies),
        }),
    });
};
export const usesBusyVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(busies);
    
    // borders:
    const [, borders      ] = usesBorder();
    
    // spacings:
    const [, paddings     ] = usesPadding();
    
    
    
    return style({
        ...imports([
            // variants:
            usesBadgeVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
    });
};
export const usesBusyStates = () => {
    return style({
        ...imports([
            // states:
            usesBadgeStates(),
        ]),
    });
};

export const useBusyStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesBusyLayout(),
        
        // variants:
        usesBusyVariants(),
        
        // states:
        usesBusyStates(),
    ]),
}), { id: 'y6oksyrdiq' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [busies, busyValues, cssBusyConfig] = cssConfig(() => {
    const basics = {
        // spacings:
        paddingInline : '0.65em'                                            as CssKnownProps['paddingInline'],
        paddingBlock  : '0.35em'                                            as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        whiteSpace    : 'normal'                                            as CssKnownProps['whiteSpace'],
        fontSize      : '0.75em'                                            as CssKnownProps['fontSize'],
        fontWeight    : typos.fontWeightBold                                as CssKnownProps['fontWeight'],
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
}, { prefix: 'busy' });



// react components:
export interface BusyProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        BadgeProps<TElement>
{
    // accessibilities:
    label ?: string
}
const Busy = <TElement extends Element = HTMLElement>(props: BusyProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet   = useBusyStyleSheet();
    
    
    
    // rest props:
    const {
        // accessibilities:
        active,
        label,
        
        
        
        // children:
        children,
    ...restBadgeProps} = props;
    
    
    
    // fn props:
    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const autoActive : boolean = !!(props.children || false);
    const activeFn   : boolean = active /*controllable*/ ?? autoActive /*uncontrollable*/;
    
    
    
    // jsx:
    return (
        <Badge<TElement>
            // other props:
            {...restBadgeProps}
            
            
            
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
        </Badge>
    );
};
export {
    Busy,
    Busy as default,
}
