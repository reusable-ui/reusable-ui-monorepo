// cssfn:
import {
    // common typescript definitions:
    OptionalOrBoolean,
    
    
    
    // cssfn css specific types:
    CssSelectorCollection,
    
    
    
    // writes css in javascript:
    rule,
    fallbacks,
    children,
    nextSiblings,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    
    
    
    // manipulates css selectors:
    PseudoClassSelector,
    SelectorEntry,
    Selector,
    SelectorGroup,
    PureSelectorGroup,
    parseSelectors,
    createElementSelector,
    createClassSelector,
    createPseudoClassSelector,
    isElementSelectorOf,
    createSelector,
    createPureSelectorGroup,
    isNotEmptySelectors,
    selectPureSelectorGroupFromSelectorGroup,
    selectorsToString,
    groupSelectors,
    groupSelector,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // removes browser's default stylesheet:
    stripoutFigure,
    stripoutImage,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // groups a list of UIs into a single UI:
    ifFirstVisibleChild,
    ifLastVisibleChild,
    usesGroupable,
    
    
    
    // size options of UI:
    usesResizable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onBasicStylesChange,
    usesBasicLayout,
    usesBasicVariants,
}                           from '@reusable-ui/basic'           // a base component

// internals:
import {
    // configs:
    contents,
    cssContentConfig,
}                           from './config.js'



