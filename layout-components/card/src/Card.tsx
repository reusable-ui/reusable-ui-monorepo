// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // types:
    SingleOrArray,
}                           from '@cssfn/types'                 // cssfn general types
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssSelectorCollection,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    states,
    
    
    
    // combinators:
    children,
    
    
    
    // styles:
    style,
    imports,
    
    
    
    // utilities:
    escapeSvg,
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
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    borderRadiuses,
}                           from '@reusable-ui/borders'         // a border (stroke) management system
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'         // a spacer (gap) management system
import {
    // styles:
    stripoutFocusableElement,
    stripoutCard,
}                           from '@reusable-ui/stripouts'       // removes browser's default stylesheet
import {
    // hooks:
    useMergeEvents,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usePropActive,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // types:
    SemanticTag,
    SemanticRole,
    
    
    
    // hooks:
    useTestSemantic,
    
    
    
    // react components:
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
    ThemeName,
    outlinedOf,
    mildOf,
    usesBackg,
    usesBorder,
    extendsBorder,
    usesPadding,
    
    
    
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ifActive,
    ifPassive,
    
    
    
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
    usesThemeDefault as controlUsesThemeDefault,
    usesThemeActive  as controlUsesThemeActive,
    ifFocus,
    ifArrive,
}                           from '@reusable-ui/control'         // a base component
import {
    // hooks:
    ifPress,
    
    
    
    // styles:
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
    
    
    
    // react components:
    ActionControl,
}                           from '@reusable-ui/action-control'  // a base component
import {
    // rules:
    ifFirstVisibleChild,
    ifLastVisibleChild,
    ifNotFirstVisibleChild,
    
    
    
    // hooks:
    usesBorderAsContainer,
    usesBorderAsSeparator,
}                           from '@reusable-ui/container'       // a neighbor component
import {
    // styles:
    usesContentBasicLayout,
    usesContentBasicVariants,
    usesContentChildren,
}                           from '@reusable-ui/content'         // a neighbor component
import {
    // styles:
    usesIconImage,
}                           from '@reusable-ui/icon'            // an icon set
import {
    // hooks:
    SemanticButtonProps,
    useSemanticButton,
    
    
    
    // styles:
    usesButtonLayout,
}                           from '@reusable-ui/button'          // a button ui



// defaults:
const _defaultSemanticTag    : SemanticTag  = ['ul', 'ol'] // uses <ul>          as the default semantic, fallbacks to <ol>
const _defaultSemanticRole   : SemanticRole = ['card'    ] // uses [role="card"] as the default semantic

const _defaultOutlined       : boolean      = false
const _defaultMild           : boolean      = true
const _defaultActionCtrl     : boolean      = false

const _defaultItemOutlined   : boolean      = false
const _defaultItemMild       : boolean      = false
const _defaultItemActionCtrl : boolean      = false



// hooks:

// layouts:

//#region orientation
export const defaultOrientationRuleOptions = defaultBlockOrientationVariantOptions;
//#endregion orientation


// appearances:

//#region card style
export type CardBasicStyle = 'flat'|'flush'|'joined';
export type CardStyle = CardBasicStyle|'content'|'button'|'tab'|'breadcrumb'|'bullet'|'numbered' // might be added more styles in the future
export interface CardVariant {
    cardStyle ?: SingleOrArray<CardStyle>
}
export const useCardVariant = ({ cardStyle }: CardVariant) => {
    return {
        class: (
            (Array.isArray(cardStyle) ? cardStyle : [cardStyle])
            .filter((style) => !!style).join(' ')
            ||
            null
        ),
    };
};
//#endregion card style



// styles:
export const wrapperElm  = '*';                    // zero specificity
export const cardItemElm = ':where(:first-child)'; // zero specificity



