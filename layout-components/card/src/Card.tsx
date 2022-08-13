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
    
    
    
    // combinators:
    children,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // hooks:
    useMergeEvents,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import type {
    // types:
    SemanticTag,
    SemanticRole,
}                           from '@reusable-ui/semantics'       // a semantic management system for react web components

// reusable-ui features:
import {
    // hooks:
    usesBorder,
}                           from '@reusable-ui/border'          // border (stroke) stuff of UI
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI
import {
    // hooks:
    usesGroupable,
}                           from '@reusable-ui/groupable'       // groups a list of UIs into a single UI

// reusable-ui variants:
import {
    // hooks:
    OrientationableOptions,
    defaultBlockOrientationableOptions,
    usesOrientationable,
    OrientationableProps,
    useOrientationable,
}                           from '@reusable-ui/orientationable' // a capability of UI to rotate its layout
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a base component
import {
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component
import {
    // styles:
    usesIndicatorLayout,
    usesIndicatorVariants,
    usesIndicatorStates,
    
    
    
    // react components:
    IndicatorProps,
    Indicator,
}                           from '@reusable-ui/indicator'       // a base component
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
    usesContentChildren,
    
    
    
    // configs:
    contents,
}                           from '@reusable-ui/content'         // a neighbor component



// defaults:
export const defaultOrientationableOptions = defaultBlockOrientationableOptions;

const _defaultSemanticTag        : SemanticTag  = 'article' // uses <article>        as the default semantic
const _defaultSemanticRole       : SemanticRole = 'article' // uses [role="article"] as the default semantic

const _defaultHeaderSemanticTag  : SemanticTag  = 'header'  // uses <header>         as the default semantic
const _defaultHeaderSemanticRole : SemanticRole = ''        // no corresponding role

const _defaultFooterSemanticTag  : SemanticTag  = 'footer'  // uses <footer>         as the default semantic
const _defaultFooterSemanticRole : SemanticRole = ''        // no corresponding role

const _defaultBodySemanticTag    : SemanticTag  = 'div'     // uses <div>         as the default semantic
const _defaultBodySemanticRole   : SemanticRole = ''        // no corresponding role



// styles:
const headerElm = ':where(.header)' // zero specificity
const footerElm = ':where(.footer)' // zero specificity
const bodyElm   = ':where(.body)'   // zero specificity



export const usesCardItemLayout    = () => {
    return style({
        ...imports([
            // layouts:
            usesIndicatorLayout(),
            usesContentLayout(),
            
            // children:
            usesContentChildren(),
        ]),
        ...style({
            // layouts:
            display : 'block', // fills the entire parent's width
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(cards, 'item')), // apply config's cssProps starting with item***
            
            
            
            ...vars({
                // animations:
                
                // a tweak for <Content> itself:
                [contents.transition     ] : [
                    // original:
                    [cards.itemTransition],
                    
                    // overwrites:
                    
                    // borders:
                    ['border-width', '0s'], // does not support transition on border width, because we use it to make a separator
                ],
                
                // a tweak for <Content>'s media:
                [contents.mediaTransition] : contents.transition,
            }),
            ...style({
                // animations:
                
                // a tweak for <Header>|<Body>|<Footer>:
                transition                 : contents.transition,
            }),
        }),
    });
};
export const usesCardCaptionLayout = () => {
    return style({
        // sizes:
        // the default <Card>'s items height are unresizeable (excepts for the <Card>'s body):
        flex : [[0, 1, 'auto']], // ungrowable, shrinkable, initial from it's width (for variant `.inline`) or height (for variant `.block`)
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(cards, 'caption')), // apply config's cssProps starting with caption***
    });
};
export const usesCardHeaderLayout  = () => {
    return style({
        // customize:
        ...usesCssProps(usesPrefixedProps(cards, 'header')), // apply config's cssProps starting with header***
    });
};
export const usesCardFooterLayout  = () => {
    return style({
        // customize:
        ...usesCssProps(usesPrefixedProps(cards, 'footer')), // apply config's cssProps starting with footer***
    });
};
export const usesCardBodyLayout    = () => {
    return style({
        // sizes:
        // the default <Card>'s body height is resizeable, ensuring footers are aligned to the bottom:
        flex     : [[1, 1, 'auto']], // growable, shrinkable, initial from it's width (for variant `.inline`) or height (for variant `.block`)
        
        
        
        // scrolls:
        overflow : 'auto', // enable horz & vert scrolling
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(cards, 'body')), // apply config's cssProps starting with body***
    });
};