// utilities:
const toSelectors            = (selectorGroup: PureSelectorGroup|null): CssSelectorCollection => selectorGroup && selectorsToString(selectorGroup);
const childSelector          = createSelector( // the specificity weight including parent = 2.1 , is enough to overcome specificity `.FooMedia.FooVariant`
    // specificity weight = 1
    createPseudoClassSelector('nth-child', 'n'), // :nth-child(n)
    
    // specificity weight = 0.1
    createPseudoClassSelector( // :not(_)
        'not',
        createPureSelectorGroup(
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



// children styles:

// const mediaElm    : CssSelectorCollection = ['figure', 'img', 'svg', 'video', 'picture', 'embed', 'object', '.media'];
// const notMediaElm : CssSelectorCollection = '.not-media';
// const linksElm    : CssSelectorCollection = ['a', '.link'];
// const notLinksElm : CssSelectorCollection = '.not-link';

export interface ContentChildrenMediaOptions {
    mediaSelector    ?: CssSelectorCollection
    notMediaSelector ?: CssSelectorCollection
}
export interface ContentChildrenMediaOptionsResult {
    mediaSelectorWithExcept     : CssSelectorCollection
    mediaSelectorWithExceptZero : CssSelectorCollection
    mediaSelector               : PureSelectorGroup|null
    notNotMediaSelector         : PseudoClassSelector|null
}
let defaultContentChildrenMediaOptionsResultCache : WeakRef<ContentChildrenMediaOptionsResult>|undefined = undefined;
export const usesContentChildrenMediaOptions = (options?: ContentChildrenMediaOptions): ContentChildrenMediaOptionsResult => {
    if (options === undefined) {
        const cached = defaultContentChildrenMediaOptionsResultCache?.deref();
        if (cached) return cached;
    } // if
    
    
    
    // options:
    const {
        mediaSelector    : mediaSelectorStr,
        notMediaSelector : notMediaSelectorStr,
    } = options ?? {};
    
    const mediaSelector                : SelectorGroup|null       = mediaSelectorStr ? parseSelectors(mediaSelectorStr) : createPureSelectorGroup(
        // <figure>, <img>, <svg>, <video>, <picture>, <embed>, <object>, .media:
        ...['figure', 'img', 'svg', 'video', 'picture', 'embed', 'object'].map((elmName) => createSelector(
            createElementSelector(elmName)
        )),
        createSelector(
            createClassSelector('media')
        ),
    );
    const notMediaSelector             : SelectorGroup|null       = notMediaSelectorStr ? parseSelectors(notMediaSelectorStr) : createPureSelectorGroup(
        // .not-media:
        createSelector(
            createClassSelector('not-media')
        ),
    );
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
    
    const result : ContentChildrenMediaOptionsResult = {
        mediaSelectorWithExcept     : toSelectors(adjustChildSpecificity(mediaSelectorWithExceptZero)),
        mediaSelectorWithExceptZero : toSelectors(mediaSelectorWithExceptZero),
        
        mediaSelector: mediaSelector && selectPureSelectorGroupFromSelectorGroup(mediaSelector),
        notNotMediaSelector,
    };
    if (options === undefined) defaultContentChildrenMediaOptionsResultCache = new WeakRef<ContentChildrenMediaOptionsResult>(result);
    return result;
};
export const usesContentChildrenFill         = memoizeStyle((options?: ContentChildrenMediaOptions) => {
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
        // features:
        ...groupableRule(), // make a nicely rounded corners
        
        
        
        // layouts:
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
});
const isFigureElement    = (selectorEntry: OptionalOrBoolean<SelectorEntry>) =>  isElementSelectorOf(selectorEntry, 'figure');
const isNotFigureElement = (selectorEntry: OptionalOrBoolean<SelectorEntry>) => !isElementSelectorOf(selectorEntry, 'figure');
export const usesContentChildrenMedia        = memoizeStyle((options?: ContentChildrenMediaOptions) => {
    // options:
    const {
        mediaSelectorWithExcept,
        mediaSelectorWithExceptZero,
        
        mediaSelector,
        notNotMediaSelector,
    } = usesContentChildrenMediaOptions(options);
    const figureSelector               : Selector|null          = mediaSelector     && (mediaSelector.find(  (selector) => selector.some( isFigureElement   )) ?? null);
    const nonFigureSelector            : PureSelectorGroup|null = mediaSelector     &&  mediaSelector.filter((selector) => selector.every(isNotFigureElement));
    
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
            return createPureSelectorGroup(
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
    const {separatorRule         } = usesGroupable({
        orientationInlineSelector : null, // never  => the <media> are never  stacked in horizontal
        orientationBlockSelector  : '&',  // always => the <media> are always stacked in vertical
        itemsSelector             : mediaSelectorWithExceptZero,
    });
    
    const {borderRule    : figureItemBorderRule, borderVars: figureItemBorderVars} = usesBorder({
        borderRadius : 'initial', // protect from inheritance
    });
    const {separatorRule : figureItemSeparatorRule} = usesGroupable({
        orientationInlineSelector : null, // never  => the <figureItem> are never  stacked in horizontal
        orientationBlockSelector  : '&',  // always => the <figureItem> are always stacked in vertical
        itemsSelector             : '*', // select all <figureItem>(s) inside <figure>
    });
    const {groupableRule : figureGroupableRule    } = usesGroupable({
        itemsSelector             : '*', // select all <figureItem>(s) inside <figure> for trimming their corners
    });
    
    
    
    return style({
        // children:
        
        // first: reset top_level <figure>
        ...children(figureSelectorWithExcept, {
            // resets:
            ...stripoutFigure(), // clear browser's default styling on `<figure>`
            
            
            
            // features:
            // making the <figure> as border_container => the inner media can have a separator between them
            ...figureGroupableRule(), // make a nicely rounded corners
            
            
            
            // layouts:
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
                        // features:
                        ...figureItemBorderRule(),
                        
                        
                        
                        // layouts:
                        ...style({
                            // borders:
                            border                 : figureItemBorderVars.border,
                         // borderRadius           : figureItemBorderVars.borderRadius,
                            borderStartStartRadius : figureItemBorderVars.borderStartStartRadius,
                            borderStartEndRadius   : figureItemBorderVars.borderStartEndRadius,
                            borderEndStartRadius   : figureItemBorderVars.borderEndStartRadius,
                            borderEndEndRadius     : figureItemBorderVars.borderEndEndRadius,
                        }),
                        
                        
                        
                        // borders:
                        // we placed at the last because we redefined the border at above
                        ...figureItemSeparatorRule(), // turns the current border as separator between <figureItem>(s)
                    }),
                }, { performGrouping: false }), // do not transform/simplify
            }),
        }),
        
        // then: styling <media>:
        ...children(nonFigureSelectorWithExcept, {
            // layouts:
            ...rule(':where(:not(.media))', { // styling all <media> except __custom__ .media
                // resets:
                ...stripoutImage(), // clear browser's default styling on `<img>`
                
                
                
                // layouts:
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
            // features:
            ...borderRule(),
            
            
            
            // layouts:
            ...style({
                // borders:
                border                 : borderVars.border,
             // borderRadius           : borderVars.borderRadius,
                borderStartStartRadius : borderVars.borderStartStartRadius,
                borderStartEndRadius   : borderVars.borderStartEndRadius,
                borderEndStartRadius   : borderVars.borderEndStartRadius,
                borderEndEndRadius     : borderVars.borderEndEndRadius,
            }),
            
            
            
            // borders:
            // we placed at the last because we redefined the border at above
            ...separatorRule(), // turns the current border as separator between <media>(s)
        }),
    });
}, cssContentConfig.onChange);

