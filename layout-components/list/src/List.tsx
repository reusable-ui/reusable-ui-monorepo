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
    states,
    
    
    
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
    defaultInlineOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    OrientationVariant,
    useOrientationVariant,
    gradientOf,
    ifNotOutlined,
    outlinedOf,
    usesBorder,
    usesPadding,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ifActive,
}                           from '@reusable-ui/indicator'       // a base component
import {
    // hooks:
    usesThemeActive,
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



// defaults:
const _defaultSemanticTag  : SemanticTag  = ['list', 'a'   ] // uses <list>        as the default semantic, fallbacks to <a>
const _defaultSemanticRole : SemanticRole = ['list', 'link'] // uses [role="list"] as the default semantic, fallbacks to [role="link"]
const _defaultOutlined     : boolean      = false
const _defaultMild         : boolean      = false



// hooks:

// layouts:

//#region orientation
export const defaultOrientationRuleOptions = defaultInlineOrientationRuleOptions;
//#endregion orientation


// appearances:

//#region list style
export type ListStyle = 'link'|'ghost' // might be added more styles in the future
export interface ListVariant {
    listStyle ?: ListStyle
}
export const useListVariant = (props: ListVariant) => {
    return {
        class: props.listStyle ?? null,
    };
};
//#endregion list style



// styles:
export const usesListLayout = (options?: OrientationRuleOptions) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationRule(options);
    
    
    
    return style({
        ...imports([
            // layouts:
            usesActionControlLayout(),
        ]),
        ...style({
            // layouts:
            display           : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            ...rule(orientationInlineSelector, { // inline
                flexDirection : 'row',         // items are stacked horizontally
            }),
            ...rule(orientationBlockSelector,  { // block
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
            usesActionControlVariants(),
            
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
            usesActionControlStates(),
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
export interface ListProps
    extends
        // bases:
        ActionControlProps<TElement>,
        
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
const List = (props: ListProps): JSX.Element|null => {
    // styles:
    const styleSheet         = useListStyleSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const listVariant        = useListVariant(props);
    
    
    
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
    ...restActionControlProps} = props;
    
    
    
    // fn props:
    const propActive = usePropActive(props);
    const pressedFn  = pressed ?? ((propActive && !outlined && !mild) || undefined); // if (active (as pressed) === false) => uncontrolled pressed
    
    
    
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
        <ActionControl<HTMLListElement>
            // other props:
            {...restActionControlProps}
            
            
            
            // semantics:
            semanticTag  = {semanticTag }
            semanticRole = {semanticRole}
            tag          = {tag}
            role         = {role}
            aria-label   = {props['aria-label'] ?? label}
            
            
            
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
