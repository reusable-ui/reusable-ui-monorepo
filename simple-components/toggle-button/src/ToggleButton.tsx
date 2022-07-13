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
    useMergeRefs,
}                           from '@reusable-ui/hooks'           // react helper hooks
export type {
    // hooks:
    OrientationName,
    OrientationVariant,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ToggleActiveProps,
    useToggleActive,
}                           from '@reusable-ui/indicator'       // a base component
export {
    // hooks:
    ButtonStyle,
    ButtonVariant,
    ButtonType,
    
    
    
    // styles:
    usesButtonLayout   as usesToggleButtonLayout,
    usesButtonVariants as usesToggleButtonVariants,
    usesButtonStates   as usesToggleButtonStates,
}                           from '@reusable-ui/button'          // a base component
import {
    // react components:
    ButtonProps,
    Button,
    
    ButtonComponentProps,
}                           from '@reusable-ui/button'          // a base component



// react components:
export interface ToggleButtonProps
    extends
        // bases:
        ButtonProps,
        
        // behaviors:
        ToggleActiveProps,
        
        // components:
        ButtonComponentProps
{
}
const ToggleButton = (props: ToggleButtonProps): JSX.Element|null => {
    // states:
    const [isActive, , toggleActive] = useToggleActive(props);
    
    
    
    // rest props:
    const {
        // remove props:
        
        // accessibilities:
        defaultActive  : _defaultActive,  // take, already handled by `useToggleActive`
        onActiveChange : _onActiveChange, // take, already handled by `useToggleActive`
        
        
        
        // components:
        buttonRef,
        buttonOrientation,
        buttonComponent     = (<Button /> as React.ReactComponentElement<any, ButtonProps>),
        buttonChildren,
    ...restButtonProps} = props;
    
    
    
    // refs:
    const mergedButtonRef   = useMergeRefs(
        // preserves the original `elmRef` from `buttonComponent`:
        buttonComponent.props.elmRef,
        
        
        
        // preserves the original `buttonRef` from `props`:
        buttonRef,
    );
    
    
    
    // handlers:
    const handleClickInternal = useEvent<React.MouseEventHandler<HTMLButtonElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        toggleActive();         // handle click as toggle [active]
        event.preventDefault(); // handled
    }, []);
    const handleClick         = useMergeEvents(
        // preserves the original `onClick`:
        props.onClick,
        
        
        
        // actions:
        handleClickInternal,
    );
    
    
    
    // jsx:
    /* <Button> */
    return React.cloneElement<ButtonProps>(buttonComponent,
        // props:
        {
            // other props:
            ...restButtonProps,
            
            
            
            // refs:
            elmRef          : mergedButtonRef,
            
            
            
            // semantics:
            'aria-expanded' : (isActive || undefined) && (buttonComponent.props['aria-expanded'] ?? true), // ignore [aria-expanded] when (isActive === false) and the default value of [aria-expanded] is true
            
            
            
            // accessibilities:
            active          : isActive,
            
            
            
            // handlers:
            onClick         : handleClick,
        },
    );
};
export {
    ToggleButton,
    ToggleButton as default,
}
