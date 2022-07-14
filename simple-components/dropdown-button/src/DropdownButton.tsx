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
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    ActiveChangeEvent,
    ToggleActiveProps,
    useToggleActive,
}                           from '@reusable-ui/indicator'       // a base indicator control
import {
    // hooks:
    OrientationName,
    OrientationVariant,
    
    ButtonStyle,
    ButtonVariant,
    ButtonType,
    
    
    
    // react components:
    ButtonProps,
    ButtonComponentProps,
}                           from '@reusable-ui/button'          // a button component for initiating an action
import {
    ToggleButtonProps,
    ToggleButton,
    
    ToggleButtonComponentProps,
}                           from '@reusable-ui/toggle-button'   // a button with toggleable active state
import {
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
        
        // accessibilities:
        Omit<ToggleActiveProps,
            // accessibilities:
            |'onActiveChange' // replaced with more specific <Dropdown>'s `onActiveChange`
            
            // children:
            |'children' // we redefined `children` prop as a <DropdownUi> component
        >,
        Pick<DropdownProps<Element>,
            |'onActiveChange' // replaced with more specific <Dropdown>'s `onActiveChange`
        >,
        
        // components:
        ButtonComponentProps,
        ToggleButtonComponentProps,
        DropdownUiComponentProps<Element>,
        DropdownComponentProps<Element>
{
}
const DropdownButton = (props: DropdownButtonProps): JSX.Element|null => {
    // rest props:
    const {
        // remove props:
        
        // accessibilities:
        defaultActive,  // take, to be handled by `useToggleActive`
        active,         // take, to be handled by `useToggleActive`
        inheritActive,  // take, to be handled by `useToggleActive`
        onActiveChange, // take, to be handled by `useToggleActive`
        
        
        
        // components:
        buttonRef,
        buttonOrientation,
        buttonComponent       = (<ButtonIcon />   as React.ReactComponentElement<any, ButtonIconProps>),
        buttonChildren,
        
        toggleButtonComponent = (<ToggleButton /> as React.ReactComponentElement<any, ToggleButtonProps>),
        
        // tabIndex, // the [tabIndex] is still attached to <Button>
        children: dropdownUiComponent,
        
        dropdownRef,
        dropdownOrientation,
        dropdownComponent     = (<Dropdown<Element> >{dropdownUiComponent}</Dropdown> as React.ReactComponentElement<any, DropdownProps<Element>>),
    ...restButtonProps} = props;
    
    
    
    // states:
    const [isActive, setActive] = useToggleActive({
        enabled         : props.enabled,
        inheritEnabled  : props.inheritEnabled,
        
        readOnly        : props.readOnly,
        inheritReadOnly : props.inheritReadOnly,
        
        defaultActive,
        active,
        inheritActive,
        // onActiveChange, // trigger manually to <Dropdown>'s `onActiveChange`
    });
    
    
    
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
        // preserves the original `classes` from `buttonComponent`:
        buttonComponent.props.classes,
        
        
        
        // preserves the original `classes` from `props`:
        props.classes,
        
        
        
        // classes:
        'last-visible-child', // a fix for <DropdownButton> inside a <Group>
    );
    
    
    
    // handlers:
    const triggerActiveChangeByUi        = useEvent<EventHandler<ActiveChangeEvent>>((event) => {
        Promise.resolve().then(() => { // trigger the event after the <DropdownButton> has finished rendering (for controllable <DropdownButton>)
            onActiveChange?.({ newActive: event.newActive, closeType: 'ui' }); // request to change the [active] to <Parent
        });
    }, [onActiveChange]);
    const handleActiveChangeInternal     = useEvent<EventHandler<ActiveChangeEvent>>((event) => {
        setActive(event.newActive);
    }, []);
    const handleToggleButtonActiveChange = useMergeEvents(
        // preserves the original `onActiveChange` from `toggleButtonComponent`:
        toggleButtonComponent.props.onActiveChange,
        
        
        
        // forwards the original `onActiveChange` from `props`:
        triggerActiveChangeByUi,
        
        
        
        // actions:
        handleActiveChangeInternal,
    );
    const handleDropdownActiveChange     = useMergeEvents(
        // preserves the original `onActiveChange` from `dropdownComponent`:
        dropdownComponent.props.onActiveChange,
        
        
        
        // preserves the original `onActiveChange` from `props`:
        onActiveChange,
        
        
        
        // actions:
        handleActiveChangeInternal,
    );
    
    
    
    // jsx:
    return (
        <>
            {/* <ToggleButton> */}
            {React.cloneElement<ToggleButtonProps>(toggleButtonComponent,
                // props:
                {
                    // accessibilities:
                    active          : toggleButtonComponent.props.active ?? isActive,
                    onActiveChange  : handleToggleButtonActiveChange,
                    
                    
                    
                    /* <Button> */
                    buttonComponent : React.cloneElement<ButtonProps>(buttonComponent,
                        // props:
                        {
                            // other props:
                            ...restButtonProps,
                            
                            
                            
                            // refs:
                            elmRef      : mergedButtonRef,
                            
                            
                            
                            // layouts:
                            orientation : buttonComponent.props.orientation ?? buttonOrientation,
                            
                            
                            
                            // classes:
                            classes     : classes,
                        },
                        
                        
                        
                        // children:
                        buttonComponent.props.children ?? buttonChildren,
                    ),
                },
            )}
            
            {/* <Dropdown> */}
            {React.cloneElement<DropdownProps<Element>>(dropdownComponent,
                // props:
                {
                    // refs:
                    outerRef        : mergedDropdownRef,
                    
                    
                    
                    // layouts:
                    orientation     : dropdownComponent.props.orientation ?? dropdownOrientation,
                    
                    
                    
                    // accessibilities:
                    active          : dropdownComponent.props.active ?? isActive,
                    onActiveChange  : handleDropdownActiveChange,
                    
                    
                    
                    // popups:
                    targetRef       : dropdownComponent.props.targetRef ?? buttonRefInternal,
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
