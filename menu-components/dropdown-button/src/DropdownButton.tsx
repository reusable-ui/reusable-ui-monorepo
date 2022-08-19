// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui variants:
import {
    // hooks:
    useOrientationable,
}                           from '@reusable-ui/orientationable' // a capability of UI to rotate its layout

// reusable-ui states:
import {
    // type:
    ToggleCollapsibleProps,
    useToggleCollapsible,
}                           from '@reusable-ui/collapsible'     // a capability of UI to expand/reduce its size or toggle the visibility
import type {
    // hooks:
    ActiveChangeEvent,
}                           from '@reusable-ui/activatable'     // a capability of UI to be highlighted/selected/activated

// reusable-ui components:
import type {
    // types:
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
    ButtonIcon,
}                           from '@reusable-ui/button-icon'     // a button component with a nice icon
import {
    // defaults:
    defaultOrientationableOptions as dropdownDefaultOrientationableOptions,
    
    
    
    // react components:
    DropdownUiComponentProps,
    
    DropdownActionType,
    DropdownExpandedChangeEvent,
    
    DropdownProps,
    Dropdown,
    
    DropdownComponentProps,
}                           from '@reusable-ui/dropdown'        // overlays contextual element such as lists, menus, and more



// react components:
export interface DropdownButtonProps<TDropdownExpandedChangeEvent extends DropdownExpandedChangeEvent = DropdownExpandedChangeEvent>
    extends
        // bases:
        Omit<ButtonProps,
            // children:
            |'children' // we redefined `children` prop as a <DropdownUi> component
        >,
        
        // dropdowns:
        Omit<DropdownProps<Element, TDropdownExpandedChangeEvent>,
            // refs:
            |'elmRef'|'outerRef' // all (elm|outer)Ref are for <Button>
            
            // DOMs:
            |Exclude<keyof React.DOMAttributes<Element>, 'children'> // all DOM [attributes] are for <Button>
        >,
        ToggleCollapsibleProps<TDropdownExpandedChangeEvent>, // implements `onExpandedChange` & `defaultExpanded` (implements controllable & uncontrollable)
        
        // components:
        ButtonComponentProps,
        ToggleButtonComponentProps,
        DropdownUiComponentProps<Element>,
        DropdownComponentProps<Element, TDropdownExpandedChangeEvent>
{
}
const DropdownButton = <TDropdownExpandedChangeEvent extends DropdownExpandedChangeEvent = DropdownExpandedChangeEvent>(props: DropdownButtonProps<TDropdownExpandedChangeEvent>): JSX.Element|null => {
    // variants:
    const dropdownOrientationableVariant = useOrientationable(props, dropdownDefaultOrientationableOptions);
    const dropdownIsOrientationBlock     = dropdownOrientationableVariant.isOrientationBlock;
    
    
    
    // rest props:
    const {
        // behaviors:
        lazy,
        
        
        
        // states:
        defaultExpanded,  // take, to be handled by `useToggleCollapsible`
        expanded,         // take, to be handled by `useToggleCollapsible`
        onExpandedChange, // take, to be handled by `useToggleCollapsible`
        
        
        
        // floatable:
        floatingOn,
        floatingPlacement,
        floatingMiddleware,
        floatingStrategy,
        
        floatingAutoFlip,
        floatingAutoShift,
        floatingOffset,
        floatingShift,
        
        onFloatingUpdate,
        
        
        
        // components:
        buttonRef,
        buttonOrientation,
        buttonStyle,
        buttonComponent       = (<ButtonIcon iconPosition='end' icon={dropdownIsOrientationBlock ? 'dropdown' : 'dropright'} />   as React.ReactComponentElement<any, ButtonProps>),
        buttonChildren,
        
        toggleButtonComponent = (<ToggleButton /> as React.ReactComponentElement<any, ToggleButtonProps>),
        
        // tabIndex, // the [tabIndex] is still attached to <Button>
        children: dropdownUiComponent,
        
        dropdownRef,
        dropdownOrientation,
        dropdownComponent     = (<Dropdown<Element, TDropdownExpandedChangeEvent> >{dropdownUiComponent}</Dropdown> as React.ReactComponentElement<any, DropdownProps<Element, TDropdownExpandedChangeEvent>>),
    ...restButtonProps} = props;
    
    
    
    // states:
    const [isExpanded, setExpanded] = useToggleCollapsible({
        defaultExpanded,
        expanded,
        // onExpandedChange, // trigger manually to <Dropdown>'s `onExpandedChange`
    });
    
    
    
    // refs:
    const buttonRefInternal = useRef<HTMLButtonElement|null>(null);
    const mergedButtonRef   = useMergeRefs(
        // preserves the original `elmRef` from `buttonComponent`:
        buttonComponent.props.elmRef,
        
        
        
        // preserves the original `buttonRef` from `props`:
        buttonRef,
        // preserves the original `elmRef` from `props`:
        props.elmRef,
        
        
        
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
    const handleExpandedChangeInternal   = useEvent<EventHandler<TDropdownExpandedChangeEvent>>((event) => {
        setExpanded(event.expanded);
    });
    const handleExpandedChangeByUi       = useEvent<EventHandler<ActiveChangeEvent>>((event) => {
        // create an expanded event:
        const expandedEvent = { expanded: event.active, actionType: 'ui' } as TDropdownExpandedChangeEvent;
        
        
        
        // forwards the original `onExpandedChange` from `props`:
        onExpandedChange?.(expandedEvent); // request to change the [expanded] to <Parent>
        
        
        
        // actions:
        handleExpandedChangeInternal(expandedEvent);
    });
    const handleToggleButtonActiveChange = useMergeEvents(
        // preserves the original `onActiveChange` from `toggleButtonComponent`:
        toggleButtonComponent.props.onActiveChange,
        
        
        
        // forwards the original `onExpandedChange` from `props`:
        handleExpandedChangeByUi,
    );
    const handleExpandedChange           = useMergeEvents(
        // preserves the original `onExpandedChange` from `dropdownComponent`:
        dropdownComponent.props.onExpandedChange,
        
        
        
        // preserves the original `onExpandedChange` from `props`:
        onExpandedChange,
        
        
        
        // actions:
        handleExpandedChangeInternal,
    );
    const handleFloatingUpdate           = useMergeEvents(
        // preserves the original `onFloatingUpdate` from `dropdownComponent`:
        dropdownComponent.props.onFloatingUpdate,
        
        
        
        // preserves the original `onFloatingUpdate` from `props`:
        onFloatingUpdate,
    );
    
    
    
    // jsx:
    return (
        <>
            {/* <ToggleButton> */}
            {React.cloneElement<ToggleButtonProps>(toggleButtonComponent,
                // props:
                {
                    // states:
                    active          : toggleButtonComponent.props.active ?? isExpanded,
                    onActiveChange  : handleToggleButtonActiveChange,
                    
                    
                    
                    /* <Button> */
                    buttonComponent : React.cloneElement<ButtonProps>(buttonComponent,
                        // props:
                        {
                            // other props:
                            ...restButtonProps,
                            
                            
                            
                            // refs:
                            elmRef      : mergedButtonRef,
                            
                            
                            
                            // variants:
                            orientation : buttonComponent.props.orientation ?? buttonOrientation ?? props.orientation,
                            buttonStyle : buttonComponent.props.buttonStyle ?? buttonStyle,
                            
                            
                            
                            // classes:
                            classes     : classes,
                        },
                        
                        
                        
                        // children:
                        buttonComponent.props.children ?? buttonChildren,
                    ),
                },
            )}
            
            {/* <Dropdown> */}
            {React.cloneElement<DropdownProps<Element, TDropdownExpandedChangeEvent>>(dropdownComponent,
                // props:
                {
                    // refs:
                    outerRef           : mergedDropdownRef,
                    
                    
                    
                    // variants:
                    orientation        : dropdownComponent.props.orientation ?? dropdownOrientation,
                    
                    
                    
                    // behaviors:
                    lazy               : dropdownComponent.props.lazy            ?? lazy,
                    
                    
                    
                    // states:
                    expanded           : dropdownComponent.props.expanded ?? isExpanded,
                    onExpandedChange   : handleExpandedChange,
                    
                    
                    
                    // floatable:
                    floatingOn         : dropdownComponent.props.floatingOn         ?? floatingOn         ?? buttonRefInternal,
                    floatingPlacement  : dropdownComponent.props.floatingPlacement  ?? floatingPlacement,
                    floatingMiddleware : dropdownComponent.props.floatingMiddleware ?? floatingMiddleware,
                    floatingStrategy   : dropdownComponent.props.floatingStrategy   ?? floatingStrategy,
                    
                    floatingAutoFlip   : dropdownComponent.props.floatingAutoFlip   ?? floatingAutoFlip,
                    floatingAutoShift  : dropdownComponent.props.floatingAutoShift  ?? floatingAutoShift,
                    floatingOffset     : dropdownComponent.props.floatingOffset     ?? floatingOffset,
                    floatingShift      : dropdownComponent.props.floatingShift      ?? floatingShift,
                    
                    onFloatingUpdate   : handleFloatingUpdate,
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

export type { DropdownActionType, DropdownExpandedChangeEvent }

export type { ButtonStyle, ButtonVariant, ButtonType }
