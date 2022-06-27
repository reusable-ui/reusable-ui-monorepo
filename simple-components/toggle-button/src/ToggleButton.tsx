// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui:
import {
    // hooks:
    useEvent,
    useMergeEvents,
}                           from '@reusable-ui/hooks'           // react helper hooks
export type {
    // hooks:
    OrientationName,
    OrientationVariant,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    TogglerActiveProps,
    useTogglerActive,
}                           from '@reusable-ui/indicator'       // a base component
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
        ButtonProps,
        
        // behaviors:
        TogglerActiveProps
{
}
const ToggleButton = (props: ToggleButtonProps): JSX.Element|null => {
    // rest props:
    const {
        // accessibilities:
        defaultActive,  // take, to be handled by `useTogglerActive`
        active,         // take, to be handled by `useTogglerActive`
        inheritActive,  // take, to be handled by `useTogglerActive`
        onActiveChange, // take, to be handled by `useTogglerActive`
    ...restButtonProps} = props;
    
    
    
    // states:
    const [isActive, , toggleActive] = useTogglerActive({
        enabled         : props.enabled,
        inheritEnabled  : props.inheritEnabled,
        
        readOnly        : props.readOnly,
        inheritReadOnly : props.inheritReadOnly,
        
        defaultActive,
        active,
        inheritActive,
        onActiveChange,
    });
    
    
    
    // handlers:
    const handleClickInternal   = useEvent<React.MouseEventHandler<HTMLButtonElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        toggleActive();         // handle click as toggle [active]
        event.preventDefault(); // handled
    }, []);
    const handleClick           = useMergeEvents(
        // preserves the original `onClick`:
        props.onClick,
        
        
        
        // actions:
        handleClickInternal,
    );
    
    
    
    // jsx:
    return (
        <Button
            // other props:
            {...restButtonProps}
            
            
            
            // accessibilities:
            active={isActive}
            
            
            
            // handlers:
            onClick={handleClick}
        />
    );
};
export {
    ToggleButton,
    ToggleButton as default,
}
