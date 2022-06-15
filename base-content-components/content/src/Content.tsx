// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // types:
    OptionalOrBoolean,
}                           from '@cssfn/types'
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
    
    CssSelectorCollection,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    rules,
    fallbacks,
    atGlobal,
    atRoot,
    
    
    
    // combinators:
    children,
    nextSiblings,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // style sheets:
    styleSheet,
    
    
    
    // utilities:
    iif,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // utilities:
    cssVar,
}                           from '@cssfn/css-var'               // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
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

// reusable-ui:
import {
    // configs:
    borders as borderStrokes,
    borderRadiuses,
}                           from '@reusable-ui/borders'         // a border (stroke) management system
import {
    // styles:
    stripoutFigure,
    stripoutImage,
}                           from '@reusable-ui/stripouts'       // removes browser's default stylesheet
import {
    // types:
    FeatureMixin,
    
    
    
    // hooks:
    OrientationRuleOptions,
    defaultBlockOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    usesBorder,
    extendsBorder,
    usesPadding,
    extendsPadding,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component
import {
    // rules:
    ifFirstVisibleChild,
    ifLastVisibleChild,
    
    
    
    // hooks:
    usesContainer,
    usesBorderAsContainer,
    usesBorderAsSeparatorBlock,
}                           from '@reusable-ui/container'       // a neighbor component



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

export interface ContentChildrenOptions {
    mediaSelector    ?: CssSelectorCollection
    notMediaSelector ?: CssSelectorCollection
}
export const usesContentChildrenOptions = (options: ContentChildrenOptions = {}) => {
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
export const usesContentChildrenFill    = (options: ContentChildrenOptions = {}) => {
    // options:
    const {
        mediaSelectorWithExcept,
        mediaSelectorWithExceptZero,
    } = usesContentChildrenOptions(options);
    
    
    
    // dependencies:
    
    // layouts:
    const [, containerVars]     = usesContainer();
    
    // spacings:
    const positivePaddingInline = containerVars.paddingInline;
    const positivePaddingBlock  = containerVars.paddingBlock;
    const negativePaddingInline = `calc(0px - ${positivePaddingInline})`;
    const negativePaddingBlock  = `calc(0px - ${positivePaddingBlock })`;
    
    
    
    return style({
        ...imports([
            // borders:
            usesBorderAsContainer({ itemsSelector: mediaSelectorWithExcept }), // make a nicely rounded corners
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
export const usesContentChildrenMedia   = (options: ContentChildrenOptions = {}) => {
    // options:
    const {
        mediaSelectorWithExcept,
        mediaSelectorWithExceptZero,
        
        mediaSelector,
        notNotMediaSelector,
    } = usesContentChildrenOptions(options);
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
    
    
    
    return style({
        // children:
        
        // first: reset top_level <figure>
        ...children(figureSelectorWithExcept, {
            ...imports([
                // resets:
                stripoutFigure(),        // clear browser's default styling on `<figure>`
                
                // borders:
                // making the <figure> as border_container => the inner media can have a separator between them
                usesBorderAsContainer(), // make a nicely rounded corners
            ]),
            ...style({
                // layouts:
                display        : 'flex',    // use block flexbox, so it takes the entire parent's width
                flexDirection  : 'column',  // items are stacked vertically
                justifyContent : 'start',   // if items are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first item should be visible first
                alignItems     : 'stretch', // items width are 100% of the parent
                flexWrap       : 'nowrap',  // prevents the items to wrap to the next column
                
                
                
                // children:
                ...children('*', {
                    // borders:
                    ...extendsBorder(), // extends border css vars
                }),
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
        }),
        
        // finally: styling top_level <figure> & top_level <media> as separator:
        ...children(mediaSelectorWithExcept, {
            ...style({
                // borders:
                
                // let's Reusable-UI system to manage borderStroke & borderRadius:
                ...extendsBorder(), // extends border css vars
            }),
            ...imports([
                // borders:
                usesBorderAsSeparatorBlock({ itemsSelector: mediaSelectorWithExceptZero }), // must be placed at the last
            ]),
        }),
    });
};

/**
 * Applies a responsive content layout.
 * @returns A `CssRule` represents a responsive content layout.
 */
export const usesResponsiveContentLayout = () => {
    return style({
        // borders:
        ...extendsBorder(contents), // extends border css vars
        
        
        
        // spacings:
        ...extendsPadding(contents), // extends padding css vars
    });
};
/**
 * Applies a responsive content using grid layout.
 * @returns A `CssRule` represents a responsive content using grid layout.
 */
export const usesResponsiveContentGridLayout = () => {
    // dependencies:
    
    // spacings:
    const [, paddings] = usesPadding();
    
    
    
    return style({
        // layouts:
        display             : 'grid', // use css grid for layouting
        // define our logical paddings:
        gridTemplateRows    : [[paddings.paddingBlock,  'auto', paddings.paddingBlock ]], // the height of each row
        gridTemplateColumns : [[paddings.paddingInline, 'auto', paddings.paddingInline]], // the width of each column
        gridTemplateAreas   : [[
            '"........... blockStart ........."',
            '"inlineStart  content   inlineEnd"',
            '"...........  blockEnd  ........."',
        ]],
        
        
        
        // borders:
        ...extendsBorder(contents), // extends border css vars
        
        
        
        // spacings:
        ...extendsPadding(contents), // extends padding css vars
        ...style({
            // since we use grid as paddings, so the css paddings are no longer needed:
            paddingInline : null, // turn off physical padding, use logical padding we've set above
            paddingBlock  : null, // turn off physical padding, use logical padding we've set above
        }),
    });
};

export const usesContentChildren = (options: ContentChildrenOptions = {}) => {
    return style({
        ...imports([
            // spacings:
            usesContentChildrenFill(options), // must be placed at the last
        ]),
    });
};

export const usesContentLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesBasicLayout(),
        ]),
        ...style({
            // layouts:
            display: 'block',
            
            
            
            // customize:
            ...usesCssProps(contents), // apply config's cssProps
        }),
        ...imports([
            // layouts:
            usesResponsiveContentLayout(), // must be placed at the last
        ]),
    });
};
export const usesContentVariants = () => {
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
        ]),
    });
};

