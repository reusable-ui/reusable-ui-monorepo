// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssSelectorCollection,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    fallbacks,
    
    
    
    // combinators:
    children,
    nextSiblings,
    
    
    
    // styles:
    style,
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
import {
    // types:
    PseudoClassSelector,
    Selector,
    SelectorGroup,
    PureSelectorGroup,
    
    
    
    // parses:
    parseSelectors,
    
    
    
    // creates & tests:
    createElementSelector,
    createPseudoClassSelector,
    isElementSelectorOf,
    createSelector,
    createSelectorGroup,
    isNotEmptySelector,
    isNotEmptySelectors,
    
    
    
    // renders:
    selectorsToString,
    
    
    
    // transforms:
    groupSelectors,
    groupSelector,
}                           from '@cssfn/css-selectors'         // manipulates css selectors

// reusable-ui configs:
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'         // a spacer (gap) management system

// reusable-ui utilities:
import type {
    // types:
    Tag,
}                           from '@reusable-ui/semantics'       // a semantic management system for react web components
import {
    // styles:
    stripoutFigure,
    stripoutImage,
}                           from '@reusable-ui/stripouts'       // removes browser's default stylesheet

// reusable-ui features:
import {
    // hooks:
    usesBorder,
}                           from '@reusable-ui/border'          // border (stroke) stuff of UI
import {
    // hooks:
    usesPadding,
}                           from '@reusable-ui/padding'         // padding (inner spacing) stuff of UI
import {
    // hooks:
    ifFirstVisibleChild,
    ifLastVisibleChild,
    usesGroupable,
}                           from '@reusable-ui/groupable'       // groups a list of UIs into a single UI

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI

// reusable-ui components:
import {
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // configs:
    basics,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component
import {
    // react components:
    Button,
    ButtonProps,
}                           from '@reusable-ui/button'          // a button component



// utilities:
const toSelectors            = (selectorGroup: PureSelectorGroup|null): CssSelectorCollection => selectorGroup && selectorsToString(selectorGroup);
const childSelector          = createSelector( // the specificity weight including parent = 2.1 , is enough to overcome specificity `.FooMedia.FooVariant`
    // specificity weight = 1
    createPseudoClassSelector('nth-child', 'n'), // :nth-child(n)
    
    // specificity weight = 0.1
    createPseudoClassSelector( // :not(_)
        'not',
        createSelectorGroup(
            createSelector(
                createElementSelector('_')
            )
        ),
    ),
);
const adjustChildSpecificity = (selectorGroup: PureSelectorGroup|null): PureSelectorGroup|null => {
    return selectorGroup && (
        selectorGroup
        .map((selector: Selector): Selector => createSelector( // the specificity weight including parent = 2.1 , is enough to overcome specificity `.FooMedia.FooVariant`
            ...selector,
            ...childSelector, // add specificity weight 1.1
        ))
    );
};



// styles:
const mediaElm    : CssSelectorCollection = ['figure', 'img', 'svg', 'video', 'picture', 'embed', 'object', '.media'];
const notMediaElm : CssSelectorCollection = '.not-media';
const linksElm    : CssSelectorCollection = ['a', '.link'];
const notLinksElm : CssSelectorCollection = '.not-link';

export interface ContentChildrenMediaOptions {
    mediaSelector    ?: CssSelectorCollection
    notMediaSelector ?: CssSelectorCollection
}
export const usesContentChildrenMediaOptions = (options: ContentChildrenMediaOptions = {}) => {
    // options:
    const {
        mediaSelector    : mediaSelectorStr    = mediaElm,
        notMediaSelector : notMediaSelectorStr = notMediaElm,
    } = options;
    
    const mediaSelector                : SelectorGroup|null       = parseSelectors(mediaSelectorStr);
    const notMediaSelector             : SelectorGroup|null       = parseSelectors(notMediaSelectorStr);
    const notNotMediaSelector          : PseudoClassSelector|null = notMediaSelector && createPseudoClassSelector( // create pseudo_class `:not()`
        'not',
        groupSelectors(notMediaSelector, { selectorName: 'where' }), // group multiple selectors with `:where()`, to suppress the specificity weight
    );
    
    const mediaSelectorWithExceptZero  : PureSelectorGroup|null   = mediaSelector    && (
        groupSelectors(mediaSelector, { selectorName: 'where' })     // group multiple selectors with `:where()`, to suppress the specificity weight
        .map((groupedMediaSelector: Selector): Selector =>
            createSelector(
                ...groupedMediaSelector,
                notNotMediaSelector,                                 // :not(:where(...notMediaSelector))
            )
        )
    );
    
    return {
        mediaSelectorWithExcept     : toSelectors(adjustChildSpecificity(mediaSelectorWithExceptZero)),
        mediaSelectorWithExceptZero : toSelectors(mediaSelectorWithExceptZero),
        
        mediaSelector,
        notNotMediaSelector,
    };
};
export const usesContentChildrenFill         = (options: ContentChildrenMediaOptions = {}) => {
    // options:
    const {
        mediaSelectorWithExcept,
        mediaSelectorWithExceptZero,
    } = usesContentChildrenMediaOptions(options);
    
    
    
    // dependencies:
    
    // features:
    const {groupableRule, groupableVars} = usesGroupable({
        itemsSelector : mediaSelectorWithExcept, // select all <media> inside <Content> for trimming their corners
    });
    
    // spacings:
    const positivePaddingInline = groupableVars.paddingInline;
    const positivePaddingBlock  = groupableVars.paddingBlock;
    const negativePaddingInline = `calc(0px - ${positivePaddingInline})`;
    const negativePaddingBlock  = `calc(0px - ${positivePaddingBlock })`;
    
    
    
    return style({
        ...imports([
            // features:
            groupableRule, // make a nicely rounded corners
        ]),
        ...style({
            // children:
            ...children(mediaSelectorWithExcept, {
                // sizes:
                // span to maximum width including parent's paddings:
                boxSizing      : 'border-box', // the final size is including borders & paddings
                inlineSize     : 'fill-available',
                ...fallbacks({
                    inlineSize : `calc(100% + (${positivePaddingInline} * 2))`,
                }),
                
                
                
                // spacings:
                marginInline         : negativePaddingInline, // cancel out parent's padding with negative margin
                marginBlockEnd       : positivePaddingBlock,  // add a spacing to the next sibling
                ...ifFirstVisibleChild({
                    marginBlockStart : negativePaddingBlock,  // cancel out parent's padding with negative margin
                }),
                ...ifLastVisibleChild({
                    marginBlockEnd   : negativePaddingBlock,  // cancel out parent's padding with negative margin
                }),
                
                
                
                // children:
                // make sibling <media> closer (cancel out prev sibling's spacing):
                ...nextSiblings(mediaSelectorWithExceptZero, {
                    // spacings:
                    marginBlockStart : negativePaddingBlock, // cancel out prev sibling's spacing with negative margin
                }),
            }),
        }),
    });
};
export const usesContentChildrenMedia        = (options: ContentChildrenMediaOptions = {}) => {
    // options:
    const {
        mediaSelectorWithExcept,
        mediaSelectorWithExceptZero,
        
        mediaSelector,
        notNotMediaSelector,
    } = usesContentChildrenMediaOptions(options);
    const figureSelector               : Selector|null          = mediaSelector     && (mediaSelector.find(  (selector): selector is Selector => isNotEmptySelector(selector) && selector.some( (selectorEntry) =>  isElementSelectorOf(selectorEntry, 'figure'))) ?? null);
    const nonFigureSelector            : PureSelectorGroup|null = mediaSelector     &&  mediaSelector.filter((selector): selector is Selector => isNotEmptySelector(selector) && selector.every((selectorEntry) => !isElementSelectorOf(selectorEntry, 'figure')));
    
    const figureSelectorWithExceptMod  : PureSelectorGroup|null = figureSelector    && (
        groupSelector(figureSelector, { selectorName: 'where' }) // group multiple selectors with `:where()`, to suppress the specificity weight
        .map((groupedFigureSelector: Selector): Selector =>
            createSelector(
                ...groupedFigureSelector,
                notNotMediaSelector,                             // :not(:where(...notMediaSelector))
            )
        )
    );
    const figureSelectorWithExcept     : CssSelectorCollection  = toSelectors(adjustChildSpecificity(figureSelectorWithExceptMod));
    const figureSelectorWithCombinator : PureSelectorGroup|null = figureSelectorWithExceptMod && (
        figureSelectorWithExceptMod
        .map((groupedFigureSelector: Selector): Selector =>
            createSelector(
                ...groupedFigureSelector,
                '>',
            )
        )
    );
    const nonFigureSelectorWithExcept  : CssSelectorCollection = toSelectors(adjustChildSpecificity(nonFigureSelector && (
        groupSelectors(nonFigureSelector, { selectorName: 'where' }) // group multiple selectors with `:where()`, to suppress the specificity weight
        .flatMap((groupedNonFigureSelector: Selector): PureSelectorGroup => {
            const nonFigureSelectorWithExcept : Selector = createSelector(
                ...groupedNonFigureSelector,
                notNotMediaSelector,                                 // :not(:where(...notMediaSelector))
            );
            return createSelectorGroup(
                // media outside <figure>:
                nonFigureSelectorWithExcept,
                
                // media inside <figure>:
                ...(!isNotEmptySelectors(figureSelectorWithCombinator) ? [] : figureSelectorWithCombinator.map((selectorCombi: Selector): Selector =>
                    createSelector(
                        ...selectorCombi,
                        ...nonFigureSelectorWithExcept,
                    )
                )),
            );
        })
    )));
    
    
    
    // dependencies:
    
    // features:
    const {borderRule, borderVars} = usesBorder();
    const {groupableRule         } = usesGroupable({
        itemsSelector             : '*', // select all children inside <figure> for trimming their corners
    });
    const {separatorRule         } = usesGroupable({
        orientationInlineSelector : null, // never  => the <media> are never  stacked in horizontal
        orientationBlockSelector  : '&',  // always => the <media> are always stacked in vertical
        itemsSelector             : mediaSelectorWithExceptZero,
    });
    
    
    
    return style({
        // children:
        
        // first: reset top_level <figure>
        ...children(figureSelectorWithExcept, {
            ...imports([
                // resets:
                stripoutFigure(),        // clear browser's default styling on `<figure>`
                
                // features:
                // making the <figure> as border_container => the inner media can have a separator between them
                groupableRule, // make a nicely rounded corners
            ]),
            ...style({
                // layouts:
                display        : 'flex',    // use block flexbox, so it takes the entire parent's width
                flexDirection  : 'column',  // items are stacked vertically
                justifyContent : 'start',   // if items are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first item should be visible first
                alignItems     : 'stretch', // items width are 100% of the parent
                flexWrap       : 'nowrap',  // prevents the items to wrap to the next column
                
                
                
                // children:
                ...rule(':where(&)', { // set at lowest specificity to the parent selector
                    ...children('*', {
                        ...imports([
                            // features:
                            borderRule,
                        ]),
                        ...style({
                            // borders:
                            border       : borderVars.border,
                         // borderRadius           : borderVars.borderRadius,
                            borderStartStartRadius : borderVars.borderStartStartRadius,
                            borderStartEndRadius   : borderVars.borderStartEndRadius,
                            borderEndStartRadius   : borderVars.borderEndStartRadius,
                            borderEndEndRadius     : borderVars.borderEndEndRadius,
                        }),
                    }),
                }, { performGrouping: false }), // do not transform/simplify
            }),
        }),
        
        // then: styling <media>:
        ...children(nonFigureSelectorWithExcept, {
            ...rule(':where(:not(.media))', { // styling all <media> except __custom__ .media
                ...imports([
                    // resets:
                    stripoutImage(),   // clear browser's default styling on `<img>`
                ]),
                ...style({
                    // layouts:
                    display : 'block', // fills the entire parent's width
                }),
            }),
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(contents, 'media')), // apply config's cssProps starting with media***
            
            
            
            // animations:
            ...style({
                transition : [
                    // original:
                    [contents.mediaTransition],
                    
                    // overwrites:
                    
                    // borders:
                    ['border-width', '0s'], // does not support transition on border width, because we use it to make a separator
                ],
            }),
        }),
        
        // finally: styling top_level <figure> & top_level <media> as separator:
        ...children(mediaSelectorWithExcept, {
            ...style({
                ...imports([
                    // features:
                    borderRule, // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius
                ]),
                ...style({
                    // borders:
                    border       : borderVars.border,
                 // borderRadius           : borderVars.borderRadius,
                    borderStartStartRadius : borderVars.borderStartStartRadius,
                    borderStartEndRadius   : borderVars.borderStartEndRadius,
                    borderEndStartRadius   : borderVars.borderEndStartRadius,
                    borderEndEndRadius     : borderVars.borderEndEndRadius,
                }),
            }),
            ...imports([
                // borders:
                // we placed at the last because we redefined the border at above
                separatorRule, // turns the current border as separator between <media>(s)
            ]),
        }),
    });
};

