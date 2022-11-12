// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useMergeRefs,
    
    
    
    // an accessibility management system:
    usePropActive,
    
    
    
    // a set of navigation functions:
    DetermineCurrentPageProps,
    useDetermineCurrentPage,
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
export interface NavButtonProps
    extends
        // bases:
        ButtonProps,
        
        // navigations:
        DetermineCurrentPageProps,
        
        // components:
        Omit<ButtonComponentProps,
            // we don't need these extra properties because the <NavButton> is sub <Button>
            |'buttonRef'
            |'buttonOrientation'
            |'buttonStyle'
            |'buttonChildren'
        >
{
}
const NavButton = (props: NavButtonProps): JSX.Element|null => {
    // rest props:
    const {
        // navigations:
        caseSensitive : _caseSensitive, // remove
        end           : _end,           // remove
        
        
        
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
    
    
    
    // fn props:
    const propActive = usePropActive(props, null);
    const activeDn   = useDetermineCurrentPage(props) ?? false /* server-side or <Link> was not defined */;
    const activeFn   = (buttonComponent.props.active ?? propActive) /*controllable*/ ?? activeDn /*uncontrollable*/;
    
    
    
    // jsx:
    /* <Button> */
    return React.cloneElement<ButtonProps>(buttonComponent,
        // props:
        {
            // other props:
            ...restButtonProps,
            ...buttonComponent.props, // overwrites restButtonProps (if any conflics)
            
            
            
            // refs:
            elmRef         : mergedButtonRef,
            
            
            
            // semantics:
            'aria-current' : (activeFn || undefined) && (buttonComponent.props['aria-current'] ?? props['aria-current'] ?? 'page'),
            
            
            
            // states:
            active         : activeFn,
        },
        
        
        
        // children:
        buttonComponent.props.children ?? props.children,
    );
};
export {
    NavButton,
    NavButton as default,
}

export type { ButtonStyle, ButtonVariant, ButtonType }
