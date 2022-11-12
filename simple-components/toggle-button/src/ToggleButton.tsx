// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ToggleActivatableProps,
    useToggleActivatable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
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
        Omit<ButtonComponentProps,
            // we don't need these extra properties because the <ToggleButton> is sub <Button>
            |'buttonRef'
            |'buttonOrientation'
            |'buttonStyle'
            |'buttonChildren'
        >
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
        buttonComponent = (<Button /> as React.ReactComponentElement<any, ButtonProps>),
    ...restButtonProps} = props;
    
    
    
    // refs:
    const mergedButtonRef   = useMergeRefs(
        // preserves the original `elmRef` from `buttonComponent`:
        buttonComponent.props.elmRef,
        
        
        
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
    });
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
            ...buttonComponent.props, // overwrites restButtonProps (if any conflics)
            
            
            
            // refs:
            elmRef          : mergedButtonRef,
            
            
            
            // semantics:
            'aria-expanded' : (activeFn || undefined) && (buttonComponent.props['aria-expanded'] ?? props['aria-expanded'] ?? true), // ignore [aria-expanded] when (activeFn === false) and the default value of [aria-expanded] is true
            
            
            
            // states:
            active          : activeFn,
            
            
            
            // handlers:
            onClick         : handleClick,
        },
        
        
        
        // children:
        buttonComponent.props.children ?? props.children,
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
