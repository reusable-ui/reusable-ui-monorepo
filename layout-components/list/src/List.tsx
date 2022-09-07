// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // types:
    Optional,
    SingleOrArray,
}                           from '@cssfn/types'                 // cssfn general types
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssStyleCollection,
    
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
    vars,
    imports,
    
    
    
    // utilities:
    escapeSvg,
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
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui configs:
import {
    // configs:
    borderRadiuses,
}                           from '@reusable-ui/borders'         // a border (stroke) management system
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'         // a spacer (gap) management system

// reusable-ui utilities:
import {
    // styles:
    stripoutList,
}                           from '@reusable-ui/stripouts'       // removes browser's default stylesheet
import {
    // hooks:
    useMergeEvents,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // types:
    Tag,
    SemanticTag,
    SemanticRole,
    
    
    
    // hooks:
    useTestSemantic,
}                           from '@reusable-ui/semantics'       // a semantic management system for react web components
import {
    // hooks:
    usePropActive,
}                           from '@reusable-ui/accessibilities' // an accessibility management system

// reusable-ui features:
import {
    // hooks:
    usesBackground,
}                           from '@reusable-ui/background'      // background stuff of UI
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
    ifNotFirstVisibleChild,
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
import {
    // hooks:
    mildOf,
}                           from '@reusable-ui/mildable'        // mild (soft color) variant of UI

// reusable-ui states:
import {
    // hooks:
    ifActive,
    ifPassive,
    MarkActiveOptions,
    markActive,
}                           from '@reusable-ui/activatable'     // a capability of UI to be highlighted/selected/activated
import {
    // hooks:
    ifFocus,
}                           from '@reusable-ui/focusable'       // a capability of UI to be focused
import {
    // hooks:
    ifArrive,
}                           from '@reusable-ui/interactable'    // adds an interactive feel to a UI
import {
    // hooks:
    ifPress,
}                           from '@reusable-ui/clickable'       // a capability of UI to be clicked

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
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
    
    
    
    // react components:
    ActionControl,
}                           from '@reusable-ui/action-control'  // a base component
import {
    // styles:
    usesContentBasicLayout,
    usesContentBasicVariants,
    usesContentChildren,
    
    
    
    // configs:
    contents,
}                           from '@reusable-ui/content'         // a neighbor component
import {
    // styles:
    usesIconImage,
}                           from '@reusable-ui/icon'            // an icon component
import {
    // hooks:
    SemanticButtonProps,
    useSemanticButton,
    
    
    
    // styles:
    usesButtonLayout,
}                           from '@reusable-ui/button'          // a button component



// defaults:
export const defaultOrientationableOptions = defaultBlockOrientationableOptions;
const _defaultMarkActiveOptions        : MarkActiveOptions  = { outlined: null, mild: null };

const _defaultSemanticTag              : SemanticTag        = ['ul', 'ol'] // uses <ul>          as the default semantic, fallbacks to <ol>
const _defaultSemanticRole             : SemanticRole       = ['list'    ] // uses [role="list"] as the default semantic

const _defaultOutlined                 : boolean            = false
const _defaultMild                     : boolean            = true
const _defaultActionCtrl               : boolean|undefined  = undefined

const _defaultItemOutlined             : boolean            = false
const _defaultItemMild                 : boolean            = false
const _defaultItemActionCtrl           : boolean            = false

const _defaultListSeparatorItemClasses : Optional<string>[] = ['void']



// styles:
export const wrapperElm  = '*'                    // zero degree specificity to be easily overwritten
export const listItemElm = ':where(:first-child)' // zero degree specificity to be easily overwritten
// not exported:
const horzRuleElm        = ':where(hr)'           // zero degree specificity to be easily overwritten



