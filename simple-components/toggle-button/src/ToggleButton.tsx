// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
}                           from 'react'

// reusable-ui:
import {
    // hooks:
    useIsomorphicLayoutEffect,
}                           from '@reusable-ui/hooks'           // react helper hooks
export type {
    // hooks:
    OrientationName,
    OrientationVariant,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    isClientSideLink,
}                           from '@reusable-ui/action-control'  // a base component
import {
    // react components:
    ButtonProps,
    Button,
}                           from '@reusable-ui/button'          // a base component
export {
    // hooks:
    ButtonStyle,
    ButtonVariant,
    ButtonType,
}                           from '@reusable-ui/button'          // a base component



// react components:
export interface ToggleButtonProps
    extends
        // bases:
        ButtonProps
{
}
const ToggleButton = (props: ToggleButtonProps): JSX.Element|null => {
    // rest props:
    const {
        // remove props:
        
        
        
        // accessibilities:
        active,
    ...restButtonProps} = props;
    
    
    
    // fn props:
    const activeDn = useCurrentActive(props);
    const activeFn = active /*controllable*/ ?? activeDn /*uncontrollable*/;
    
    
    
    // jsx:
    return (
        <Button
            // other props:
            {...restButtonProps}
            
            
            
            // semantics:
            aria-current={(activeFn || undefined) && (props['aria-current'] ?? 'page')}
            
            
            
            // accessibilities:
            active={activeFn}
        />
    );
};
export {
    ToggleButton,
    ToggleButton as default,
}