export const usesCardLayout = (options?: OrientationVariantOptions) => {
    // options:
    options = normalizeOrientationVariantOptions(options, defaultOrientationRuleOptions);
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationVariant(options);
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }&`;
    
    
    
    // dependencies:
    
    // borders:
    const [borderRule, borders] = usesBorder();
    
    
    
    return style({
        ...imports([
            // resets:
            stripoutFocusableElement(),     // clear browser's default styles
            stripoutCard(),                 // clear browser's default styles
            
            // borders:
            // borderRule,                  // moved out to dedicated border stroke for each card & wrapper
            usesBorderAsContainer(options), // make a nicely rounded corners
        ]),
        ...style({
            // layouts:
            ...rule(orientationInlineSelector, { // inline
                display       : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                flexDirection : 'row',         // items are stacked horizontally
            }),
            ...rule(orientationBlockSelector , { // block
                display       : 'flex',        // use block flexbox, so it takes the entire parent's width
                flexDirection : 'column',      // items are stacked vertically
            }),
            justifyContent    : 'start',       // if wrappers are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first wrapper should be visible first
            alignItems        : 'stretch',     // wrappers width are 100% of the parent (for variant `.block`) or height (for variant `.inline`)
            flexWrap          : 'nowrap',      // no wrapping
            
            
            
            // sizes:
            // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            minInlineSize     : 0,
            
            
            
            // borders:
            ...children(['&', wrapperElm], {
                ...imports([
                    // borders:
                    borderRule, // dedicated border stroke for each <Card> & <wrapper>s
                ]),
            }),
            
            
            
            // children:
            ...children(wrapperElm, {
                // layouts:
                display        : 'flex',    // use block flexbox, so it takes the entire <Card>'s width
                flexDirection  : 'inherit', // copy <Card>'s stack direction
                justifyContent : 'inherit', // copy <Card>'s justifyContent
                alignItems     : 'inherit', // copy <Card>'s justifyContent
                flexWrap       : 'inherit', // copy <Card>'s flexWrap
                
                
                
                // sizes:
                flex           : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
                
                
                
                // children:
                /*
                    a hack with :not(_)
                    the total selector combined with parent is something like this: `:not(.inline).card>*>:not(_):where(:first-child)`, the specificity weight = 2.1
                    the specificity of 2.1 is a bit higher than:
                    * `.card.content`               , the specificity weight = 2
                    * `.someComponent.toggleButton` , the specificity weight = 2
                    but can be easily overriden by specificity weight >= 3, like:
                    * `.card.button.button`         , the specificity weight = 3
                    * `.someComponent.boo.foo`      , the specificity weight = 3
                */
                ...children(':not(_)', {
                    // borders:
                    ...rule(parentOrientationInlineSelector, { // inline
                        ...ifFirstVisibleChild({
                            // add rounded corners on left:
                            [borders.borderStartStartRadius] : 'inherit', // copy wrapper's borderRadius
                            [borders.borderEndStartRadius  ] : 'inherit', // copy wrapper's borderRadius
                        }),
                        ...ifLastVisibleChild({
                            // add rounded corners on right:
                            [borders.borderStartEndRadius  ] : 'inherit', // copy wrapper's borderRadius
                            [borders.borderEndEndRadius    ] : 'inherit', // copy wrapper's borderRadius
                        }),
                    }),
                    ...rule(parentOrientationBlockSelector , { // block
                        ...ifFirstVisibleChild({
                            // add rounded corners on top:
                            [borders.borderStartStartRadius] : 'inherit', // copy wrapper's borderRadius
                            [borders.borderStartEndRadius  ] : 'inherit', // copy wrapper's borderRadius
                        }),
                        ...ifLastVisibleChild({
                            // add rounded corners on bottom:
                            [borders.borderEndStartRadius  ] : 'inherit', // copy wrapper's borderRadius
                            [borders.borderEndEndRadius    ] : 'inherit', // copy wrapper's borderRadius
                        }),
                    }),
                }),
            }),
            
            
            
            // customize:
            ...usesCssProps(cards), // apply config's cssProps
            
            
            
            // borders:
            ...children(['&', wrapperElm], {
                // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius:
                ...extendsBorder(),
            }),
        }),
    });
};
export interface CardBasicVariantOptions {
    additionRemoveBorderSelector    ?: CssSelectorCollection
    additionRemoveSeparatorSelector ?: CssSelectorCollection
    
    specificityWeight               ?: number
}
export const usesCardBasicVariants = (options?: CardBasicVariantOptions) => {
    // options:
    const {
        additionRemoveBorderSelector,
        additionRemoveSeparatorSelector,
        specificityWeight,
    } = options ?? {};
    
    
    
    // dependencies:
    
    // borders:
    const [, borders] = usesBorder();
    
    
    
    return style({
        ...variants([
            rule(['.flat', '.flush', additionRemoveBorderSelector], {
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
            rule(['.flat', '.joined', additionRemoveSeparatorSelector], {
                // children:
                ...children(wrapperElm, {
                    // borders:
                    // kill separator between items:
                    [borders.borderWidth] : '0px',
                }),
            }),
        ], { specificityWeight }),
    });
};
export const usesCardVariants = (options?: OrientationVariantOptions) => {
    // options:
    options = normalizeOrientationVariantOptions(options, defaultOrientationRuleOptions);
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationVariant(options);
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }&`;
    
    
    
    // dependencies:
    
    // layouts:
    const [sizeVariantRule     ] = usesSizeVariant(cards);
    
    // backgrounds:
    const [          , backgs  ] = usesBackg();
    
    // borders:
    const [borderRule, borders ] = usesBorder();
    
    // spacings:
    const [          , paddings] = usesPadding();
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
        ...variants([
            rule('.content', { // content
                ...imports([
                    // variants:
                    usesContentBasicVariants(),
                ]),
                
                
                
                // children:
            }),
        ]),
        ...imports([
            usesCardBasicVariants({
                additionRemoveBorderSelector    : ['.button', '.tab', '.breadcrumb', '.bullet'],
                additionRemoveSeparatorSelector : ['.button', '.tab', '.breadcrumb', '.bullet'],
                // specificityWeight            : 1, // not needed
            }),
        ]),
        /*
            the total selector combined with parent is something like this: `.card.button.button`, the specificity weight = 3
            the specificity of 3 is a bit higher than:
            *      `:not(.inline)>*>.cardItem:not(_)`           , the specificity weight = 2.1 (<cardItem>'s borderSeparator)
            * `:not(.inline).card>*>:not(_):where(:first-child)`, the specificity weight = 2.1 (<cardItem>'s borderRadius)
        */
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
     * thus we need to trigger `onAnimationEnd` at <Card> level by forwarding `onAnimationEnd` bubbled from <CardItem>
     * 
     * <Card>
     *     <wrapper>
     *         <CardItem onAnimationEnd={...} />
     *     </wrapper>
     * </Card>
     */
    if ((event.target as Element)?.parentElement?.parentElement === event.currentTarget) {
        event.currentTarget.dispatchEvent(new AnimationEvent('animationend', { animationName: event.animationName, bubbles: true, composed: true }));
    } // if
};



