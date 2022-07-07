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
    // styles:
    stripoutFocusableElement,
}                           from '@reusable-ui/stripouts'       // removes browser's default stylesheet
import {
    // hooks:
    useMergeEvents,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // types:
    SemanticTag,
    SemanticRole,
    
    
    
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a base component
import {
    // hooks:
    usesSizeVariant,
    OrientationName,
    OrientationVariantOptions,
    defaultBlockOrientationVariantOptions,
    normalizeOrientationVariantOptions,
    usesOrientationVariant,
    OrientationVariant,
    useOrientationVariant,
    usesBorder,
    extendsBorder,
    usesAnim,
    
    
    
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
    // hooks:
    usesBorderAsContainer,
    usesBorderAsSeparator,
}                           from '@reusable-ui/container'       // a neighbor component
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
    usesContentChildren,
    
    
    
    // configs:
    contents,
}                           from '@reusable-ui/content'         // a neighbor component



// defaults:
const _defaultSemanticTag        : SemanticTag  = 'article' // uses <article>        as the default semantic
const _defaultSemanticRole       : SemanticRole = 'article' // uses [role="article"] as the default semantic

const _defaultHeaderSemanticTag  : SemanticTag  = 'header'  // uses <header>         as the default semantic
const _defaultHeaderSemanticRole : SemanticRole = ''        // no corresponding role

const _defaultFooterSemanticTag  : SemanticTag  = 'footer'  // uses <footer>         as the default semantic
const _defaultFooterSemanticRole : SemanticRole = ''        // no corresponding role

const _defaultBodySemanticTag    : SemanticTag  = 'div'     // uses <div>         as the default semantic
const _defaultBodySemanticRole   : SemanticRole = ''        // no corresponding role



// hooks:

// layouts:

//#region orientation
export const defaultOrientationRuleOptions = defaultBlockOrientationVariantOptions;
//#endregion orientation


// appearances:

//#region card style
export type CardStyle = 'flat'|'flush'|'joined' // might be added more styles in the future
export interface CardVariant {
    cardStyle ?: CardStyle
}
export const useCardVariant = (props: CardVariant) => {
    return {
        class: props.cardStyle ?? null,
    };
};
//#endregion card style



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



export const usesCardLayout = (options?: OrientationVariantOptions) => {
    // options:
    options = normalizeOrientationVariantOptions(options, defaultOrientationRuleOptions);
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationVariant(options);
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }&`;
    
    
    
    // dependencies:
    
    // borders:
    const [borderRule       ] = usesBorder();
    
    // animations:
    const [animRule  , anims] = usesAnim();
    
    
    
    return style({
        ...imports([
            // resets:
            stripoutFocusableElement(),     // clear browser's default styles
            
            // borders:
            borderRule,
            usesBorderAsContainer(options), // make a nicely rounded corners
            
            // animations:
            animRule,
        ]),
        ...style({
            // layouts:
            ...rule(orientationInlineSelector, { // inline
                // layouts:
                display        : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                flexDirection  : 'row',         // items are stacked horizontally
            }),
            ...rule(orientationBlockSelector , { // block
                // layouts:
                display        : 'flex',        // use block flexbox, so it takes the entire parent's width
                flexDirection  : 'column',      // items are stacked vertically
            }),
            justifyContent : 'start',           // if items are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first item should be visible first
            alignItems     : 'stretch',         // items width are 100% of the parent (for variant `.block`) or height (for variant `.inline`)
            flexWrap       : 'nowrap',          // no wrapping
            
            
            
            // sizes:
            // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            minInlineSize  : 0,
            
            
            
            // animations:
            boxShadow : anims.boxShadow,
            filter    : anims.filter,
            anim      : anims.anim,
            
            
            
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
                    usesBorderAsSeparator({ // must be placed at the last
                        orientationInlineSelector : parentOrientationInlineSelector,
                        orientationBlockSelector  : parentOrientationBlockSelector,
                        swapFirstItem : true,
                    }),
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
            
            // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius:
            ...extendsBorder(),
        }),
    });
};
export const usesCardVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(cards);
    
    // borders:
    const [, borders      ] = usesBorder();
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            usesContentVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
        ...variants([
            rule(['.flat', '.flush'], {
                // borders:
                // kill borders surrounding Card:
                [borders.borderWidth           ] : '0px',
                
                // remove rounded corners on top:
                [borders.borderStartStartRadius] : '0px',
                [borders.borderStartEndRadius  ] : '0px',
                // remove rounded corners on bottom:
                [borders.borderEndStartRadius  ] : '0px',
                [borders.borderEndEndRadius    ] : '0px',
            }),
            rule(['.flat', '.joined'], {
                // children:
                ...children([headerElm, footerElm, bodyElm], {
                    // borders:
                    // kill separator between items:
                    [borders.borderWidth] : '0px',
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

export const useCardStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesCardLayout(),
        
        // variants:
        usesCardVariants(),
        
        // states:
        usesCardStates(),
    ]),
}), { id: 'wfc3nwgtcn' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cards, cardValues, cssCardConfig] = cssConfig(() => {
    return {
        // animations:
        transition     : basics.transition  as CssKnownProps['transition'],
        itemTransition : basics.transition  as CssKnownProps['transition'],
        
        
        
        // sizes:
        boxSizing      : 'border-box'       as CssKnownProps['boxSizing'], // the final size is including borders & paddings
        blockSize      : '100%'             as CssKnownProps['blockSize'], // fills the entire parent's height if the parent has a specific height, otherwise no effect
        
        
        
        // typos:
        overflowWrap   : 'break-word'       as CssKnownProps['overflowWrap'], // prevents a long word from breaking Card layout
        
        
        
        // captions:
        captionFilter  : [[
            'brightness(70%)',
            'contrast(140%)',
        ]]                                  as CssKnownProps['filter'],
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
        
        // layouts:
        OrientationVariant,
        
        // appearances:
        CardVariant
{
    // children:
    children ?: React.ReactNode
}
const Card = <TElement extends Element = HTMLElement>(props: CardProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet         = useCardStyleSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const isOrientationBlock = ((orientationVariant.class || defaultOrientationRuleOptions.defaultOrientation) === 'block');
    
    const cardVariant        = useCardVariant(props);
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationVariant.class,
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
            {...props}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag  ?? _defaultSemanticTag }
            semanticRole = {props.semanticRole ?? _defaultSemanticRole}
            
            aria-orientation={props['aria-orientation'] ?? (isOrientationBlock ? 'vertical' : 'horizontal')}
            
            
            
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

export type { OrientationName, OrientationVariant }
