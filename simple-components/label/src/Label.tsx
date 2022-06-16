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
    // types:
    DefaultTag,
    DefaultRole,
    
    
    
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



// hooks:

// appearances:

//#region label style
export type LabelStyle = 'link'|'icon'|'ghost' // might be added more styles in the future
export interface LabelVariant {
    btnStyle ?: LabelStyle
}
export const useLabelVariant = (props: LabelVariant) => {
    return {
        class: props.btnStyle ?? null,
    };
};
//#endregion label style



// styles:
export const usesLabelLayout = (options?: OrientationRuleOptions) => {
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
            verticalAlign     : 'baseline',    // label's text should be aligned with sibling text, so the label behave like <span> wrapper
            
            
            
            // typos:
            textAlign         : 'center',
            
            
            
            // customize:
            ...usesCssProps(labels), // apply config's cssProps
        }),
    });
};
export const usesLabelVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(labels);
    
    
    
    return style({
        ...imports([
            // variants:
            usesActionControlVariants(),
            
            // layouts:
            sizesRule,
        ]),
        ...variants([
            rule(['.link', '.icon', '.ghost'], {
                ...imports([
                    noBackground(),
                ]),
            }),
        ]),
    });
};
export const usesLabelStates = () => {
    return style({
        ...imports([
            // states:
            usesActionControlStates(),
        ]),
    });
};

export const useLabelStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesLabelLayout(),
        
        // variants:
        usesLabelVariants(),
        
        // states:
        usesLabelStates(),
    ]),
}), { id: 'si01upz9vr' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [labels, labelValues, cssLabelConfig] = cssConfig(() => {
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
}, { prefix: 'lb' });



// react components:
export interface LabelProps
    extends
        // bases:
        SemanticLabelProps<HTMLLabelElement>,
        
        // appearances:
        LabelVariant
{
    // accessibilities:
    label    ?: string
    
    
    
    // children:
    children ?: React.ReactNode
}
const Label = (props: LabelProps): JSX.Element|null => {
    // styles:
    const styleSheet         = useLabelStyleSheet();
    
    
    
    // variants:
    const labelVariant      = useLabelVariant(props);
    
    
    
    // rest props:
    const {
        // remove props:
        
        // layouts:
        orientation : _orientation,
        
        
        
        // appearances:
        btnStyle    : _btnStyle,
        
        
        
        // accessibilities:
        label,
        pressed,
        
        
        
        // variants:
        outlined = _defaultOutlined,
        mild     = _defaultMild,
    ...restActionControlProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        labelVariant.class,
    );
    
    
    
    // jsx:
    return (
        <ActionControl<HTMLLabelElement>
            // other props:
            {...restActionControlProps}
            
            
            
            // semantics:
            defaultTag  = {defaultTag }
            defaultRole = {defaultRole}
            tag         = {tag}
            role        = {role}
            aria-label  = {props['aria-label'] ?? label}
            
            
            
            // accessibilities:
            enabled={props.enabled ?? !(props.disabled ?? false)}
            pressed={pressedFn}
            
            
            
            // variants:
            outlined={outlined}
            mild={mild}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            
            
            
            // Label props:
            {...{
                // actions:
                type,
            }}
        />
    );
};
export {
    Label,
    Label as default,
}
