// cssfn:
import {
    // cssfn css specific types:
    CssStyleCollection,
    CssSelectorCollection,
    
    
    
    // writes css in javascript:
    rule,
    variants,
    states,
    children,
    style,
    vars,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a border (stroke) management system:
    borderRadiuses,
    
    
    
    // removes browser's default stylesheet:
    stripoutList,
    
    
    
    // background stuff of UI:
    usesBackground,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // groups a list of UIs into a single UI:
    ifFirstVisibleChild,
    ifLastVisibleChild,
    ifNotFirstVisibleChild,
    usesGroupable,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableOptions,
    usesOrientationable,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ifActive,
    ifPassive,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onIndicatorStylesChange,
    usesIndicatorVariants,
    usesIndicatorStates,
}                           from '@reusable-ui/indicator'       // a base component
import {
    // configs:
    contents,
    
    
    
    // styles:
    onContentStylesChange,
    usesContentBasicLayout,
    usesContentBasicVariants,
    usesContentChildren,
}                           from '@reusable-ui/content'         // a neighbor component
import {
    // styles:
    onIconStylesChange,
    usesIconImage,
}                           from '@reusable-ui/icon'            // an icon component
import {
    // styles:
    onButtonStylesChange,
    usesButtonLayout,
}                           from '@reusable-ui/button'          // a button component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from '../defaults.js'
import {
    // elements:
    wrapperElm,
    listItemElm,
}                           from './elements.js'
import {
    // configs:
    lists,
    cssListConfig,
}                           from './config.js'



// styles:
export const onListStylesChange = watchChanges(onIconStylesChange, onButtonStylesChange, onIndicatorStylesChange, onContentStylesChange, cssListConfig.onChange);

