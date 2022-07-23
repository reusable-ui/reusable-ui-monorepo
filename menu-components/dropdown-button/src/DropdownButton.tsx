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
    // type:
    ToggleExpandableProps,
    useToggleExpandable,
}                           from '@reusable-ui/expandables'     // a capability of UI to expand/reduce its size or toggle the visibility
import type {
    // hooks:
    ActiveChangeEvent,
}                           from '@reusable-ui/indicator'       // a base indicator control
import type {
    // types:
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
    // types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
    PopupSide,
    
    
    
    // hooks:
    defaultOrientationRuleOptions as defaultDropdownOrientationRuleOptions,
    
    
    
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
        
        // accessibilities:
        Omit<DropdownProps<Element, TDropdownExpandedChangeEvent>,
            // refs:
            |'elmRef'|'outerRef' // all (elm|outer)Ref are for <Button>
            
            // DOMs:
            |Exclude<keyof React.DOMAttributes<Element>, 'children'> // all DOM [attributes] are for <Button>
        >,
        ToggleExpandableProps<TDropdownExpandedChangeEvent>, // supports uncontrollable expanded
        
        // components:
        ButtonComponentProps,
        ToggleButtonComponentProps,
        DropdownUiComponentProps<Element>,
        DropdownComponentProps<Element, TDropdownExpandedChangeEvent>
{
}
const DropdownButton = <TDropdownExpandedChangeEvent extends DropdownExpandedChangeEvent = DropdownExpandedChangeEvent>(props: DropdownButtonProps<TDropdownExpandedChangeEvent>): JSX.Element|null => {
    // variants:
    const isDropdownOrientationBlock = ((props.dropdownOrientation ?? defaultDropdownOrientationRuleOptions.defaultOrientation) === 'block');
    
    
    
    // rest props:
    const {
        // accessibilities:
        defaultExpanded,  // take, to be handled by `useToggleExpandable`
        expanded,         // take, to be handled by `useToggleExpandable`
        onExpandedChange, // take, to be handled by `useToggleExpandable`
        
        
        
        // popups:
        targetRef,
        popupPlacement,
        popupMiddleware,
        popupStrategy,
        
        popupAutoFlip,
        popupAutoShift,
        popupOffset,
        popupShift,
        
        onPopupUpdate,
        
        
        
        // behaviors:
        lazy,
        
        
        
        // components:
        buttonRef,
        buttonOrientation,
        buttonComponent       = (<ButtonIcon iconPosition='end' icon={isDropdownOrientationBlock ? 'dropdown' : 'dropright'} />   as React.ReactComponentElement<any, ButtonIconProps>),
        buttonChildren,
        
        toggleButtonComponent = (<ToggleButton /> as React.ReactComponentElement<any, ToggleButtonProps>),
        
        // tabIndex, // the [tabIndex] is still attached to <Button>
        children: dropdownUiComponent,
        
        dropdownRef,
        dropdownOrientation,
        dropdownComponent     = (<Dropdown<Element, TDropdownExpandedChangeEvent> >{dropdownUiComponent}</Dropdown> as React.ReactComponentElement<any, DropdownProps<Element, TDropdownExpandedChangeEvent>>),
    ...restButtonProps} = props;
    
    
    
    // states:
    const [isExpanded, setExpanded] = useToggleExpandable({
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
    }, []);
    const forwardExpandedChangeByUi      = useEvent<EventHandler<ActiveChangeEvent>>((event) => {
        // create an expanded event:
        const expandedEvent = { expanded: event.newActive, actionType: 'ui' } as TDropdownExpandedChangeEvent;
        
        
        
        // forwards the original `onExpandedChange` from `props`:
        onExpandedChange?.(expandedEvent); // request to change the [expanded] to <Parent>
        
        
        
        // actions:
        handleExpandedChangeInternal(expandedEvent);
    }, [onExpandedChange]);
    const handleToggleButtonActiveChange = useMergeEvents(
        // preserves the original `onActiveChange` from `toggleButtonComponent`:
        toggleButtonComponent.props.onActiveChange,
        
        
        
        // forwards the original `onExpandedChange` from `props`:
        forwardExpandedChangeByUi,
    );
    const handleExpandedChange           = useMergeEvents(
        // preserves the original `onExpandedChange` from `dropdownComponent`:
        dropdownComponent.props.onExpandedChange,
        
        
        
        // preserves the original `onExpandedChange` from `props`:
        onExpandedChange,
        
        
        
        // actions:
        handleExpandedChangeInternal,
    );
    const handlePopupUpdate              = useMergeEvents(
        // preserves the original `onPopupUpdate` from `dropdownComponent`:
        dropdownComponent.props.onPopupUpdate,
        
        
        
        // preserves the original `onPopupUpdate` from `props`:
        onPopupUpdate,
    );
    
    
    
    // jsx:
    return (
        <>
            {/* <ToggleButton> */}
            {React.cloneElement<ToggleButtonProps>(toggleButtonComponent,
                // props:
                {
                    // accessibilities:
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
                            
                            
                            
                            // layouts:
                            orientation : buttonComponent.props.orientation ?? buttonOrientation ?? props.orientation,
                            
                            
                            
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
                    outerRef         : mergedDropdownRef,
                    
                    
                    
                    // layouts:
                    orientation      : dropdownComponent.props.orientation ?? dropdownOrientation,
                    
                    
                    
                    // accessibilities:
                    expanded         : dropdownComponent.props.expanded ?? isExpanded,
                    onExpandedChange : handleExpandedChange,
                    
                    
                    
                    // popups:
                    targetRef        : dropdownComponent.props.targetRef       ?? targetRef       ?? buttonRefInternal,
                    popupPlacement   : dropdownComponent.props.popupPlacement  ?? popupPlacement,
                    popupMiddleware  : dropdownComponent.props.popupMiddleware ?? popupMiddleware,
                    popupStrategy    : dropdownComponent.props.popupStrategy   ?? popupStrategy,
                    
                    popupAutoFlip    : dropdownComponent.props.popupAutoFlip   ?? popupAutoFlip,
                    popupAutoShift   : dropdownComponent.props.popupAutoShift  ?? popupAutoShift,
                    popupOffset      : dropdownComponent.props.popupOffset     ?? popupOffset,
                    popupShift       : dropdownComponent.props.popupShift      ?? popupShift,
                    
                    onPopupUpdate    : handlePopupUpdate,
                    
                    
                    
                    // behaviors:
                    lazy             : dropdownComponent.props.lazy            ?? lazy,
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

export type { PopupPlacement, PopupMiddleware, PopupStrategy, PopupPosition, PopupSide }

export type { DropdownActionType, DropdownExpandedChangeEvent }

export type { ButtonStyle, ButtonVariant, ButtonType }