export interface ContentChildrenLinksOptions {
    linksSelector    ?: CssSelectorCollection
    notLinksSelector ?: CssSelectorCollection
}
export const usesContentChildrenLinksOptions = (options: ContentChildrenLinksOptions = {}) => {
    // options:
    const {
        linksSelector    : linksSelectorStr    = linksElm,
        notLinksSelector : notLinksSelectorStr = notLinksElm,
    } = options;
    
    const linksSelector                : SelectorGroup|null       = parseSelectors(linksSelectorStr);
    const notLinksSelector             : SelectorGroup|null       = parseSelectors(notLinksSelectorStr);
    const notNotLinksSelector          : PseudoClassSelector|null = notLinksSelector && createPseudoClassSelector( // create pseudo_class `:not()`
        'not',
        groupSelectors(notLinksSelector, { selectorName: 'where' }), // group multiple selectors with `:where()`, to suppress the specificity weight
    );
    
    const linksSelectorWithExceptZero  : PureSelectorGroup|null   = linksSelector    && (
        groupSelectors(linksSelector, { selectorName: 'where' })     // group multiple selectors with `:where()`, to suppress the specificity weight
        .map((groupedLinksSelector: Selector): Selector =>
            createSelector(
                ...groupedLinksSelector,
                notNotLinksSelector,                                 // :not(:where(...notLinksSelector))
            )
        )
    );
    
    return {
        linksSelectorWithExcept     : toSelectors(adjustChildSpecificity(linksSelectorWithExceptZero)),
        linksSelectorWithExceptZero : toSelectors(linksSelectorWithExceptZero),
        
        linksSelector,
        notNotLinksSelector,
    };
};
export const usesContentChildrenLinks        = (options: ContentChildrenLinksOptions = {}) => {
    // options:
    const {
        linksSelectorWithExcept,
        linksSelectorWithExceptZero,
    } = usesContentChildrenLinksOptions(options);
    
    
    
    return style({
        // children:
        ...children(linksSelectorWithExcept, {
            // children:
            // make a gap to sibling <a>:
            ...nextSiblings(linksSelectorWithExceptZero, {
                // spacings:
                // add a space between links:
                marginInlineStart: contents.linkSpacing,
            }),
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(contents, 'link')), // apply config's cssProps starting with link***
        }),
    });
};