export const usesListLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock, orientationInlineSelector, orientationBlockSelector} = orientationableStuff;
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }&`;
    const ifParentOrientationInline       = (styles: CssStyleCollection) => rule(parentOrientationInlineSelector, styles);
    const ifParentOrientationBlock        = (styles: CssStyleCollection) => rule(parentOrientationBlockSelector , styles);
    options = orientationableStuff;
    
    
    
    // dependencies:
    
    // capabilities:
    const {groupableRule} = usesGroupable({
        ...options,
        itemsSelector             : wrapperElm,
    });
    const {separatorRule} = usesGroupable({
        orientationInlineSelector : parentOrientationInlineSelector,
        orientationBlockSelector  : parentOrientationBlockSelector,
        itemsSelector             : wrapperElm,
    });
    
    // features:
    const {borderRule, borderVars} = usesBorder(lists);
    
    
    
    return style({
        // resets:
        ...stripoutList(),  // clear browser's default styles
        
        
        
        // capabilities:
        ...groupableRule(), // make a nicely rounded corners
        
        
        
        // features:
        // borderRule(),    // moved out to dedicated border stroke for each list & wrapper
        
        
        
        // layouts:
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
            justifyContent    : 'start',       // if wrappers are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first wrapper should be visible first
            alignItems        : 'stretch',     // wrappers width are 100% of the parent (for variant `.block`) or height (for variant `.inline`)
            flexWrap          : 'nowrap',      // no wrapping
            
            
            
            // sizes:
            // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            minInlineSize     : 0,
            
            
            
            // borders:
            ...children(['&', wrapperElm], {
                // features:
                ...borderRule(), // dedicated border stroke for each <List> & <wrapper>(s)
            }),
            
            
            
            // children:
            ...children(wrapperElm, {
                // borders:
                ...separatorRule(), // turns the current border as separator between <wrapper>(s)
                
                
                
                // layouts:
                ...style({
                    // layouts:
                    display        : 'flex',    // use block flexbox, so it takes the entire <List>'s width
                    flexDirection  : 'inherit', // copy <List>'s stack direction
                    justifyContent : 'inherit', // copy <List>'s justifyContent
                    alignItems     : 'inherit', // copy <List>'s justifyContent
                    flexWrap       : 'inherit', // copy <List>'s flexWrap
                    
                    
                    
                    // sizes:
                    flex           : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
                    ...rule(':where(.fluid:not(.solid))', { // only .fluid
                        flexBasis  : '100%', // fill the space as much as possible
                    }),
                    ...rule(':where(.solid:not(.fluid))', { // only .solid => fixed size
                        flexGrow   : 0, // ungrowable
                        flexShrink : 0, // unshrinkable
                    }),
                    ...rule(':where(.fluid.solid)', { // both .fluid & .solid => growable but not shrinkable
                        flexShrink : 0, // unshrinkable
                    }),
                    
                    
                    
                    // children:
                    /*
                        a hack with :not(_)
                        the total selector combined with parent is something like this: `:not(.inline).list>*>:not(_):where(:first-child)`, the specificity weight = 2.1
                        the specificity of 2.1 is a bit higher than:
                        * `.list.content`               , the specificity weight = 2
                        * `.someComponent.toggleButton` , the specificity weight = 2
                        but can be easily overriden by specificity weight >= 3, like:
                        * `.list.button.button`         , the specificity weight = 3
                        * `.someComponent.boo.foo`      , the specificity weight = 3
                    */
                    ...children(':not(_)', {
                        // borders:
                        ...ifParentOrientationInline({ // inline
                            ...ifFirstVisibleChild({
                                // add rounded corners on left:
                                [borderVars.borderStartStartRadius] : 'inherit', // copy wrapper's borderRadius
                                [borderVars.borderEndStartRadius  ] : 'inherit', // copy wrapper's borderRadius
                            }),
                            ...ifLastVisibleChild({
                                // add rounded corners on right:
                                [borderVars.borderStartEndRadius  ] : 'inherit', // copy wrapper's borderRadius
                                [borderVars.borderEndEndRadius    ] : 'inherit', // copy wrapper's borderRadius
                            }),
                        }),
                        ...ifParentOrientationBlock({  // block
                            ...ifFirstVisibleChild({
                                // add rounded corners on top:
                                [borderVars.borderStartStartRadius] : 'inherit', // copy wrapper's borderRadius
                                [borderVars.borderStartEndRadius  ] : 'inherit', // copy wrapper's borderRadius
                            }),
                            ...ifLastVisibleChild({
                                // add rounded corners on bottom:
                                [borderVars.borderEndStartRadius  ] : 'inherit', // copy wrapper's borderRadius
                                [borderVars.borderEndEndRadius    ] : 'inherit', // copy wrapper's borderRadius
                            }),
                        }),
                    }),
                }),
            }),
            
            
            
            // customize:
            ...usesCssProps(lists), // apply config's cssProps
            
            
            
            // borders:
            ...children(['&', wrapperElm], {
                // borders:
                border                 : borderVars.border,
             // borderRadius           : borderVars.borderRadius,
                borderStartStartRadius : borderVars.borderStartStartRadius,
                borderStartEndRadius   : borderVars.borderStartEndRadius,
                borderEndStartRadius   : borderVars.borderEndStartRadius,
                borderEndEndRadius     : borderVars.borderEndEndRadius,
            }),
            
            
            
            // animations:
            ...style({
                transition     : lists.transition,
                ...children(wrapperElm, {
                    transition : [
                        // original:
                        [lists.transition],
                        
                        // overwrites:
                        
                        // borders:
                        ['border-width', '0s'], // does not support transition on border width, because we use it to make a separator
                    ],
                }),
            }),
        }),
    });
};

export interface ListBasicVariantOptions {
    additionRemoveBorderSelector    ?: CssSelectorCollection
    additionRemoveSeparatorSelector ?: CssSelectorCollection
    
    specificityWeight               ?: number
}
export const usesListBasicVariants = (options?: ListBasicVariantOptions) => {
    // options:
    const {
        additionRemoveBorderSelector,
        additionRemoveSeparatorSelector,
        specificityWeight,
    } = options ?? {};
    
    
    
    // dependencies:
    
    // features:
    const {borderVars} = usesBorder();
    
    
    
    return style({
        // variants:
        ...variants([
            rule(['.flat', '.flush', additionRemoveBorderSelector], {
                // borders:
                
                // kill borders surrounding List:
                [borderVars.borderWidth           ] : '0px',
                
                // remove rounded corners on top:
                [borderVars.borderStartStartRadius] : '0px',
                [borderVars.borderStartEndRadius  ] : '0px',
                // remove rounded corners on bottom:
                [borderVars.borderEndStartRadius  ] : '0px',
                [borderVars.borderEndEndRadius    ] : '0px',
            }),
            rule(['.flat', '.joined', additionRemoveSeparatorSelector], {
                // children:
                ...children(wrapperElm, {
                    // borders:
                    // kill separator between items:
                    [borderVars.borderWidth] : '0px',
                }),
            }),
        ], { specificityWeight }),
    });
};

export const usesListVariants = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock, orientationInlineSelector, orientationBlockSelector} = orientationableStuff;
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }&`;
    const ifParentOrientationInline       = (styles: CssStyleCollection) => rule(parentOrientationInlineSelector, styles);
    const ifParentOrientationBlock        = (styles: CssStyleCollection) => rule(parentOrientationBlockSelector , styles);
    
    
    
    // dependencies:
    
    // features:
    const {backgroundVars             } = usesBackground();
    const {borderRule    , borderVars } = usesBorder(lists);
    const {                paddingVars} = usesPadding();
    
    // variants:
    const {resizableRule              } = usesResizable(lists);
    
    
    
    return style({
        /* write specific listStyle first, so it can be overriden by `.nude`, `.mild`, `.outlined`, etc */
        
        /* the most general variants: */
        ...variants([
            rule('.content', { // content
                // variants:
                ...usesContentBasicVariants(),
                
                
                
                // children:
                ...children(wrapperElm, {
                    // children:
                    ...children('*', { // <Accordion> support, both for <listItem> and <secondListItem>
                        // layouts:
                        ...usesContentBasicLayout(),
                        
                        
                        
                        // children:
                        ...usesContentChildren(),
                        
                        
                        
                        // configs:
                        ...vars({
                            // animations:
                            
                            // a tweak for <Content> itself:
                            [contents.transition     ] : [
                                // original:
                                [lists.contentTransition],
                                
                                // overwrites:
                                
                                // borders:
                                ['border-width', '0s'], // does not support transition on border width, because we use it to make a separator
                            ],
                            
                            // a tweak for <Content>'s media:
                            [contents.mediaTransition] : contents.transition,
                        }),
                    }),
                }),
            }),
        ]),
        
        /* a more specific variants: */
        ...usesListBasicVariants({
            additionRemoveBorderSelector    : ['.button', '.tab', '.breadcrumb', '.bullet'],
            additionRemoveSeparatorSelector : ['.button', '.tab', '.breadcrumb', '.bullet'],
            // specificityWeight            : 1, // not needed
        }),
        
        /* the most specific variants: */
        ...variants([ 
            rule('.button', {
                // spacings:
                // add space between buttons:
                gap : lists.buttonSpacing,
                
                
                
                // children:
                ...children(wrapperElm, {
                    // children:
                    ...children(listItemElm, {
                        // layouts:
                        ...usesButtonLayout({
                            orientationInlineSelector : '&',  // always => the <Button> is always stacked in horizontal regradless the orientation of the <List>
                            orientationBlockSelector  : null, // never  => the <Button> is never  stacked in vertical   regradless the orientation of the <List>
                        }),
                        ...style({
                            // layouts:
                            // tweak from `usesButtonLayout` : `inline-flex` => `flex`
                            display : 'flex', // use block flexbox, so it takes the entire parent's width
                            
                            
                            
                            // accessibilities:
                            // undef cursor:
                            cursor  : null,
                            
                            
                            
                            // customize:
                            ...usesCssProps(usesPrefixedProps(lists, 'button')), // apply config's cssProps starting with button***
                        }),
                    }),
                }),
            }),
            rule('.tab', {
                // layouts:
                ...ifOrientationInline({ // inline
                    // tab directions are inline (right) but <List> direction are block (down):
                    display                : 'flex',        // use block flexbox, so it takes the entire parent's width
                }),
                ...ifOrientationBlock({  // block
                    // tab directions are block (down) but <List> direction are inline (right):
                    display                : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                }),
                
                
                
                // children:
                ...children(wrapperElm, {
                    // spacings:
                    ...ifParentOrientationInline({ // inline
                        // shift the items to bottom a bit, so the `active item` can hide the `borderBottom`:
                        marginBlockEnd  : `calc(0px - ${borderVars.borderWidth})`,
                    }),
                    ...ifParentOrientationBlock({  // block
                        // shift the items to right a bit, so the `active item` can hide the `borderRight`:
                        marginInlineEnd : `calc(0px - ${borderVars.borderWidth})`,
                    }),
                    
                    
                    
                    // children:
                    ...children(listItemElm, {
                        // features:
                        ...borderRule(), // restore border stripped out by `inheritBorderFromParent`
                        
                        
                        
                        // layouts:
                        ...style({
                            // borders:
                            [borderVars.borderColor] : 'inherit', // change borderColor independent to child's theme color
                            backgroundClip           : 'padding-box',
                            
                            
                            
                            // customize:
                            ...usesCssProps(usesPrefixedProps(lists, 'tab')), // apply config's cssProps starting with tab***
                            
                            
                            
                            // borders:
                            border                 : borderVars.border,       // restore border stripped out by `inheritBorderFromParent`
                         // borderRadius           : borderVars.borderRadius, // restore border stripped out by `inheritBorderFromParent`
                            borderStartStartRadius : borderVars.borderStartStartRadius,
                            borderStartEndRadius   : borderVars.borderStartEndRadius,
                            borderEndStartRadius   : borderVars.borderEndStartRadius,
                            borderEndEndRadius     : borderVars.borderEndEndRadius,
                            ...ifParentOrientationInline({ // inline
                                // remove rounded corners on bottom:
                                [borderVars.borderEndStartRadius] : '0px',
                                [borderVars.borderEndEndRadius  ] : '0px',
                            }),
                            ...ifParentOrientationBlock({  // block
                                // remove rounded corners on right:
                                [borderVars.borderStartEndRadius] : '0px',
                                [borderVars.borderEndEndRadius  ] : '0px',
                            }),
                            
                            
                            
                            // animations:
                            ...style({
                                transition : [
                                    // original:
                                    [lists.tabTransition],
                                    
                                    // overwrites:
                                    
                                    // borders:
                                    ['border-width', '0s'], // does not support transition on border width, because we use [border-width & padding] to maintain size
                                    
                                    // spacings:
                                    ['padding'     , '0s'], // does not support transition on padding     , because we use [border-width & padding] to maintain size
                                ],
                            }),
                        }),
                        
                        
                        
                        // states:
                        ...states([
                            ifPassive({
                                ...ifParentOrientationInline({ // inline
                                    // borders:
                                    // kill border [left, top, right] surrounding tab:
                                    borderInlineWidth      : 0,
                                    borderBlockStartWidth  : 0,
                                    
                                    // remove rounded corners on top:
                                    [borderVars.borderStartStartRadius] : '0px',
                                    [borderVars.borderStartEndRadius  ] : '0px',
                                    
                                    
                                    
                                    // spacings:
                                    // compensates the missing borders:
                                    paddingInline          : `calc(${paddingVars.paddingInline} + ${borderVars.borderWidth})`,
                                    paddingBlockStart      : `calc(${paddingVars.paddingBlock } + ${borderVars.borderWidth})`,
                                }),
                                ...ifParentOrientationBlock({  // block
                                    // borders:
                                    // kill border [top, left, bottom] surrounding tab:
                                    borderBlockWidth       : 0,
                                    borderInlineStartWidth : 0,
                                    
                                    // remove rounded corners on left:
                                    [borderVars.borderStartStartRadius] : '0px',
                                    [borderVars.borderEndStartRadius  ] : '0px',
                                    
                                    
                                    
                                    // spacings:
                                    // compensates the missing borders:
                                    paddingBlock           : `calc(${paddingVars.paddingBlock } + ${borderVars.borderWidth})`,
                                    paddingInlineStart     : `calc(${paddingVars.paddingInline} + ${borderVars.borderWidth})`,
                                }),
                            }),
                            ifActive({
                                ...ifParentOrientationInline({ // inline
                                    // borders:
                                    // kill border on bottom:
                                    borderBlockEndWidth    : 0,
                                    
                                    
                                    
                                    // spacings:
                                    // compensates the missing borders:
                                    paddingBlockEnd        : `calc(${paddingVars.paddingBlock } + ${borderVars.borderWidth})`,
                                }),
                                ...ifParentOrientationBlock({  // block
                                    // borders:
                                    // kill border on right:
                                    borderInlineEndWidth   : 0,
                                    
                                    
                                    
                                    // spacings:
                                    // compensates the missing borders:
                                    paddingInlineEnd       : `calc(${paddingVars.paddingInline} + ${borderVars.borderWidth})`,
                                }),
                            }),
                        ]),
                    }),
                }),
            }),
            rule('.breadcrumb', {
                // children:
                ...children(wrapperElm, {
                    // children:
                    ...ifNotFirstVisibleChild({
                        // children:
                        ...children('::before', {
                            // layouts:
                            ...usesIconImage({
                                image : lists.breadcrumbSeparatorImage,
                                color : backgroundVars.altBackgColor,
                            }),
                            ...style({
                                // layouts:
                                display    : 'block', // fills the entire wrapper's width
                                content    : '""',
                                
                                
                                
                                // sizes:
                                flex       : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
                                
                                
                                
                                // customize:
                                ...usesCssProps(usesPrefixedProps(lists, 'breadcrumbSeparator')), // apply config's cssProps starting with breadcrumbSeparator***
                            }),
                        }),
                    }),
                    ...children(listItemElm, {
                        // typos:
                        lineHeight : 1,
                        
                        
                        
                        // customize:
                        ...usesCssProps(usesPrefixedProps(lists, 'breadcrumb')), // apply config's cssProps starting with breadcrumb***
                    }),
                    
                    
                    
                    // customize:
                    ...ifParentOrientationBlock({  // block
                        // overwrites propName = {breadcrumbSeparator}PropName{Block}:
                        ...overwriteProps(lists, usesSuffixedProps(usesPrefixedProps(lists, 'breadcrumbSeparator', false), 'block')),
                    }),
                }),
            }),
            rule('.bullet', {
                // layouts:
                justifyContent : 'space-between', // separates each bullet as far as possible
                alignItems     : 'center',        // each bullet might have different size, so center it instead of stretch it
                
                
                
                // spacings:
                // add space between bullets:
                gap            : lists.bulletSpacing,
                
                
                
                // children:
                ...children(wrapperElm, {
                    // sizes:
                    flex       : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
                    
                    
                    
                    // children:
                    ...children(listItemElm, {
                        // features:
                        ...borderRule(), // restore border stripped out by `inheritBorderFromParent`
                        
                        
                        
                        // layouts:
                        ...style({
                            // layouts:
                            display        : 'flex',    // use block flexbox, so it takes the entire List's width
                            flexDirection  : 'inherit', // copy wrapper's stack direction
                            justifyContent : 'inherit', // copy wrapper's justifyContent
                            alignItems     : 'inherit', // copy wrapper's justifyContent
                            flexWrap       : 'inherit', // copy wrapper's flexWrap
                            
                            
                            
                            // sizes:
                            flex           : 'inherit', // copy wrapper's flex
                            
                            
                            
                            // borders:
                            // big rounded corners on top:
                            [borderVars.borderStartStartRadius] : borderRadiuses.pill,
                            [borderVars.borderStartEndRadius  ] : borderRadiuses.pill,
                            // big rounded corners on bottom:
                            [borderVars.borderEndStartRadius  ] : borderRadiuses.pill,
                            [borderVars.borderEndEndRadius    ] : borderRadiuses.pill,
                            
                            overflow       : 'hidden', // clip the children at the rounded corners
                            
                            
                            
                            // customize:
                            ...usesCssProps(usesPrefixedProps(lists, 'bullet')), // apply config's cssProps starting with bullet***
                            
                            
                            
                            // borders:
                            border                 : borderVars.border,       // restore border stripped out by `inheritBorderFromParent`
                         // borderRadius           : borderVars.borderRadius, // restore border stripped out by `inheritBorderFromParent`
                            borderStartStartRadius : borderVars.borderStartStartRadius,
                            borderStartEndRadius   : borderVars.borderStartEndRadius,
                            borderEndStartRadius   : borderVars.borderEndStartRadius,
                            borderEndEndRadius     : borderVars.borderEndEndRadius,
                        }),
                    }),
                }),
            }),
            rule('.numbered', {
                // behaviors:
                counterReset: 'ListNumber',
                
                
                
                // children:
                ...children(wrapperElm, {
                    // children:
                    ...children(listItemElm, {
                        ...rule(':not(.void)', { // skip separator
                            // children:
                            ...children('::before', {
                                // behaviors:
                                counterIncrement : 'ListNumber',
                                
                                
                                
                                // customize:
                                ...usesCssProps(usesPrefixedProps(lists, 'numbered')), // apply config's cssProps starting with numbered***
                            }),
                        }),
                    }),
                }),
            }),
        ], { specificityWeight: 2 }),
        /*
            the total selector combined with parent is something like this: `.list.button.button`, the specificity weight = 3
            the specificity of 3 is a bit higher than:
            *      `:not(.inline)>*>.listItem:not(_)`           , the specificity weight = 2.1 (<listItem>'s borderSeparator)
            * `:not(.inline).list>*>:not(_):where(:first-child)`, the specificity weight = 2.1 (<listItem>'s borderRadius)
        */
        
        /* the king variants: */
        ...usesIndicatorVariants(),
        ...resizableRule(),
    });
};

export const usesListStates = usesIndicatorStates;

export default () => style({
    // layouts:
    ...usesListLayout(),
    
    // variants:
    ...usesListVariants(),
    
    // states:
    ...usesListStates(),
});
