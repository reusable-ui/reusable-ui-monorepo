// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
}                           from 'react'

// reusable-ui:
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    ToggleActiveProps,
    useToggleActive,
}                           from '@reusable-ui/indicator'       // a base indicator control
import {
    // react components:
    ButtonProps,
    ButtonComponentProps,
}                           from '@reusable-ui/button'          // a button component for initiating an action
import {
    // hooks:
    OrientationName,
    OrientationVariant,
    
    ButtonStyle,
    ButtonVariant,
    ButtonType,
    
    
    
    // react components:
    ButtonIconProps,
    ButtonIcon,
}                           from '@reusable-ui/button-icon'     // a button component with a nice icon
import {
    // react components:
    DropdownUiComponentProps,
    
    DropdownProps,
    Dropdown,
    
    DropdownComponentProps,
}                           from '@reusable-ui/dropdown'        // overlays contextual element such as lists, menus, and more



// react components:

export interface DropdownButtonProps
    extends
        // bases:
        Omit<ButtonProps,
            // children:
            |'children' // we redefined `children` prop as a <DropdownUi> component
        >,
        
        // behaviors:
        Omit<ToggleActiveProps,
            // children:
            |'children' // we redefined `children` prop as a <DropdownUi> component
        >,
        
        // components:
        ButtonComponentProps,
        DropdownUiComponentProps<Element>,
        DropdownComponentProps<Element>
{
}
const DropdownButton = (props: DropdownButtonProps): JSX.Element|null => {
    // states:
    const [isActive, , toggleActive] = useToggleActive(props);
    
    
    
    // rest props:
    const {
        // remove props:
        
        // accessibilities:
        defaultActive  : _defaultActive, // take, already handled by `useToggleActive`
        onActiveChange,                  // take, already handled by `useToggleActive`
        
        
        
        // components:
        buttonRef,
        buttonOrientation,
        buttonComponent     = (<ButtonIcon /> as React.ReactComponentElement<any, ButtonIconProps>),
        buttonChildren,
        
        // tabIndex, // the [tabIndex] is still attached to <Button>
        children: dropdownUiComponent,
        
        dropdownRef,
        dropdownOrientation,
        dropdownComponent   = (<Dropdown<Element> >{dropdownUiComponent}</Dropdown> as React.ReactComponentElement<any, DropdownProps<Element>>),
    ...restButtonProps} = props;
    
    
    
    // refs:
    const buttonRefInternal = useRef<HTMLButtonElement|null>(null);
    const mergedButtonRef   = useMergeRefs(
        // preserves the original `elmRef` from `buttonComponent`:
        buttonComponent.props.elmRef,
        
        
        
        // preserves the original `buttonRef` from `props`:
        buttonRef,
        
        
        
        buttonRefInternal,
    );
    const mergedDropdownRef = useMergeRefs(
        // preserves the original `outerRef` from `dropdownComponent`:
        dropdownComponent.props.outerRef,
        
        
        
        // preserves the original `dropdownRef` from `props`:
        dropdownRef,
    );
    
    
    
    // classes:
    const classes = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // classes:
        'last-visible-child', // a fix for <DropdownButton> inside a <Group>
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
    const handleActiveChange  = useMergeEvents(
        // preserves the original `onActiveChange` from `dropdownComponent`:
        dropdownComponent.props.onActiveChange,
        
        
        
        // preserves the original `onActiveChange` from `props`:
        onActiveChange,
    );
    
    
    
    // jsx:
    return (
        <>
            {/* <Button> */}
            {React.cloneElement<ButtonProps>(buttonComponent,
                // props:
                {
                    // other props:
                    ...restButtonProps,
                    
                    
                    
                    // refs:
                    elmRef          : mergedButtonRef,
                    
                    
                    
                    // semantics:
                    'aria-expanded' : (isActive || undefined) && (buttonComponent.props['aria-expanded'] ?? true), // ignore [aria-expanded] when (isActive === false) and the default value of [aria-expanded] is true
                    
                    
                    
                    // layouts:
                    orientation     : buttonComponent.props.orientation ?? buttonOrientation,
                    
                    
                    
                    // classes:
                    classes         : classes,
                    
                    
                    
                    // accessibilities:
                    active          : isActive,
                    
                    
                    
                    // handlers:
                    onClick         : handleClick,
                },
                
                
                
                // children:
                buttonComponent.props.children ?? buttonChildren,
            )}
            
            {/* <Dropdown> */}
            {React.cloneElement<DropdownProps<Element>>(dropdownComponent,
                // props:
                {
                    // refs:
                    outerRef       : mergedDropdownRef,
                    
                    
                    
                    // layouts:
                    orientation    : dropdownComponent.props.orientation ?? dropdownOrientation,
                    
                    
                    
                    // accessibilities:
                    active         : isActive,
                    onActiveChange : handleActiveChange,
                    
                    
                    
                    // popups:
                    targetRef      : buttonRefInternal,
                },
                
                
                
                // children:
                dropdownComponent.props.children ?? dropdownUiComponent,
            )}
        </>
    );
};
export {
    DropdownButton,
    DropdownButton as default,
}

export type { OrientationName, OrientationVariant }

export type { ButtonStyle, ButtonVariant, ButtonType }
