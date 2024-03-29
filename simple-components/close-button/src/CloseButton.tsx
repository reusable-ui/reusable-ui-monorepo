// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui components:
import {
    // semantics:
    ButtonType,
    
    
    
    // positions:
    IconPosition,
    
    
    
    // variants:
    ButtonStyle,
    ButtonVariant,
    
    
    
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
            mild={props.mild ?? 'inherit'}
            nude={props.nude ?? true}
            
            
            
            // accessibilities:
            label={props.label ?? 'Close'}
        />
    );
};
export {
    CloseButton,
    CloseButton as default,
}

export type { ButtonType, IconPosition, ButtonStyle, ButtonVariant }
