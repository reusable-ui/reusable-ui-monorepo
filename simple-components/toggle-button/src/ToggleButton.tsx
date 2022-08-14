// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui states:
import {
    // hooks:
    ToggleActivatableProps,
    useToggleActivatable,
}                           from '@reusable-ui/activatable'     // a capability of UI to be highlighted/selected/activated

// reusable-ui components:
import {
    // hooks:
    ButtonStyle,
    ButtonVariant,
    ButtonType,
    
    
    
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
        
        // states:
        ToggleActivatableProps,
        
        // components:
        ButtonComponentProps
{
}
const ToggleButton = (props: ToggleButtonProps): JSX.Element|null => {
    // states:
    const [isActive, , toggleActive] = useToggleActivatable(props);
    
    
    
    // rest props:
    const {
        // states:
        defaultActive  : _defaultActive,  // take, already handled by `useToggleActivatable`
        onActiveChange : _onActiveChange, // take, already handled by `useToggleActivatable`
        
        
        
        // components:
        buttonRef,
        buttonOrientation,
        buttonStyle,
        buttonComponent     = (<Button /> as React.ReactComponentElement<any, ButtonProps>),
        buttonChildren,
    ...restButtonProps} = props;
    
    
    
    // refs:
    const mergedButtonRef   = useMergeRefs(
        // preserves the original `elmRef` from `buttonComponent`:
        buttonComponent.props.elmRef,
        
        
        
        // preserves the original `buttonRef` from `props`:
        buttonRef,
        // preserves the original `elmRef` from `props`:
        props.elmRef,
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
        // preserves the original `onClick` from `buttonComponent`:
        buttonComponent.props.onClick,
        
        
        
        // preserves the original `onClick` from `props`:
        props.onClick,
        
        
        
        // actions:
        handleClickInternal,
    );
    
    
    
    // fn props:
    const activeFn = (buttonComponent.props.active ?? isActive);
    
    
    
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
            'aria-expanded' : (activeFn || undefined) && (buttonComponent.props['aria-expanded'] ?? props['aria-expanded'] ?? true), // ignore [aria-expanded] when (activeFn === false) and the default value of [aria-expanded] is true
            
            
            
            // variants:
            orientation     : buttonComponent.props.orientation ?? buttonOrientation ?? props.orientation,
            buttonStyle     : buttonComponent.props.buttonStyle ?? buttonStyle,
            
            
            
            // states:
            active          : activeFn,
            
            
            
            // handlers:
            onClick         : handleClick,
        },
        
        
        
        // children:
        buttonComponent.props.children ?? buttonChildren ?? props.children,
    );
};
export {
    ToggleButton,
    ToggleButton as default,
}

export type { ButtonStyle, ButtonVariant, ButtonType }



export interface ToggleButtonComponentProps
{
    // components:
    toggleButtonComponent ?: React.ReactComponentElement<any, ToggleButtonProps>
}
