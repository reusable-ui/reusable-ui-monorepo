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
    usesBorder,
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
    
    
    
    // hooks:
    usesContainer,
    usesBorderAsContainer,
    usesBorderAsSeparator,
}                           from '@reusable-ui/container'       // a neighbor component



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
        * `.list.content`             , the specificity weight = 2
        * `.someComponent.togglerBtn` , the specificity weight = 2
        but can be easily overriden by specificity weight >= 3, like:
        * `.list.btn.btn`             , the specificity weight = 3
        * `.someComponent.boo.foo`    , the specificity weight = 3
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
    
    
    
    return style({
        ...imports([
            // layouts:
            usesIndicatorLayout(),
        ]),
        ...style({
            // layouts:
            display           : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            ...rule(orientationInlineSelector, { // inline
                flexDirection : 'row',         // items are stacked horizontally
            }),
            ...rule(orientationBlockSelector , { // block
                flexDirection : 'column',      // items are stacked vertically
            }),
            justifyContent    : 'center',      // center items (text, icon, etc) horizontally
            alignItems        : 'center',      // center items (text, icon, etc) vertically
            flexWrap          : 'wrap',        // allows the items (text, icon, etc) to wrap to the next row if no sufficient width available
            
            
            
            // positions:
            verticalAlign     : 'baseline',    // list's text should be aligned with sibling text, so the list behave like <span> wrapper
            
            
            
            // typos:
            textAlign         : 'center',
            
            
            
            // customize:
            ...usesCssProps(lists), // apply config's cssProps
        }),
    });
};
export const usesListVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(lists);
    
    
    
    return style({
        ...imports([
            // variants:
            usesIndicatorVariants(),
            
            // layouts:
            sizesRule,
        ]),
        ...variants([
            rule('.ghost', {
                ...style({
                    // borders:
                    boxShadow : ['none', '!important'], // no focus animation
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(lists, 'ghost')), // apply config's cssProps starting with ghost***
                }),
                ...states([
                    ifArrive({
                        // appearances:
                        opacity: lists.ghostOpacityArrive, // increase the opacity to increase visibility
                    }),
                    ifLeave({
                        ...imports([
                            // backgrounds:
                            gradientOf(false), // hides the gradient to increase invisibility
                        ]),
                    }),
                ]),
            }),
        ]),
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
