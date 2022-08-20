// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useMergeRefs,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    usePropActive,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // hooks:
    DetermineCurrentPageProps,
    useDetermineCurrentPage,
}                           from '@reusable-ui/navigations'     // a set of navigation functions

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
export interface NavButtonProps
    extends
        // bases:
        ButtonProps,
        
        // navigations:
        DetermineCurrentPageProps,
        
        // components:
        ButtonComponentProps
{
}
const NavButton = (props: NavButtonProps): JSX.Element|null => {
    // rest props:
    const {
        // navigations:
        caseSensitive : _caseSensitive, // remove
        end           : _end,           // remove
        
        
        
        // accessibilities:
        active,
        
        
        
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
    
    
    
    // fn props:
    const propActive = usePropActive(props, null);
    const activeDn   = useDetermineCurrentPage(props);
    const activeFn   = (buttonComponent.props.active ?? propActive) /*controllable*/ ?? activeDn /*uncontrollable*/;
    
    
    
    // jsx:
    /* <Button> */
    return React.cloneElement<ButtonProps>(buttonComponent,
        // props:
        {
            // other props:
            ...restButtonProps,
            
            
            
            // refs:
            elmRef         : mergedButtonRef,
            
            
            
            // semantics:
            'aria-current' : (activeFn || undefined) && (buttonComponent.props['aria-current'] ?? props['aria-current'] ?? 'page'),
            
            
            
            // variants:
            orientation    : buttonComponent.props.orientation ?? buttonOrientation ?? props.orientation,
            buttonStyle    : buttonComponent.props.buttonStyle ?? buttonStyle,
            
            
            
            // states:
            active         : activeFn,
        },
        
        
        
        // children:
        buttonComponent.props.children ?? buttonChildren ?? props.children,
    );
};
export {
    NavButton,
    NavButton as default,
}

export type { ButtonStyle, ButtonVariant, ButtonType }
