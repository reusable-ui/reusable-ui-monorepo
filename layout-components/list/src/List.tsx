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
    stripoutList,
}                           from '@reusable-ui/stripouts'       // removes browser's default stylesheet
import {
    // hooks:
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
}                           from '@reusable-ui/generic'         // a base component
import {
    // hooks:
    usesSizeVariant,
    OrientationName,
    OrientationRuleOptions,
    defaultBlockOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    OrientationVariant,
    useOrientationVariant,
    ThemeName,
    gradientOf,
    ifNotOutlined,
    outlinedOf,
    mildOf,
    usesBackg,
    usesBorder,
    extendsBorder,
    usesPadding,
    usesAnim,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ifActived,
    ifActivating,
    ifPassivating,
    ifPassived,
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
    markActive       as controlMarkActive,
    usesThemeDefault as controlUsesThemeDefault,
    usesThemeActive  as controlUsesThemeActive,
    ifFocus,
    ifArrive,
    ifLeave,
}                           from '@reusable-ui/control'         // a base component
import {
    // hooks:
    ifPress,
    isClientSideLink,
    
    
    
    // styles:
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
    
    
    
    // react components:
    ActionControlProps,
    ActionControl,
}                           from '@reusable-ui/action-control'  // a base component
import {
    // rules:
    ifFirstVisibleChild,
    ifLastVisibleChild,
    ifNotFirstVisibleChild,
    ifNotLastVisibleChild,
    
    
    
    // hooks:
    usesContainer,
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
    // styles:
    usesButtonLayout,
}                           from '@reusable-ui/button'          // a button ui



// defaults:
const _defaultSemanticTag  : SemanticTag  = ['ul', 'ol'] // uses <ul>          as the default semantic, fallbacks to <ol>
const _defaultSemanticRole : SemanticRole = ['list'    ] // uses [role="list"] as the default semantic
const _defaultOutlined     : boolean      = false
const _defaultMild         : boolean      = true
const _defaultActionCtrl   : boolean      = false;



// hooks:

// layouts:

//#region orientation
export const defaultOrientationRuleOptions = defaultBlockOrientationRuleOptions;
//#endregion orientation


// appearances:

//#region list style
export type ListBasicStyle = 'flat'|'flush'|'joined';
export type ListStyle = ListBasicStyle|'content'|'btn'|'tab'|'breadcrumb'|'bullet'|'numbered' // might be added more styles in the future
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
//#endregion list style


// states:

//#region activePassive
export const markActive = (): CssRule => style({
    ...imports([
        outlinedOf(null),      // keeps outlined variant
        mildOf(null),          // keeps mild     variant
        
        usesThemeActive(),     // switch to active theme
    ]),
});
export const dontMarkActive = (): CssRule => style({
    ...imports([
        outlinedOf(null),      // keeps outlined variant
        mildOf(null),          // keeps mild     variant
        
        usesThemeActive(null), // keeps current theme
    ]),
});

/**
 * Creates a default theme color definitions.
 * @param themeName The theme name as the default theme color -or- `null` for *auto* theme.
 * @returns A `CssRule` represents a default theme color definitions`.
 */
// change default parameter from 'secondary' to `null`:
export const usesThemeDefault = (themeName: ThemeName|null = null       ): CssRule => controlUsesThemeDefault(themeName);

/**
 * Creates conditional color definitions at active state.
 * @param themeName The theme name as the active theme color -or- `null` for *auto* theme.
 * @returns A `CssRule` represents the conditional color definitions at active state.
 */
// change default parameter from 'primary' to 'secondary':
export const usesThemeActive  = (themeName: ThemeName|null = 'secondary'): CssRule => controlUsesThemeActive(themeName);
//#endregion activePassive



// styles:
export const wrapperElm  = '*';                    // zero specificity
export const listItemElm = ':where(:first-child)'; // zero specificity



