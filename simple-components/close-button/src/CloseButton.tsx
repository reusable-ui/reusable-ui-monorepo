// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui:
import {
    // hooks:
    OrientationName,
    OrientationVariant,
    
    ButtonStyle,
    ButtonVariant,
    ButtonType,
    IconPosition,
    
    
    
    // react components:
    ButtonIconProps,
    ButtonIcon,
}                           from '@reusable-ui/button-icon'     // a base component



// react components:
export interface CloseButtonProps
    extends
        // bases:
        ButtonIconProps
{
}
const CloseButton = (props: CloseButtonProps): JSX.Element|null => {
    // jsx:
    return (
        <ButtonIcon
            // other props:
            {...props}
            
            
            
            // appearances:
            icon={props.icon ?? 'close'}
            
            
            
            // variants:
            btnStyle={props.btnStyle ?? 'link'}
            
            
            
            // accessibilities:
            label={props.label ?? 'Close'}
        />
    );
};
export {
    CloseButton,
    CloseButton as default,
}

export type { OrientationName, OrientationVariant }

export type { ButtonStyle, ButtonVariant, ButtonType, IconPosition }