// react components:
export interface CardProps<TElement extends Element = Element>
    extends
        // bases:
        IndicatorProps<TElement>,
        
        // layouts:
        OrientationVariant,
        
        // appearances:
        CardVariant
{
    // children:
    children ?: React.ReactNode
}
const Card = <TElement extends Element = Element>(props: CardProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet         = useCardStyleSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const isOrientationBlock = ((orientationVariant.class || defaultOrientationRuleOptions.defaultOrientation) === 'block');
    
    const cardVariant        = useCardVariant(props);
    
    
    
    // rest props:
    const {
        // remove props:
        
        // layouts:
        orientation : _orientation,
        
        
        
        // appearances:
        cardStyle    : _cardStyle,
        
        
        
        // variants:
        outlined = _defaultOutlined,
        mild     = _defaultMild,
        
        
        
        // behaviors:
        actionCtrl = _defaultActionCtrl,
        
        
        
        // children:
        children,
    ...restIndicatorProps} = props;
    
    
    
    // fn props:
    const semanticTag  = props.semanticTag  ?? _defaultSemanticTag ;
    const semanticRole = props.semanticRole ?? _defaultSemanticRole;
    const {
        isDesiredType : isCardType,
        isSemanticTag : isSemanticCard,
    } = useTestSemantic(
        // test:
        {
            tag  : props.tag,
            role : props.role,
            semanticTag,
            semanticRole,
        },
        
        // expected:
        {
            semanticTag  : _defaultSemanticTag,
            semanticRole : _defaultSemanticRole,
        }
    );
    
    const wrapperSemanticTag  : SemanticTag  = (isSemanticCard ? 'li'       : '');
    const wrapperSemanticRole : SemanticRole = (isCardType     ? 'carditem' : '');
    
    
    
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
            {...restIndicatorProps}
            
            
            
            // semantics:
            semanticTag  = {semanticTag }
            semanticRole = {semanticRole}
            
            aria-orientation={props['aria-orientation'] ?? (isOrientationBlock ? 'vertical' : 'horizontal')}
            
            
            
            // variants:
            outlined={outlined}
            mild={mild}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            
            
            
            // handlers:
            onAnimationEnd={handleAnimationEnd}
        >
            {React.Children.map(children, (child, index) =>
                <Generic<HTMLLIElement>
                    // identifiers:
                    key={index}
                    
                    
                    
                    // semantics:
                    semanticTag ={wrapperSemanticTag }
                    semanticRole={wrapperSemanticRole}
                >
                    {!React.isValidElement<CardItemProps<Element>>(child) ? child : React.cloneElement(child,
                        // props:
                        {
                            // variants:
                            outlined : (outlined || undefined) ?? child.props.outlined, // if `true` => force apply to <CardItem>s, otherwise independent by <CardItem>s
                            mild     : (mild     || undefined) ?? child.props.mild,     // if `true` => force apply to <CardItem>s, otherwise independent by <CardItem>s
                            
                            
                            
                            // behaviors:
                            actionCtrl : child.props.actionCtrl ?? actionCtrl, // the default <CardItem>'s actionCtrl value, if not assigned
                        },
                    )}
                </Generic>
            )}
        </Indicator>
    );
};
export {
    Card,
    Card as default,
}

export type { OrientationName, OrientationVariant }
