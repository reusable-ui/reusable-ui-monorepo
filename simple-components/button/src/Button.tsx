// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // checks if a certain css feature is supported by the running browser:
    supportsHasPseudoClass,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useMergeClasses,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableProps,
    useOrientationable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    ActionControl,
}                           from '@reusable-ui/action-control'  // a base component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from './defaults.js'
import {
    // semantics:
    SemanticButtonProps,
    useSemanticButton,
}                           from './semantics/SemanticButton.js'
import {
    // variants:
    ButtonVariant,
    useButtonVariant,
}                           from './variants/ButtonVariant.js'



// styles:
export const useButtonStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, {
    id      : '7rehb2h20q',             // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
    lazyCsr : supportsHasPseudoClass(), // dealing with browsers that don't support the :has() selector
});



// react components:
export interface ButtonProps
    extends
        // bases:
        SemanticButtonProps<HTMLButtonElement>,
        
        // variants:
        OrientationableProps,
        ButtonVariant
{
    // accessibilities:
    label    ?: string
    
    
    
    // children:
    children ?: React.ReactNode
}
const Button = (props: ButtonProps): JSX.Element|null => {
    // styles:
    const styleSheet             = useButtonStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    const buttonVariant          = useButtonVariant(props);
    
    
    
    // rest props:
    const {
        // variants:
        orientation : _orientation, // remove
        buttonStyle : buttonStyle,  // use
        
        
        
        // accessibilities:
        label,
    ...restActionControlProps} = props;
    
    
    
    // fn props:
    const {
        semanticTag,
        semanticRole,
        
        tag,
        role,
        
        type,
    } = useSemanticButton(props);
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationableVariant.class,
        buttonVariant.class,
    );
    
    
    
    // jsx:
    return (
        <ActionControl<HTMLButtonElement>
            // other props:
            {...restActionControlProps}
            
            
            
            // semantics:
            semanticTag  = {semanticTag }
            semanticRole = {semanticRole}
            tag          = {tag}
            role         = {role}
            
            aria-orientation={props['aria-orientation'] ?? orientationableVariant['aria-orientation']}
            aria-label      ={props['aria-label'] ?? label}
            
            
            
            // variants:
            mild={props.mild ?? (
                ((buttonStyle === 'link') || (buttonStyle === 'ghost'))
                ?
                'inherit' // <Parent> dependent of <Link> | <Ghost>
                :
                false     // bold <Button>
            )}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            
            
            
            // Button props:
            {...{
                // actions:
                type,
            }}
        />
    );
};
export {
    Button,
    Button as default,
}



export interface ButtonComponentProps
{
    // refs:
    buttonRef         ?: React.Ref<HTMLButtonElement> // setter ref
    
    
    
    // variants:
    buttonOrientation ?: ButtonProps['orientation']
    buttonStyle       ?: ButtonProps['buttonStyle']
    
    
    
    // components:
    buttonComponent   ?: React.ReactComponentElement<any, ButtonProps>
    buttonChildren    ?: ButtonProps['children']
}
