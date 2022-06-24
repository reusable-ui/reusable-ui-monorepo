// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'                     // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    states,
    
    
    
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                         // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'                   // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/css-config'                    // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    borderRadiuses,
}                           from '@reusable-ui/borders'                 // a border (stroke) management system
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'                 // a spacer (gap) management system
import {
    // hooks:
    useMergeClasses,
}                           from '@reusable-ui/hooks'                   // react helper hooks
import {
    // types:
    DefaultTag,
    DefaultRole,
    
    
    
    // hooks:
    useTestSemantic,
}                           from '@reusable-ui/generic'                 // a base component
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
}                           from '@reusable-ui/basic'                   // a base component
import {
    // hooks:
    ifActive,
}                           from '@reusable-ui/indicator'               // a base component
import {
    // hooks:
    usesThemeActive,
    ifFocus,
    ifArrive,
    ifLeave,
}                           from '@reusable-ui/control'                 // a base component
import {
    // hooks:
    ifPress,
    isClientSideLink,
    
    
    
    // styles:
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
}                           from '@reusable-ui/action-control'          // a base component
import {
    // react components:
    EditableActionControlProps,
    EditableActionControl,
}                           from '@reusable-ui/editable-action-control' // a base component



// hooks:

// layouts:

//#region orientation
export const defaultOrientationRuleOptions = defaultInlineOrientationRuleOptions;
//#endregion orientation


// appearances:

//#region check style
export type CheckStyle = 'link'|'ghost' // might be added more styles in the future
export interface CheckVariant {
    checkStyle ?: CheckStyle
}
export const useCheckVariant = (props: CheckVariant) => {
    return {
        class: props.checkStyle ?? null,
    };
};
//#endregion check style



// styles:
export const usesCheckLayout = (options?: OrientationRuleOptions) => {
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
            verticalAlign     : 'baseline',    // check's text should be aligned with sibling text, so the check behave like <span> wrapper
            
            
            
            // typos:
            textAlign         : 'center',
            
            
            
            // customize:
            ...usesCssProps(checks), // apply config's cssProps
        }),
    });
};
export const usesCheckVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(checks);
    
    
    
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
                    ...usesCssProps(usesPrefixedProps(checks, 'ghost')), // apply config's cssProps starting with ghost***
                }),
                ...states([
                    ifArrive({
                        // appearances:
                        opacity: checks.ghostOpacityArrive, // increase the opacity to increase visibility
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
export const usesCheckStates = () => {
    return style({
        ...imports([
            // states:
            usesActionControlStates(),
        ]),
    });
};

export const useCheckStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesCheckLayout(),
        
        // variants:
        usesCheckVariants(),
        
        // states:
        usesCheckStates(),
    ]),
}), { id: 'nx58strmq2' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [checks, checkValues, cssCheckConfig] = cssConfig(() => {
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
}, { prefix: 'chk' });



// react components:
export interface CheckProps
    extends
        // bases:
        EditableActionControlProps<HTMLInputElement>,
        
        // check:
        Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'|'role'>,
        
        // layouts:
        OrientationVariant,
        
        // appearances:
        CheckVariant
{
    // accessibilities:
    label    ?: string
    
    
    
    // children:
    children ?: React.ReactNode
}
const Check = (props: CheckProps): JSX.Element|null => {
    // styles:
    const styleSheet         = useCheckStyleSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const checkVariant       = useCheckVariant(props);
    
    
    
    // rest props:
    const {
        // remove props:
        
        // layouts:
        orientation : _orientation,
        
        
        
        // appearances:
        checkStyle  : _checkStyle,
        
        
        
        // variants:
        outlined = _defaultOutlined,
        mild     = _defaultMild,
        
        
        
        // accessibilities:
        label,
        pressed,
    ...restActionControlProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationVariant.class,
        checkVariant.class,
    );
    
    
    
    // jsx:
    return (
        <EditableActionControl<HTMLInputElement>
            // other props:
            {...restActionControlProps}
            
            
            
            // semantics:
            aria-label  = {props['aria-label'] ?? label}
            
            
            
            // variants:
            outlined={outlined}
            mild={mild}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            
            
            
            // accessibilities:
            enabled={props.enabled ?? !(props.disabled ?? false)}
            
            
            
            // Check props:
            {...{
                // actions:
                // type,
            }}
        />
    );
};
export {
    Check,
    Check as default,
}

export type { OrientationName, OrientationVariant }