export const usesContentChildren             = (options: (ContentChildrenMediaOptions & ContentChildrenLinksOptions) = {}) => {
    return style({
        ...imports([
            // media:
            usesContentChildrenMedia(options),
            
            // links:
            usesContentChildrenLinks(options),
            
            // spacings:
            usesContentChildrenFill(options), // must be placed at the last
        ]),
    });
};

export const usesContentBasicLayout = () => {
    // dependencies:
    
    // features:
    const {borderRule , borderVars } = usesBorder(contents as any);
    const {paddingRule, paddingVars} = usesPadding(contents);
    
    
    
    return style({
        ...imports([
            // features:
            borderRule,
            paddingRule,
        ]),
        ...style({
            // customize:
            ...usesCssProps(contents), // apply config's cssProps
            
            
            
            // borders:
            border        : borderVars.border,
         // borderRadius           : borderVars.borderRadius,
            borderStartStartRadius : borderVars.borderStartStartRadius,
            borderStartEndRadius   : borderVars.borderStartEndRadius,
            borderEndStartRadius   : borderVars.borderEndStartRadius,
            borderEndEndRadius     : borderVars.borderEndEndRadius,
            
            
            
            // spacings:
         // padding       : paddingVars.padding,
            paddingInline : paddingVars.paddingInline,
            paddingBlock  : paddingVars.paddingBlock,
        }),
    });
};
export const usesContentLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBasicLayout(),
            usesContentBasicLayout(),
        ]),
        ...style({
            // layouts:
            display: 'block',
        }),
    });
};
export const usesContentBasicVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(contents);
    
    
    
    return style({
        ...imports([
            // variants:
            resizableRule,
        ]),
    });
};
export const usesContentVariants = () => {
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
            usesContentBasicVariants(),
        ]),
    });
};