export const useContentStyleSheet = createUseStyleSheet(() => ({
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
export const [contents, cssContentConfig] = cssConfig(() => {
    return {
        // borders:
        borderWidth      : borderStrokes.none   as CssKnownProps['borderWidth'  ], // strip out <Basic>'s border
        borderRadius     : borderRadiuses.none  as CssKnownProps['borderRadius' ], // strip out <Basic>'s borderRadius
        
        
        
        // spacings:
        paddingInline    : '12px'               as CssKnownProps['paddingInline'],
        paddingBlock     :  '9px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineSm  : '24px'               as CssKnownProps['paddingInline'],
        paddingBlockSm   : '18px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineMd  : '36px'               as CssKnownProps['paddingInline'],
        paddingBlockMd   : '27px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineLg  : '48px'               as CssKnownProps['paddingInline'],
        paddingBlockLg   : '36px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineXl  : '60px'               as CssKnownProps['paddingInline'],
        paddingBlockXl   : '45px'               as CssKnownProps['paddingBlock' ],
        
        paddingInlineXxl : '72px'               as CssKnownProps['paddingInline'],
        paddingBlockXxl  : '54px'               as CssKnownProps['paddingBlock' ],
    };
}, { prefix: 'ct' });



// react components:
export interface ContentProps<TElement extends Element = Element>
    extends
        // bases:
        BasicProps<TElement>
{
    // children:
    children ?: React.ReactNode
}
const Content = <TElement extends Element = Element>(props: ContentProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet         = useContentStyleSheet();
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...props}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        />
    );
};
export {
    Content,
    Content as default,
}
