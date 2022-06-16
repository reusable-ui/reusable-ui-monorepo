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
    // styles:
    usesButtonLayout,
    usesButtonVariants,
    usesButtonStates,
    
    
    
    // react components:
    ButtonProps,
    Button,
}                           from '@reusable-ui/button'          // a base component



// styles:
export const usesNavButtonLayout = (options?: OrientationRuleOptions) => {
    return style({
        ...imports([
            // layouts:
            usesButtonLayout(),
        ]),
    });
};
export const usesNavButtonVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(navButtons);
    
    
    
    return style({
        ...imports([
            // variants:
            usesButtonVariants(),
            
            // layouts:
            sizesRule,
        ]),
    });
};
export const usesNavButtonStates = () => {
    return style({
        ...imports([
            // states:
            usesButtonStates(),
        ]),
    });
};

export const useNavButtonStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesNavButtonLayout(),
        
        // variants:
        usesNavButtonVariants(),
        
        // states:
        usesNavButtonStates(),
    ]),
}), { id: '7rehb2h20q' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [navButtons, navButtonValues, cssNavButtonConfig] = cssConfig(() => {
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
}, { prefix: 'btn' });



// react components:
export interface NavButtonProps
    extends
        // bases:
        ButtonProps
{
    // accessibilities:
    label    ?: string
    
    
    
    // children:
    children ?: React.ReactNode
}
const NavButton = (props: NavButtonProps): JSX.Element|null => {
    // styles:
    const styleSheet         = useNavButtonStyleSheet();
    
    
    
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
    ...restButtonProps} = props;
    
    
    
    // jsx:
    return (
        <Button
            // other props:
            {...restButtonProps}
            
            
            
            // accessibilities:
            enabled={props.enabled ?? !(props.disabled ?? false)}
            pressed={pressedFn}
            
            
            
            // variants:
            outlined={outlined}
            mild={mild}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        />
    );
};
export {
    NavButton,
    NavButton as default,
}