export const useContentStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesContentLayout(),
        
        // variants:
        usesContentVariants(),
        
        // children:
        usesContentChildren(),
    ]),
}), { id: '2h0i4lc78z' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [contents, contentValues, cssContentConfig] = cssConfig(() => {
    return {
        // animations:
        transition      : basics.transition as CssKnownProps['transition'],
        mediaTransition : basics.transition as CssKnownProps['transition'],
        
        
        
        // spacings:
        paddingInline   : spacers.default   as CssKnownProps['paddingInline'], // override to <Basic>
        paddingBlock    : spacers.default   as CssKnownProps['paddingBlock' ], // override to <Basic>
        paddingInlineSm : spacers.sm        as CssKnownProps['paddingInline'], // override to <Basic>
        paddingBlockSm  : spacers.sm        as CssKnownProps['paddingBlock' ], // override to <Basic>
        paddingInlineLg : spacers.lg        as CssKnownProps['paddingInline'], // override to <Basic>
        paddingBlockLg  : spacers.lg        as CssKnownProps['paddingBlock' ], // override to <Basic>
        
        
        
        // links:
        linkSpacing     : spacers.sm        as CssKnownProps['gapInline'],
    };
}, { prefix: 'ct' });



// react components:
export interface ContentProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        BasicProps<TElement>
{
    // children:
    children ?: React.ReactNode
}
const Content = <TElement extends Element = HTMLElement>(props: ContentProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet         = useContentStyleSheet();
    
    
    
    // rest props:
    const {
        // children:
        children,
    ...restProps} = props;
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...restProps}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        >
            {React.Children.map(children, (child) => {
                // link:
                if (
                    React.isValidElement<ButtonProps>(child)
                    &&
                    (
                        // native <a>:
                        (child.type === 'a')
                        ||
                        // native <foo class="... link ...">:
                        (
                            (typeof(child.type) === 'string')
                            &&
                            (child.props.className ?? '').split(' ').some((className) => (className === 'link'))
                        )
                    )
                    &&
                    // not <foo class="... not-link ...">:
                    !(child.props.className ?? '').split(' ').some((className) => (className === 'not-link'))
                ) {
                    return (
                        <Button
                            // semantics:
                            tag={(child.type ?? 'a') as Tag} // copy the original <tag>
                            
                            
                            
                            // variants:
                            buttonStyle='link' // style the <button> as <a>
                            
                            
                            
                            // other props:
                            {...child.props}
                        />
                    );
                } // if
                
                
                
                // other component:
                return child;
            })}
        </Basic>
    );
};
export {
    Content,
    Content as default,
}