export const stripoutCommonBasicLayout = () => {
    // dependencies:
    
    // features:
    const {borderVars} = usesBorder();
    
    
    
    // makes dynamic border & borderRadius work on <ListItem>(s):
    return style({
        // borders:
        // undef border stroke:
        [borderVars.borderStyle           ] : null, // always same as <List>
        [borderVars.borderWidth           ] : null, // always same as <List>
        /*
        [borderVars.borderColorFn] // independent for each <ListItem>
        [borderVars.borderColor  ] // independent for each <ListItem>
        [borderVars.border       ] // independent for each <ListItem>
        */
        
        // undef border radius:
        [borderVars.borderStartStartRadius] : null, // always same as <List>
        [borderVars.borderStartEndRadius  ] : null, // always same as <List>
        [borderVars.borderEndStartRadius  ] : null, // always same as <List>
        [borderVars.borderEndEndRadius    ] : null, // always same as <List>
        /*
        [borderVars.borderRadius ] // independent for each <ListItem>
        */
    });
};
export const usesListItemInheritMildVariant = () => {
    return style({
        ...variants([
            rule('.mild>*>&', { // .mild>*>.listItem => the specificity weight including parent = 2, is enough to kill :where(&):not(:is(.mild&, &.mild))
                ...imports([
                    mildOf(true),
                ]),
            }),
        ]),
    });
};



