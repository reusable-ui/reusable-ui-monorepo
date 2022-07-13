// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui:
import {
    // hooks:
    useMergeRefs,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    OrientationName,
    OrientationVariant,
    
    ButtonStyle,
    ButtonVariant,
    ButtonType,
    IconPosition,
    
    
    
    // react components:
    ButtonIconProps,
    ButtonIcon,
}                           from '@reusable-ui/button-icon'     // a base component
import {
    // react components:
    DropdownUiComponentProps,
    
    DropdownProps,
    Dropdown,
    
    DropdownComponentProps,
}                           from '@reusable-ui/dropdown'        // a base component



// react components:

export interface DropdownButtonProps
    extends
        // bases:
        Omit<ButtonIconProps,
            // children:
            |'children' // we redefined `children` prop as a <DropdownUi> component
        >,
        
        // components:
        DropdownUiComponentProps<Element>,
        DropdownComponentProps<Element>
{
}
const DropdownButton = (props: DropdownButtonProps): JSX.Element|null => {
    // rest props:
    const {
        // components:
        // tabIndex, // the [tabIndex] is still attached to <ButtonIcon>
        children: dropdownUiComponent,
        
        dropdownRef,
        dropdownOrientation,
        dropdownComponent   = (<Dropdown<Element> >{dropdownUiComponent}</Dropdown> as React.ReactComponentElement<any, DropdownProps<Element>>),
    ...restButtonIconProps} = props;
    
    
    
    // refs:
    const mergedDropdownRef = useMergeRefs(
        // preserves the original `outerRef` from `dropdownComponent`:
        dropdownComponent.props.outerRef,
        
        
        
        // preserves the original `dropdownRef` from `props`:
        dropdownRef,
    );
    
    
    
    // jsx:
    return (
        <>
            <ButtonIcon
                // other props:
                {...restButtonIconProps}
            >
                // TODO
            </ButtonIcon>
            
            {/* <Dropdown> */}
            {React.cloneElement<DropdownProps<Element>>(dropdownComponent,
                // props:
                {
                    // refs:
                    outerRef    : mergedDropdownRef,
                    
                    
                    
                    // layouts:
                    orientation : dropdownComponent.props.orientation ?? dropdownOrientation,
                },
            )}
        </>
    );
};
export {
    DropdownButton,
    DropdownButton as default,
}

export type { OrientationName, OrientationVariant }

export type { ButtonStyle, ButtonVariant, ButtonType, IconPosition }