export interface ContentChildrenLinksOptions {
    linksSelector    ?: CssSelectorCollection
    notLinksSelector ?: CssSelectorCollection
}
export interface ContentChildrenLinksOptionsResult {
    linksSelectorWithExcept     : CssSelectorCollection
    linksSelectorWithExceptZero : CssSelectorCollection
    linksSelector               : PureSelectorGroup|null
    notNotLinksSelector         : PseudoClassSelector|null
}
let defaultContentChildrenLinksOptionsResultCache : WeakRef<ContentChildrenLinksOptionsResult>|undefined = undefined;
export const usesContentChildrenLinksOptions = (options?: ContentChildrenLinksOptions): ContentChildrenLinksOptionsResult => {
    if (options === undefined) {
        const cached = defaultContentChildrenLinksOptionsResultCache?.deref();
        if (cached) return cached;
    } // if
    
    
    
    // options:
    const {
        linksSelector    : linksSelectorStr,
        notLinksSelector : notLinksSelectorStr,
    } = options ?? {};
    
    const linksSelector                : SelectorGroup|null       = linksSelectorStr ? parseSelectors(linksSelectorStr) : createPureSelectorGroup(
        // <a>, .link:
        createSelector(
            createElementSelector('a')
        ),
        createSelector(
            createClassSelector('link')
        ),
    );
    const notLinksSelector             : SelectorGroup|null       = notLinksSelectorStr ? parseSelectors(notLinksSelectorStr) : createPureSelectorGroup(
        // .not-link:
        createSelector(
            createClassSelector('not-link')
        ),
    );
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
    
    const result : ContentChildrenLinksOptionsResult = {
        linksSelectorWithExcept     : toSelectors(adjustChildSpecificity(linksSelectorWithExceptZero)),
        linksSelectorWithExceptZero : toSelectors(linksSelectorWithExceptZero),
        
        linksSelector : linksSelector && selectPureSelectorGroupFromSelectorGroup(linksSelector),
        notNotLinksSelector,
    };
    if (options === undefined) defaultContentChildrenLinksOptionsResultCache = new WeakRef<ContentChildrenLinksOptionsResult>(result);
    return result;
};
export const usesContentChildrenLinks        = memoizeStyle((options?: ContentChildrenLinksOptions) => {
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
}, cssContentConfig.onChange);

export const usesContentChildren             = memoizeStyle((options?: (ContentChildrenMediaOptions & ContentChildrenLinksOptions)) => {
    return style({
        // media:
        ...usesContentChildrenMedia(options),
        
        // links:
        ...usesContentChildrenLinks(options),
        
        // spacings:
        ...usesContentChildrenFill(options), // must be placed at the last
    });
}, cssContentConfig.onChange);



// styles:
export const onContentStylesChange = watchChanges(onBasicStylesChange, cssContentConfig.onChange);

export const usesContentBasicLayout = memoizeStyle(() => {
    // dependencies:
    
    // features:
    const {borderRule , borderVars } = usesBorder(contents as any);
    const {paddingRule, paddingVars} = usesPadding(contents);
    
    
    
    return style({
        // features:
        ...borderRule(),
        ...paddingRule(),
        
        
        
        // layouts:
        ...style({
            // customize:
            ...usesCssProps(contents), // apply config's cssProps
            
            
            
            // borders:
            border                 : borderVars.border,
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
}, cssContentConfig.onChange);
export const usesContentLayout = memoizeStyle(() => {
    return style({
        // layouts:
        ...usesBasicLayout(),
        ...usesContentBasicLayout(),
        ...style({
            // layouts:
            display: 'block',
        }),
    });
}, onContentStylesChange);

export const usesContentBasicVariants = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(contents);
    
    
    
    return style({
        // variants:
        ...resizableRule(),
    });
}, cssContentConfig.onChange);
export const usesContentVariants = memoizeStyle(() => {
    return style({
        // variants:
        ...usesBasicVariants(),
        ...usesContentBasicVariants(),
    });
}, onContentStylesChange);

export default memoizeStyle(() => style({
    // layouts:
    ...usesContentLayout(),
    
    // variants:
    ...usesContentVariants(),
    
    // children:
    ...usesContentChildren(),
}), onContentStylesChange);