export const usesListItemBaseLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {orientationInlineSelector, orientationBlockSelector} = orientationableStuff;
    /*
        a hack with :not(_)
        the total selector combined with parent is something like this: `:not(.inline)>*>.listItem:not(_)`, the specificity weight = 2.1
        the specificity of 2.1 is a bit higher than:
        * `.list.content`               , the specificity weight = 2
        * `.someComponent.toggleButton` , the specificity weight = 2
        but can be easily overriden by specificity weight >= 3, like:
        * `.list.button.button`         , the specificity weight = 3
        * `.someComponent.boo.foo`      , the specificity weight = 3
    */
    const parentOrientationInlineSelector = `${orientationInlineSelector}>*>&:not(_)`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }>*>&:not(_)`;
    
    
    
    // dependencies:
    
    // features:
    const {separatorRule} = usesGroupable({
        orientationInlineSelector : parentOrientationInlineSelector,
        orientationBlockSelector  : parentOrientationBlockSelector,
        itemsSelector             : '*', // select <ListItem> & <foreign-elm>
    });
    
    
    
    return style({
        ...imports([
            // borders:
            /*
                Accordion supports: a separator between Accordion's header & body.
            */
            separatorRule, // turns the current border as separator between <ListItem> & <foreign-elm>
        ]),
        ...style({
            // spacings:
            margin: 0, // a fix for marginBlockEnd of <h1>...<h6>
        }),
    });
};
export const usesListItemLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    options = orientationableStuff;
    
    
    
    return style({
        ...imports([
            // layouts:
            usesIndicatorLayout(),
            
            // resets:
            stripoutCommonBasicLayout(),
            
            // layouts:
            usesListItemBaseLayout(options), // must be placed at the last
        ]),
        ...style({
            // layouts:
            display   : 'block',  // fills the entire wrapper's width
            
            
            
            // sizes:
            flex      : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(lists, 'item')), // apply config's cssProps starting with item***
            
            
            
            // animations:
            ...style({
                transition : [
                    // original:
                    [lists.itemTransition],
                    
                    // overwrites:
                    
                    // borders:
                    ['border-width', '0s'], // does not support transition on border width, because we use it to make a separator
                ],
            }),
        }),
    });
};
export const usesListItemVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(usesPrefixedProps(lists, 'item'));
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            usesListItemInheritMildVariant(),
            resizableRule,
        ]),
    });
};
export const usesListItemStates = () => {
    return style({
        ...imports([
            // states:
            usesIndicatorStates(),
        ]),
    });
};

export const useListItemStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesListItemLayout(),
        
        // variants:
        usesListItemVariants(),
        
        // states:
        usesListItemStates(),
    ]),
}), { id: '2vajf0sgc2' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesListSeparatorItemLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {orientationInlineSelector, orientationBlockSelector} = orientationableStuff;
    const parentOrientationInlineSelector = `${orientationInlineSelector}>*>&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }>*>&`;
    const ifParentOrientationInline       = (styles: CssStyleCollection) => rule(parentOrientationInlineSelector, styles);
    const ifParentOrientationBlock        = (styles: CssStyleCollection) => rule(parentOrientationBlockSelector , styles);
    
    
    
    // dependencies:
    
    // features:
    const {borderVars } = usesBorder();
    const {paddingVars} = usesPadding();
    
    
    
    return style({
        // layouts:
        display           : 'flex',   // use block flexbox, so it takes the entire wrapper's width
        ...ifParentOrientationInline({ // inline
            flexDirection : 'column', // items are stacked vertically
        }),
        ...ifParentOrientationBlock({  // block
            flexDirection : 'row',    // items are stacked horizontally
        }),
        justifyContent    : 'center', // center items (text, icon, etc) horizontally
        alignItems        : 'center', // center items (text, icon, etc) vertically
        flexWrap          : 'nowrap', // no wrapping
        
        
        
        // spacings:
        [paddingVars.paddingInline] : '0px', // discard padding
        [paddingVars.paddingBlock ] : '0px', // discard padding
        
        
        
        // children:
        ...children(horzRuleElm, {
            // appearances:
            opacity       : 'unset',
            
            
            
            // sizes:
            flex          : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
            // foregrounds:
            foreg         : borderVars.borderColor,
            
            
            
            // spacings:
            margin        : 0,
        }),
        ...ifParentOrientationInline({ // inline
            // children:
            ...children(horzRuleElm, {
                // appearances:
                // rotate the <hr> 90 deg:
                writingMode: 'vertical-lr',
            }),
        }),
    });
};

export const useListSeparatorItemStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesListSeparatorItemLayout(),
    ]),
}), {
    specificityWeight : 2,            // makes <ListSeparatorItem> more specific than <ListItem>
    id                : 'n8qnfmo0ja', // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
});



export const usesListActionItemLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesActionControlLayout(),
            
            // resets:
            stripoutCommonBasicLayout(),
        ]),
    });
};
export const usesListActionItemVariants = () => {
    return style({
        ...imports([
            // variants:
            usesActionControlVariants(),
            usesListItemInheritMildVariant(),
        ]),
    });
};
export const usesListActionItemStates = () => {
    return style({
        ...imports([
            // states:
            usesActionControlStates(),
        ]),
        ...states([
            ifActive({
                ...imports([
                    markActive(_defaultMarkActiveOptions),
                ]),
            }),
            ifFocus({
                ...imports([
                    markActive(_defaultMarkActiveOptions),
                ]),
            }),
            ifArrive({
                ...imports([
                    markActive(_defaultMarkActiveOptions),
                ]),
            }),
            ifPress({
                ...imports([
                    markActive(_defaultMarkActiveOptions),
                ]),
            }),
        ]),
    });
};

export const useListActionItemStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesListActionItemLayout(),
        
        // variants:
        usesListActionItemVariants(),
        
        // states:
        usesListActionItemStates(),
    ]),
}), { id: '1jdx2owh1e' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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
    
    // features:
    const {borderRule, borderVars} = usesBorder(lists);
    const {groupableRule         } = usesGroupable({
        ...options,
        itemsSelector             : wrapperElm,
    });
    const {separatorRule         } = usesGroupable({
        orientationInlineSelector : parentOrientationInlineSelector,
        orientationBlockSelector  : parentOrientationBlockSelector,
        itemsSelector             : wrapperElm,
    });
    
    
    
    return style({
        ...imports([
            // resets:
            stripoutList(), // clear browser's default styles
            
            // features:
            // borderRule,  // moved out to dedicated border stroke for each list & wrapper
            groupableRule,  // make a nicely rounded corners
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
            justifyContent    : 'start',       // if wrappers are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first wrapper should be visible first
            alignItems        : 'stretch',     // wrappers width are 100% of the parent (for variant `.block`) or height (for variant `.inline`)
            flexWrap          : 'nowrap',      // no wrapping
            
            
            
            // sizes:
            // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            minInlineSize     : 0,
            
            
            
            // borders:
            ...children(['&', wrapperElm], {
                ...imports([
                    // features:
                    borderRule, // dedicated border stroke for each <List> & <wrapper>(s)
                ]),
            }),
            
            
            
            // children:
            ...children(wrapperElm, {
                ...imports([
                    // borders:
                    separatorRule, // turns the current border as separator between <wrapper>(s)
                ]),
                ...style({
                    // layouts:
                    display        : 'flex',    // use block flexbox, so it takes the entire <List>'s width
                    flexDirection  : 'inherit', // copy <List>'s stack direction
                    justifyContent : 'inherit', // copy <List>'s justifyContent
                    alignItems     : 'inherit', // copy <List>'s justifyContent
                    flexWrap       : 'inherit', // copy <List>'s flexWrap
                    
                    
                    
                    // sizes:
                    flex           : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
                    
                    
                    
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
                border       : borderVars.border,
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
    const {borderRule    , borderVars } = usesBorder(lists);
    const {                paddingVars} = usesPadding();
    
    // variants:
    const {resizableRule              } = usesResizable(lists);
    
    // features:
    const {backgroundVars             } = usesBackground();
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            resizableRule,
        ]),
        ...variants([
            rule('.content', { // content
                ...imports([
                    // variants:
                    usesContentBasicVariants(),
                ]),
                
                
                
                // children:
                ...children(wrapperElm, {
                    // children:
                    ...children('*', { // <Accordion> support, both for <listItem> and <secondListItem>
                        ...imports([
                            // layouts:
                            usesContentBasicLayout(),
                            
                            // children:
                            usesContentChildren(),
                        ]),
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
        ...imports([
            usesListBasicVariants({
                additionRemoveBorderSelector    : ['.button', '.tab', '.breadcrumb', '.bullet'],
                additionRemoveSeparatorSelector : ['.button', '.tab', '.breadcrumb', '.bullet'],
                // specificityWeight            : 1, // not needed
            }),
        ]),
        ...variants([ 
            rule('.button', {
                // spacings:
                // add space between buttons:
                gap : lists.buttonSpacing,
                
                
                
                // children:
                ...children(wrapperElm, {
                    // children:
                    ...children(listItemElm, {
                        ...imports([
                            // layouts:
                            usesButtonLayout({
                                orientationInlineSelector : '&',  // always => the <Button> is always stacked in horizontal regradless the orientation of the <List>
                                orientationBlockSelector  : null, // never  => the <Button> is never  stacked in vertical   regradless the orientation of the <List>
                            }),
                        ]),
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
                        ...imports([
                            // features:
                            borderRule, // restore border stripped out by `stripoutCommonBasicLayout`
                        ]),
                        ...style({
                            // borders:
                            [borderVars.borderColor] : 'inherit', // change borderColor independent to child's theme color
                            backgroundClip           : 'padding-box',
                            
                            
                            
                            // customize:
                            ...usesCssProps(usesPrefixedProps(lists, 'tab')), // apply config's cssProps starting with tab***
                            
                            
                            
                            // borders:
                            border       : borderVars.border,                 // restore border stripped out by `stripoutCommonBasicLayout`
                         // borderRadius           : borderVars.borderRadius, // restore border stripped out by `stripoutCommonBasicLayout`
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
                            ...imports([
                                usesIconImage(
                                    /*image : */lists.breadcrumbSeparatorImage,
                                    /*color : */backgroundVars.altBackgColor,
                                ),
                            ]),
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
                        ...imports([
                            // features:
                            borderRule, // restore border stripped out by `stripoutCommonBasicLayout`
                        ]),
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
                            border       : borderVars.border,                 // restore border stripped out by `stripoutCommonBasicLayout`
                         // borderRadius           : borderVars.borderRadius, // restore border stripped out by `stripoutCommonBasicLayout`
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
    });
};
export const usesListStates = () => {
    return style({
        ...imports([
            // states:
            usesIndicatorStates(),
        ]),
    });
};

export const useListStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesListLayout(),
        
        // variants:
        usesListVariants(),
        
        // states:
        usesListStates(),
    ]),
}), { id: 'dj4jw72kyr' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export type ListBasicStyle = 'flat'|'flush'|'joined';
export type ListStyle = ListBasicStyle|'content'|'button'|'tab'|'breadcrumb'|'bullet'|'numbered' // might be added more styles in the future
export interface ListVariant {
    listStyle ?: SingleOrArray<ListStyle>
}
export const useListVariant = ({ listStyle }: ListVariant) => {
    return {
        class: (
            (Array.isArray(listStyle) ? listStyle : [listStyle])
            .filter((style) => !!style).join(' ')
            ||
            null
        ),
    };
};



// configs:
export const [lists, listValues, cssListConfig] = cssConfig(() => {
    return {
        // borders:
        borderStyle       : basics.borderStyle                          as CssKnownProps['borderStyle'],
        borderWidth       : basics.borderWidth                          as CssKnownProps['borderWidth'],
        borderColor       : basics.borderColor                          as CssKnownProps['borderColor'],
        
        borderRadius      : basics.borderRadius                         as CssKnownProps['borderRadius'],
        borderRadiusSm    : basics.borderRadiusSm                       as CssKnownProps['borderRadius'],
        borderRadiusLg    : basics.borderRadiusLg                       as CssKnownProps['borderRadius'],
        
        
        
        // animations:
        transition        : basics.transition                           as CssKnownProps['transition'],
        itemTransition    : basics.transition                           as CssKnownProps['transition'],
        contentTransition : basics.transition                           as CssKnownProps['transition'],
        tabTransition     : basics.transition                           as CssKnownProps['transition'],
        bulletTransition  : basics.transition                           as CssKnownProps['transition'],
        
        
        
        buttonSpacing     : spacers.sm                                  as CssKnownProps['gapInline'],
        buttonSpacingSm   : spacers.xs                                  as CssKnownProps['gapInline'],
        buttonSpacingLg   : spacers.md                                  as CssKnownProps['gapInline'],
        
        
        
        tabTextAlign      : 'center'                                    as CssKnownProps['textAlign'],
        
        
        
        breadcrumbPaddingInline              : basics.paddingBlock      as CssKnownProps['paddingInline'],
        breadcrumbPaddingBlock               : basics.paddingBlock      as CssKnownProps['paddingBlock' ],
        breadcrumbPaddingInlineSm            : basics.paddingBlockSm    as CssKnownProps['paddingInline'],
        breadcrumbPaddingBlockSm             : basics.paddingBlockSm    as CssKnownProps['paddingBlock' ],
        breadcrumbPaddingInlineLg            : basics.paddingBlockLg    as CssKnownProps['paddingInline'],
        breadcrumbPaddingBlockLg             : basics.paddingBlockLg    as CssKnownProps['paddingBlock' ],
        
        breadcrumbSeparatorImage             : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><polyline points='7.5 3 16.5 12 7.5 21' fill='none' stroke='#000' stroke-linecap='square' stroke-width='3'/></svg>")}")`                                                  as CssKnownProps['maskImage'],
        breadcrumbSeparatorImageBlock        : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><polyline points='7.5 3 16.5 12 7.5 21' fill='none' stroke='#000' stroke-linecap='square' stroke-width='3' transform-origin='center' transform='rotate(90)'/></svg>")}")` as CssKnownProps['maskImage'],
        breadcrumbSeparatorInlineSize        : '0.8em'                  as CssKnownProps['inlineSize'],
        breadcrumbSeparatorBlockSize         : 'auto'                   as CssKnownProps['blockSize' ],
        breadcrumbSeparatorInlineSizeBlock   : 'auto'                   as CssKnownProps['inlineSize'],
        breadcrumbSeparatorBlockSizeBlock    : '0.8em'                  as CssKnownProps['blockSize' ],
        breadcrumbSeparatorMarginInline      : '0.25em'                 as CssKnownProps['marginInline'],
        breadcrumbSeparatorMarginBlock       : '0em'                    as CssKnownProps['marginBlock' ],
        breadcrumbSeparatorMarginInlineBlock : '0em'                    as CssKnownProps['marginInline'],
        breadcrumbSeparatorMarginBlockBlock  : '0.25em'                 as CssKnownProps['marginBlock'],
        
        
        
        bulletSpacing     : spacers.sm                                  as CssKnownProps['gapInline'],
        bulletSpacingSm   : spacers.xs                                  as CssKnownProps['gapInline'],
        bulletSpacingLg   : spacers.md                                  as CssKnownProps['gapInline'],
        
        bulletPadding     : spacers.xs                                  as CssKnownProps['paddingInline'],
        bulletPaddingSm   : spacers.xxs                                 as CssKnownProps['paddingInline'],
        bulletPaddingLg   : spacers.sm                                  as CssKnownProps['paddingInline'],
        
        
        
        /* a non_nested counter */
        numberedContent   : [[
            'counter(ListNumber)',
            '". "'
        ]]                                                              as CssKnownProps['content'],
        
        /* a nested counter */
        // numberedContent   : [[
        //     'counters(ListNumber, ".")',
        //     '". "'
        // ]]                                                           as CssKnownProps['content'],
    };
}, { prefix: 'list' });



// handlers:
export const handleAnimationEndForward : React.AnimationEventHandler<Element> = (event) => {
    /**
     * because the `usesListLayout` is neither inherit from `usesIndicatorLayout` nor applies `anim: ...`,
     * so the `onAnimationEnd` will __never__ triggered directly (non_bubbled).
     * 
     * the `useEnableDisableState() => handleAnimationEnd` only perform non_bubbled `onAnimationEnd`.
     * 
     * thus we need to trigger `onAnimationEnd` at <List> level by forwarding `onAnimationEnd` bubbled from <ListItem>
     * 
     * <List>
     *     <wrapper>
     *         <ListItem onAnimationEnd={...} />
     *     </wrapper>
     * </List>
     */
    if ((event.target as Element)?.parentElement?.parentElement === event.currentTarget) {
        event.currentTarget.dispatchEvent(new AnimationEvent('animationend', { animationName: event.animationName, bubbles: true, composed: true }));
    } // if
};



// react components:
export interface ListItemProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        SemanticButtonProps<TElement>
{
    // accessibilities:
    // change default value to `true`
    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `active` from `List`.  
     * `false`     : independent `active`.
     */
    inheritActive ?: boolean
    
    
    
    // behaviors:
    actionCtrl    ?: boolean
    
    
    
    // children:
    children      ?: React.ReactNode
}
export const ListItem = <TElement extends Element = HTMLElement>(props: ListItemProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet           = useListItemStyleSheet();
    const actionStyleSheet     = useListActionItemStyleSheet();
    
    
    
    // rest props:
    const {
        // variants:
        outlined = _defaultItemOutlined,
        mild     = _defaultItemMild,
        
        
        
        // accessibilities:
        pressed,
        
        
        
        // behaviors:
        actionCtrl = _defaultItemActionCtrl,
    ...restActionControlProps} = props;
    
    
    
    // fn props:
    const propActive = usePropActive(props);
    const pressedFn  = pressed ?? (((propActive && actionCtrl) && !outlined && !mild) || undefined); // if (active (as pressed) === false) => uncontrolled pressed
    
    const {
        semanticTag  : buttonSemanticTag,
        semanticRole : buttonSemanticRole,
        
        tag  : buttonTag,
        role : buttonRole,
        isSemanticButton,
        
        type : buttonType,
    } = useSemanticButton(props);
    
    /*
        if not [actionCtrl] => use props's semantic(Tag|Role)
        if  is [actionCtrl] => use props's semantic(Tag|Role) ?? use <Button>'s semantic(Tag|Role)
    */
    const semanticTag     = !actionCtrl ? props.semanticTag  : (props.semanticTag  ?? buttonSemanticTag );
    const semanticRole    = !actionCtrl ? props.semanticRole : (props.semanticRole ?? buttonSemanticRole);
    
    /*
        if not [actionCtrl] => use props's (tag|role|type)
        if  is [actionCtrl] => use props's (tag|role|type) ?? (
            if not [defaulting to <button>] => use <button>'s (tag|role|type)
            if  is [defaulting to <button>] => use props's (tag|role|type) ?? replace <button> with <div role='button' type={props.type}>
        )
    */
    const isDefaultButton = isSemanticButton && (props.tag === undefined); // determines if the [tag] was defaulting to <button>
    const tag             = !actionCtrl ? props.tag          : (!isDefaultButton ? buttonTag  : (props.tag  ??                'div'     ));
    const role            = !actionCtrl ? props.role         : (!isDefaultButton ? buttonRole : (props.role ?? (buttonRole || 'button' )));
    const type            = !actionCtrl ? props.type         : (!isDefaultButton ? buttonType : (props.type ??                undefined ));
    
    
    
    // jsx:
    return (
        actionCtrl
        ?
        <ActionControl<TElement>
            // other props:
            {...restActionControlProps}
            
            
            
            // semantics:
            semanticTag  = {semanticTag }
            semanticRole = {semanticRole}
            tag          = {tag}
            role         = {role}
            
            
            
            // variants:
            outlined={outlined}
            mild={mild}
            
            
            
            // classes:
            mainClass={props.mainClass ?? [styleSheet.main, actionStyleSheet.main].join(' ')}
            
            
            
            // accessibilities:
            inheritActive={props.inheritActive ?? true} // change default value to `true`
            pressed={pressedFn}
            
            
            
            // Button props:
            {...{
                // actions:
                type,
            }}
        />
        :
        <Indicator<TElement>
            // other props:
            {...restActionControlProps}
            
            
            
            // semantics:
            semanticTag  = {semanticTag }
            semanticRole = {semanticRole}
            tag          = {tag}
            role         = {role}
            
            
            
            // variants:
            outlined={outlined}
            mild={mild}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // accessibilities:
            inheritActive={props.inheritActive ?? true} // change default value to `true`
        />
    );
};



export interface ListSeparatorItemProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        Pick<ListItemProps<TElement>, keyof IndicatorProps> // [actionCtrl] & related props are not supported
{
}
export const ListSeparatorItem = <TElement extends Element = HTMLElement>(props: ListSeparatorItemProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet           = useListItemStyleSheet();
    const separatorStyleSheet  = useListSeparatorItemStyleSheet();
    
    
    
    // classes:
    const classes = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // classes:
        _defaultListSeparatorItemClasses,
    );
    
    
    
    // jsx:
    return (
        <ListItem<TElement>
            // other props:
            {...props}
            
            
            
            // classes:
            mainClass={props.mainClass ?? [styleSheet.main, separatorStyleSheet.main].join(' ')}
            classes={classes}
        >
            <hr />
        </ListItem>
    );
};



interface WrapperItemProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        GenericProps<TElement>
{
}
const WrapperItem = <TElement extends Element = HTMLElement>(props: WrapperItemProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // children:
        children,
    ...restGenericProps} = props;
    
    
    
    // classes:
    const flexes = (() => {
        // conditions:
        if (!React.isValidElement<GenericProps<Element>>(children)) return null;
        
        
        
        // fn props:
        const classNames = (children.props.className ?? '').split(' ');
        const classes    = (children.props.classes ?? []);
        const isFluid    = classNames.includes('fluid') || classes.includes('fluid');
        const isSolid    = classNames.includes('solid') || classes.includes('solid');
        
        
        
        // result:
        return {
            isFluid,
            isSolid,
        };
    })();
    const classes = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // classes:
        (flexes?.isFluid || undefined) && 'fluid',
        (flexes?.isSolid || undefined) && 'solid',
    );
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...restGenericProps}
            
            
            
            // classes:
            classes={classes}
        >
            {children}
        </Generic>
    );
};



export interface ListProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        Omit<IndicatorProps<TElement>,
            // variants:
            |'nude' // <List> cannot be [nude]
        >,
        
        // <ul>|<ol>:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >,
        
        // variants:
        OrientationableProps,
        ListVariant,
        
        // behaviors:
        Pick<ListItemProps<TElement>, 'actionCtrl'>
{
    // children:
    children ?: React.ReactNode
}
const List = <TElement extends Element = HTMLElement>(props: ListProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet             = useListStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    const listVariant            = useListVariant(props);
    
    
    
    // rest props:
    const {
        // variants:
        orientation : _orientation, // remove
        listStyle   : _listStyle,   // remove
        
        outlined    = _defaultOutlined,
        mild        = _defaultMild,
        
        
        
        // behaviors:
        actionCtrl  : defaultActionCtrl = _defaultActionCtrl,
        
        
        
        // children:
        children,
    ...restIndicatorProps} = props;
    
    
    
    // fn props:
    const semanticTag  = props.semanticTag  ?? _defaultSemanticTag ;
    const semanticRole = props.semanticRole ?? _defaultSemanticRole;
    const {
        isSemanticTag : isSemanticList,
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
    const wrapperTag : Tag = (isSemanticList ? 'li' : 'div');
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationableVariant.class,
        listVariant.class,
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
            
            aria-orientation={props['aria-orientation'] ?? orientationableVariant['aria-orientation']}
            
            
            
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
                <WrapperItem<HTMLLIElement>
                    // identifiers:
                    key={index}
                    
                    
                    
                    // semantics:
                    tag={wrapperTag}
                >
                    {!React.isValidElement<ListItemProps<Element>>(child) ? child : React.cloneElement(child,
                        // props:
                        {
                            // variants:
                            outlined : (outlined || undefined) ?? child.props.outlined, // if `true` => force apply to <ListItem>(s), otherwise independent by <ListItem>(s)
                            mild     : (mild     || undefined) ?? child.props.mild,     // if `true` => force apply to <ListItem>(s), otherwise independent by <ListItem>(s)
                            
                            
                            
                            // behaviors:
                            ...(((): boolean => {
                                // conditions:
                                if (child.type === ListSeparatorItem)      return false;
                                if (child.props.classes?.includes('void')) return false;
                                
                                
                                
                                // result:
                                return (
                                    child.props.actionCtrl
                                    ??
                                    defaultActionCtrl // the default <ListItem>'s actionCtrl value, if not assigned
                                    ??
                                    false             // if <List>'s actionCtrl was not assigned => default to false
                                );
                            })() ? { actionCtrl: true } : null), // assign actionCtrl props if (actionCtrl === true), otherwise do not append actionCtrl prop
                        },
                    )}
                </WrapperItem>
            )}
        </Indicator>
    );
};
export {
    List,
    List as default,
}



export interface ListItemComponentProps<TElement extends Element = HTMLElement>
{
    // components:
    listItemComponent ?: React.ReactComponentElement<any, ListItemProps<TElement>>
}



export interface ListComponentProps<TElement extends Element = HTMLElement>
{
    // refs:
    listRef         ?: React.Ref<TElement> // setter ref
    
    
    
    // variants:
    listOrientation ?: ListProps<TElement>['orientation']
    listStyle       ?: ListProps<TElement>['listStyle']
    
    
    
    // components:
    listComponent   ?: React.ReactComponentElement<any, ListProps<TElement>>
    listItems       ?: ListProps<TElement>['children']
}