export const usesCardLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock, orientationInlineSelector, orientationBlockSelector} = orientationableStuff;
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }&`;
    options = orientationableStuff;
    
    
    
    // dependencies:
    
    // features:
    const {borderRule   , borderVars   } = usesBorder(cards);
    const {animationRule, animationVars} = usesAnimation(cards as any);
    const {groupableRule               } = usesGroupable(options);
    const {separatorRule               } = usesGroupable({
        orientationInlineSelector : parentOrientationInlineSelector,
        orientationBlockSelector  : parentOrientationBlockSelector,
        swapFirstItem             : true,
    });
    
    
    
    return style({
        ...imports([
            // features:
            borderRule,
            animationRule,
            groupableRule, // make a nicely rounded corners
        ]),
        ...style({
            // layouts:
            ...ifOrientationInline({ // inline
                display       : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                flexDirection : 'row',         // items are stacked horizontally
            }),
            ...ifOrientationBlock({  // block
                display       : 'flex',        // use block flexbox, so it takes the entire parent's width
                flexDirection : 'column',      // items are stacked vertically
            }),
            justifyContent    : 'start',       // if items are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first item should be visible first
            alignItems        : 'stretch',     // items width are 100% of the parent (for variant `.block`) or height (for variant `.inline`)
            flexWrap          : 'nowrap',      // no wrapping
            
            
            
            // sizes:
            // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            minInlineSize     : 0,
            
            
            
            // animations:
            boxShadow         : animationVars.boxShadow,
            filter            : animationVars.filter,
            anim              : animationVars.anim,
            
            
            
            // children:
            ...children([headerElm, footerElm, bodyElm], {
                ...imports([
                    // layouts:
                    usesCardItemLayout(),
                ]),
                ...imports([
                    // borders:
                    /*
                        A separator between CardItems.
                        Exploits the borders as a horizontal/vertical separator depending on the Card's orientation.
                    */
                    separatorRule, // must be placed at the last
                ]),
            }),
            ...children([headerElm, footerElm], {
                ...imports([
                    // layouts:
                    usesCardCaptionLayout(),
                ]),
            }),
            ...children(headerElm, {
                ...imports([
                    // layouts:
                    usesCardHeaderLayout(),
                ]),
            }),
            ...children(footerElm, {
                ...imports([
                    // layouts:
                    usesCardFooterLayout(),
                ]),
            }),
            ...children(bodyElm, {
                ...imports([
                    // layouts:
                    usesCardBodyLayout(),
                ]),
            }),
            
            
            
            // customize:
            ...usesCssProps(cards), // apply config's cssProps
            
            
            
            // borders:
            border            : borderVars.border,
         // borderRadius           : borderVars.borderRadius,
            borderStartStartRadius : borderVars.borderStartStartRadius,
            borderStartEndRadius   : borderVars.borderStartEndRadius,
            borderEndStartRadius   : borderVars.borderEndStartRadius,
            borderEndEndRadius     : borderVars.borderEndEndRadius,
        }),
    });
};
export const usesCardVariants = () => {
    // dependencies:
    
    // features:
    const {borderVars   } = usesBorder();
    
    // variants:
    const {resizableRule} = usesResizable(cards);
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            usesContentVariants(),
            resizableRule,
        ]),
        ...variants([
            rule(['.flat', '.flush'], {
                // borders:
                // kill borders surrounding Card:
                [borderVars.borderWidth           ] : '0px',
                
                // remove rounded corners on top:
                [borderVars.borderStartStartRadius] : '0px',
                [borderVars.borderStartEndRadius  ] : '0px',
                // remove rounded corners on bottom:
                [borderVars.borderEndStartRadius  ] : '0px',
                [borderVars.borderEndEndRadius    ] : '0px',
            }),
            rule(['.flat', '.joined'], {
                // children:
                ...children([headerElm, footerElm, bodyElm], {
                    // borders:
                    // kill separator between items:
                    [borderVars.borderWidth] : '0px',
                }),
            }),
        ]),
    });
};
export const usesCardStates = () => {
    return style({
        ...imports([
            // states:
            usesIndicatorStates(),
        ]),
    });
};

export const useCardStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesCardLayout(),
        
        // variants:
        usesCardVariants(),
        
        // states:
        usesCardStates(),
    ]),
}), { id: 'wfc3nwgtcn' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export type CardStyle = 'flat'|'flush'|'joined' // might be added more styles in the future
export interface CardVariant {
    cardStyle ?: CardStyle
}
export const useCardVariant = (props: CardVariant) => {
    return {
        class: props.cardStyle ?? null,
    };
};



// configs:
export const [cards, cardValues, cssCardConfig] = cssConfig(() => {
    return {
        // borders:
        borderStyle    : basics.borderStyle     as CssKnownProps['borderStyle' ],
        borderWidth    : basics.borderWidth     as CssKnownProps['borderWidth' ],
        borderColor    : basics.borderColor     as CssKnownProps['borderColor' ],
        
        borderRadius   : basics.borderRadius    as CssKnownProps['borderRadius'],
        borderRadiusSm : basics.borderRadiusSm  as CssKnownProps['borderRadius'],
        borderRadiusLg : basics.borderRadiusLg  as CssKnownProps['borderRadius'],
        
        
        
        // animations:
        transition     : basics.transition      as CssKnownProps['transition'],
        itemTransition : basics.transition      as CssKnownProps['transition'],
        
        
        
        // sizes:
        boxSizing      : 'border-box'           as CssKnownProps['boxSizing'], // the final size is including borders & paddings
        blockSize      : '100%'                 as CssKnownProps['blockSize'], // fills the entire parent's height if the parent has a specific height, otherwise no effect
        
        
        
        // typos:
        overflowWrap   : 'break-word'           as CssKnownProps['overflowWrap'], // prevents a long word from breaking Card layout
        
        
        
        // captions:
        captionFilter  : [[
            'brightness(70%)',
            'contrast(140%)',
        ]]                                      as CssKnownProps['filter'],
    };
}, { prefix: 'card' });



// handlers:
export const handleAnimationEndForward : React.AnimationEventHandler<Element> = (event) => {
    /**
     * because the `usesCardLayout` is neither inherit from `usesIndicatorLayout` nor applies `anim: ...`,
     * so the `onAnimationEnd` will __never__ triggered directly (non_bubbled).
     * 
     * the `useEnableDisableState() => handleAnimationEnd` only perform non_bubbled `onAnimationEnd`.
     * 
     * thus we need to trigger `onAnimationEnd` at <Card> level by forwarding `onAnimationEnd` bubbled from <CardHeader>|<CardBody>|<CardFooter>.
     * 
     * <Card>
     *     <Card(Header|Body|Footer) onAnimationEnd={...} />
     * </Card>
     */
    if ((event.target as Element)?.parentElement === event.currentTarget) {
        event.currentTarget.dispatchEvent(new AnimationEvent('animationend', { animationName: event.animationName, bubbles: true, composed: true }));
    } // if
};



// react components:
export interface CardItemProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        GenericProps<TElement>,
        
        // <div>:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >
{
}
export interface CardCaptionProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        CardItemProps<TElement>
{
}
export interface CardHeaderProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        CardCaptionProps<TElement>
{
}
export interface CardFooterProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        CardCaptionProps<TElement>
{
}
export interface CardBodyProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        CardItemProps<TElement>
{
}
export const CardHeader = <TElement extends Element = HTMLElement>(props: CardProps<TElement>): JSX.Element|null => {
    // classes:
    const classes = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // classes:
        'header',
    );
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...props}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag  ?? _defaultHeaderSemanticTag }
            semanticRole = {props.semanticRole ?? _defaultHeaderSemanticRole}
            
            
            
            // classes:
            classes={classes}
        />
    );
};
export const CardFooter = <TElement extends Element = HTMLElement>(props: CardProps<TElement>): JSX.Element|null => {
    // classes:
    const classes = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // classes:
        'footer',
    );
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...props}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag  ?? _defaultFooterSemanticTag }
            semanticRole = {props.semanticRole ?? _defaultFooterSemanticRole}
            
            
            
            // classes:
            classes={classes}
        />
    );
};
export const CardBody   = <TElement extends Element = HTMLElement>(props: CardProps<TElement>): JSX.Element|null => {
    // classes:
    const classes = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // classes:
        'body',
    );
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...props}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag  ?? _defaultBodySemanticTag }
            semanticRole = {props.semanticRole ?? _defaultBodySemanticRole}
            
            
            
            // classes:
            classes={classes}
        />
    );
};



export interface CardProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        IndicatorProps<TElement>,
        
        // <div>:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >,
        
        // variants:
        OrientationableProps,
        CardVariant
{
    // children:
    children ?: React.ReactNode
}
const Card = <TElement extends Element = HTMLElement>(props: CardProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet             = useCardStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    const cardVariant            = useCardVariant(props);
    
    
    
    // rest props:
    const {
        // variants:
        orientation : _orientation, // remove
        cardStyle   : _cardStyle,   // remove
    ...restIndicatorProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationableVariant.class,
        cardVariant.class,
    );
    
    
    
    // handlers:
    const handleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // hack:
        handleAnimationEndForward,
    );
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restIndicatorProps}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag  ?? _defaultSemanticTag }
            semanticRole = {props.semanticRole ?? _defaultSemanticRole}
            
            aria-orientation={props['aria-orientation'] ?? orientationableVariant['aria-orientation']}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            
            
            
            // handlers:
            onAnimationEnd={handleAnimationEnd}
        />
    );
};
export {
    Card,
    Card as default,
}