export const stripoutCommonBasicLayout = () => {
    // dependencies:
    
    // borders:
    const [, borders] = usesBorder();
    
    
    
    return style({
        // borders:
        // undef border stroke:
        [borders.border                ] : null,
        [borders.borderWidth           ] : null,
        
        // undef border radius:
        [borders.borderStartStartRadius] : null,
        [borders.borderStartEndRadius  ] : null,
        [borders.borderEndStartRadius  ] : null,
        [borders.borderEndEndRadius    ] : null,
    });
};
export const usesListItemInheritMildVariant = () => {
    return style({
        ...variants([
            rule('.mild>*>&', { // .mild>*>.listItem => the specificity weight including parent = 2
                ...imports([
                    mildOf(true),
                ]),
            }),
        ]),
    });
};



export const usesListItemBaseLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationRule(options);
    /*
        a hack with :not(_)
        the total selector combined with parent is something like this: `:not(.inline)>*>.listItem:not(_)`, the specificity weight = 2.1
        the specificity of 2.1 is a bit higher than:
        * `.list.content`            , the specificity weight = 2
        * `.someComponent.toggleBtn` , the specificity weight = 2
        but can be easily overriden by specificity weight >= 3, like:
        * `.list.btn.btn`            , the specificity weight = 3
        * `.someComponent.boo.foo`   , the specificity weight = 3
    */
    const parentOrientationInlineSelector = `${orientationInlineSelector}>*>&:not(_)`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }>*>&:not(_)`;
    
    
    
    return style({
        // spacings:
        margin: 0, // a fix for marginBlockEnd of <h1>...<h6>
        
        
        
        // borders:
        ...imports([
            /*
                Accordion supports: a separator between Accordion's header & body.
                Exploits the borders as a horizontal/vertical separator depending on the List's orientation.
            */
            usesBorderAsSeparator({ // must be placed at the last
                orientationInlineSelector : parentOrientationInlineSelector,
                orientationBlockSelector  : parentOrientationBlockSelector,
            }),
        ]),
    });
};
export const usesListItemLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    
    
    
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
        }),
    });
};
export const usesListItemVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(lists);
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            usesListItemInheritMildVariant(),
            
            // layouts:
            sizesRule,
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

export const useListItemSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesListItemLayout(),
        
        // variants:
        usesListItemVariants(),
        
        // states:
        usesListItemStates(),
    ]),
}), { id: '2vajf0sgc2' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesListSeparatorItemLayout = () => {
    // options:
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationRule(defaultOrientationRuleOptions);
    const parentOrientationInlineSelector = `${orientationInlineSelector}>*>&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }>*>&`;
    
    
    
    // dependencies:
    
    // borders:
    const [, borders ] = usesBorder();
    
    // spacings:
    const [, paddings] = usesPadding();
    
    
    
    return style({
        // layouts:
        display           : 'flex',   // use block flexbox, so it takes the entire wrapper's width
        ...rule(parentOrientationInlineSelector, { // inline
            flexDirection : 'column', // items are stacked vertically
        }),
        ...rule(parentOrientationBlockSelector , { // block
            flexDirection : 'row',    // items are stacked horizontally
        }),
        justifyContent    : 'center', // center items (text, icon, etc) horizontally
        alignItems        : 'center', // center items (text, icon, etc) vertically
        flexWrap          : 'nowrap', // no wrapping
        
        
        
        // spacings:
        [paddings.paddingInline] : '0px', // discard padding
        [paddings.paddingBlock ] : '0px', // discard padding
        
        
        
        // children:
        ...children('hr', {
            // appearances:
            opacity       : 'unset',
            
            
            
            // sizes:
            flex          : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
            // foregrounds:
            foreg         : borders.borderColor,
            
            
            
            // spacings:
            margin        : 0,
        }),
        ...rule(parentOrientationInlineSelector, { // inline
            // children:
            ...children('hr', {
                // appearances:
                // rotate the <hr> 90 deg:
                writingMode: 'vertical-lr',
            }),
        }),
    });
};

export const useListSeparatorItemSheet = createUseStyleSheet(() => ({
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
            
            // colors:
            usesThemeDefault(),
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
                    markActive(),
                ]),
            }),
            ifFocus({
                ...imports([
                    dontMarkActive(),
                ]),
            }),
            ifArrive({
                ...imports([
                    dontMarkActive(),
                ]),
            }),
            ifPress({
                ...imports([
                    dontMarkActive(),
                ]),
            }),
        ]),
    });
};

export const useListActionItemSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesListActionItemLayout(),
        
        // variants:
        usesListActionItemVariants(),
        
        // states:
        usesListActionItemStates(),
    ]),
}), { id: '1jdx2owh1e' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export const usesListLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationRule(options);
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }&`;
    
    
    
    // dependencies:
    
    // borders:
    const [borderRule, borders] = usesBorder();
    
    
    
    return style({
        ...imports([
            // resets:
            stripoutFocusableElement(),     // clear browser's default styles
            stripoutList(),                 // clear browser's default styles
            
            // borders:
            // borderRule,                  // moved out to dedicated border stroke for each list & wrapper
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
                    borderRule, // dedicated border stroke for each <List> & <wrapper>s
                ]),
            }),
            /*
                A separator between ListItems.
                Exploits the borders as a horizontal/vertical separator depending on the List's orientation.
            */
            ...children(wrapperElm, {
                ...imports([
                    // borders:
                    usesBorderAsSeparator({ // must be placed at the last
                        orientationInlineSelector : parentOrientationInlineSelector,
                        orientationBlockSelector  : parentOrientationBlockSelector,
                    }),
                ]),
            }),
            
            
            
            // children:
            ...children(wrapperElm, {
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
                    * `.list.content`            , the specificity weight = 2
                    * `.someComponent.toggleBtn` , the specificity weight = 2
                    but can be easily overriden by specificity weight >= 3, like:
                    * `.list.btn.btn`            , the specificity weight = 3
                    * `.someComponent.boo.foo`   , the specificity weight = 3
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
            ...usesCssProps(lists), // apply config's cssProps
            
            
            
            // borders:
            ...children(['&', wrapperElm], {
                // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius:
                ...extendsBorder(),
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
    
    // borders:
    const [, borders] = usesBorder();
    
    
    
    return style({
        ...variants([
            rule(['.flat', '.flush', additionRemoveBorderSelector], {
                // borders:
                
                // kill borders surrounding List:
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
export const usesListVariants = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationRule(options);
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }&`;
    
    
    
    // dependencies:
    
    // layouts:
    const [sizesRule          ] = usesSizeVariant(lists);
    
    // backgrounds:
    const [          , backgs ] = usesBackg();
    
    // borders:
    const [borderRule, borders] = usesBorder();
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            
            // layouts:
            sizesRule,
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
                    }),
                }),
            }),
        ]),
        ...imports([
            usesListBasicVariants({
                additionRemoveBorderSelector    : ['.btn', '.tab', '.breadcrumb', '.bullet'],
                additionRemoveSeparatorSelector : ['.btn', '.tab', '.breadcrumb', '.bullet'],
                // specificityWeight            : 1, // not needed
            }),
        ]),
        ...variants([ 
            rule('.btn', {
                // spacings:
                // add space between buttons:
                gap : lists.btnSpacing,
                
                
                
                // children:
                ...children(wrapperElm, {
                    // children:
                    ...children(listItemElm, {
                        ...imports([
                            // layouts:
                            usesButtonLayout(),
                        ]),
                        ...style({
                            // accessibilities:
                            // undef cursor:
                            cursor : null,
                            
                            
                            
                            // customize:
                            ...usesCssProps(usesPrefixedProps(lists, 'btn')), // apply config's cssProps starting with btn***
                        }),
                    }),
                }),
            }),
            rule('.tab', {
                // layouts:
                ...rule(orientationInlineSelector, { // inline
                    // tab directions are inline (right) but <List> direction are block (down):
                    display                : 'flex',        // use block flexbox, so it takes the entire parent's width
                    
                    
                    
                    // borders:
                    // kill border [left, top, right] surrounding tab:
                    borderInlineWidth      : 0,
                    borderBlockStartWidth  : 0,
                }),
                ...rule(orientationBlockSelector , { // block
                    // tab directions are block (down) but <List> direction are inline (right):
                    display                : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                    
                    
                    
                    // borders:
                    // kill border [top, left, bottom] surrounding tab:
                    borderBlockWidth       : 0,
                    borderInlineStartWidth : 0,
                }),
                
                
                
                // children:
                ...children(wrapperElm, {
                    // spacings:
                    ...rule(parentOrientationInlineSelector, { // inline
                        // shift the items to bottom a bit, so the `active item` can hide the `borderBottom`:
                        marginBlockEnd : `calc(0px - ${borders.borderWidth})`,
                    }),
                    ...rule(parentOrientationBlockSelector , { // block
                        // shift the items to right a bit, so the `active item` can hide the `borderRight`:
                        marginInlineEnd : `calc(0px - ${borders.borderWidth})`,
                    }),
                    
                    
                    
                    // children:
                    ...children(listItemElm, {
                        ...imports([
                            // borders:
                            borderRule,
                        ]),
                        ...style({
                            // borders:
                            
                            // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius:
                            ...extendsBorder(),
                            
                            [borders.borderColor] : 'inherit', // change borderColor independent to child's theme color
                            backgroundClip        : 'padding-box',
                            
                            
                            
                            // customize:
                            ...usesCssProps(usesPrefixedProps(lists, 'tab')), // apply config's cssProps starting with tab***
                            borderRadius: null, // tab borderRadius has been handled
                        }),
                        ...states([
                            ifPassive({
                                ...rule(parentOrientationInlineSelector, { // inline
                                    // borders:
                                    // show parent border bottom:
                                    borderInlineWidth      : 0,
                                    borderBlockStartColor  : 'transparent',
                                }),
                                ...rule(parentOrientationBlockSelector , { // block
                                    // borders:
                                    // show parent border right:
                                    borderBlockWidth       : 0,
                                    borderInlineStartColor : 'transparent',
                                }),
                            }),
                            ifActive({
                                ...rule(parentOrientationInlineSelector, { // inline
                                    // borders:
                                    // hide parent border bottom:
                                    borderBlockEndWidth    : 0,
                                    // add rounded corners on top:
                                    [borders.borderStartStartRadius] : lists.tabBorderRadius,
                                    [borders.borderStartEndRadius  ] : lists.tabBorderRadius,
                                }),
                                ...rule(parentOrientationBlockSelector , { // block
                                    // borders:
                                    // hide parent border right:
                                    borderInlineEndWidth   : 0,
                                    // add rounded corners on left:
                                    [borders.borderStartStartRadius] : lists.tabBorderRadius,
                                    [borders.borderEndStartRadius  ] : lists.tabBorderRadius,
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
                                    /*img   : */lists.breadcrumbSeparatorImg,
                                    /*color : */backgs.altBackgColor,
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
                                ...rule(parentOrientationBlockSelector , { // block
                                    // overwrites propName = {breadcrumbSeparator}PropName{Block}:
                                    ...overwriteProps(lists, usesSuffixedProps(usesPrefixedProps(lists, 'breadcrumbSeparator', false), 'block')),
                                }),
                            }),
                        }),
                    }),
                    ...children(listItemElm, {
                        // typos:
                        lineHeight : 1,
                        
                        
                        
                        // customize:
                        ...usesCssProps(usesPrefixedProps(lists, 'breadcrumb')), // apply config's cssProps starting with breadcrumb***
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
                            // borders:
                            borderRule,
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
                            
                            // let's Reusable-UI system to manage borderColor, borderStroke & borderRadius:
                            ...extendsBorder(),
                            
                            // big rounded corners on top:
                            [borders.borderStartStartRadius] : borderRadiuses.pill,
                            [borders.borderStartEndRadius  ] : borderRadiuses.pill,
                            // big rounded corners on bottom:
                            [borders.borderEndStartRadius  ] : borderRadiuses.pill,
                            [borders.borderEndEndRadius    ] : borderRadiuses.pill,
                            
                            overflow       : 'hidden', // clip the children at the rounded corners
                            
                            
                            
                            // customize:
                            ...usesCssProps(usesPrefixedProps(lists, 'bullet')), // apply config's cssProps starting with bullet***
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
            the total selector combined with parent is something like this: `.list.btn.btn`, the specificity weight = 3
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

export const useListStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesListLayout(),
        
        // variants:
        usesListVariants(),
        
        // states:
        usesListStates(),
    ]),
}), { id: 'dj4jw72kyr' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [lists, listValues, cssListConfig] = cssConfig(() => {
    return {
        // spacings:
        gapInline          : spacers.sm as CssKnownProps['gapInline'],
        gapBlock           : spacers.sm as CssKnownProps['gapBlock' ],
        gapInlineSm        : spacers.xs as CssKnownProps['gapInline'],
        gapBlockSm         : spacers.xs as CssKnownProps['gapBlock' ],
        gapInlineLg        : spacers.md as CssKnownProps['gapInline'],
        gapBlockLg         : spacers.md as CssKnownProps['gapBlock' ],
        
        
        
        // typos:
        whiteSpace         : 'normal'   as CssKnownProps['whiteSpace'],
        
        
        
        // ghost style:
        ghostOpacity       : 0.5        as CssKnownProps['opacity'],
        ghostOpacityArrive : 1          as CssKnownProps['opacity'],
    };
}, { prefix: 'list' });



// react components:
export interface ListProps<TElement extends Element = Element>
    extends
        // bases:
        IndicatorProps<TElement>,
        
        // list:
        Omit<React.ListHTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >,
        
        // layouts:
        OrientationVariant,
        
        // appearances:
        ListVariant
{
    // accessibilities:
    label    ?: string
    
    
    
    // children:
    children ?: React.ReactNode
}
const List = <TElement extends Element = Element>(props: ListProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet            = useListStyleSheet();
    
    
    
    // variants:
    const orientationVariant    = useOrientationVariant(props);
    const isOrientationVertical = ((orientationVariant.class || defaultOrientationRuleOptions.defaultOrientation) === defaultOrientationRuleOptions.defaultOrientation);
    
    const listVariant           = useListVariant(props);
    
    
    
    // rest props:
    const {
        // remove props:
        
        // layouts:
        orientation : _orientation,
        
        
        
        // appearances:
        listStyle    : _listStyle,
        
        
        
        // variants:
        outlined = _defaultOutlined,
        mild     = _defaultMild,
        
        
        
        // accessibilities:
        label,
        pressed,
    ...restIndicatorProps} = props;
    
    
    
    // fn props:
    const semanticTag  = props.semanticTag  ?? _defaultSemanticTag ;
    const semanticRole = props.semanticRole ?? _defaultSemanticRole;
    const {
        isDesiredType : isListType,
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
    
    const wrapperSemanticTag  : SemanticTag  = (isSemanticList ? 'li'       : '');
    const wrapperSemanticRole : SemanticRole = (isListType     ? 'listitem' : '');
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationVariant.class,
        listVariant.class,
    );
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restIndicatorProps}
            
            
            
            // semantics:
            semanticTag  = {semanticTag }
            semanticRole = {semanticRole}
            
            aria-orientation={props['aria-orientation'] ?? (isOrientationVertical ? 'vertical' : 'horizontal')}
            
            
            
            // variants:
            outlined={outlined}
            mild={mild}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            
            
            
            // accessibilities:
            enabled={props.enabled ?? !(props.disabled ?? false)} // aliasing [disabled] => ![enabled]
            pressed={pressedFn}
            
            
            
            // List props:
            {...{
                // actions:
                type,
            }}
        />
    );
};
export {
    List,
    List as default,
}

export type { OrientationName, OrientationVariant }
