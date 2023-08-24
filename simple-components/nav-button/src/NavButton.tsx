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
    ElementWithAutoActive,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // semantics:
    ButtonType,
    
    
    
    // variants:
    ButtonStyle,
    ButtonVariant,
    
    
    
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
        caseSensitive,
        end,
        
        
        
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
    const propActive           = usePropActive(props, null);
    const activeSt             = (buttonComponent.props.active ?? propActive) /*controllable*/;
    const isControllableActive = activeSt !== null;
    
    
    
    // jsx:
    /* <Button> */
    const navButton = React.cloneElement<ButtonProps>(buttonComponent,
        // props:
        {
            // other props:
            ...restButtonProps,
            ...buttonComponent.props, // overwrites restButtonProps (if any conflics)
            
            
            
            // refs:
            elmRef         : mergedButtonRef,
            
            
            
            // semantics:
            'aria-current' : buttonComponent.props['aria-current'] ?? props['aria-current'] ?? 'page',
        },
        
        
        
        // children:
        buttonComponent.props.children ?? props.children,
    );
    if (isControllableActive) return React.cloneElement<ButtonProps>(navButton,
        // props:
        {
            // states:
            active         : activeSt,
        },
    );
    const navButtonProps = navButton.props;
    return (
        <ElementWithAutoActive
            // other props:
            {...navButtonProps} // steals all navButton's props, so the <Owner> can recognize the <ElementWithAutoActive> as <TheirChild>
            
            
            
            // navigations:
            caseSensitive={caseSensitive}
            end={end}
            
            
            
            // components:
            elementComponent={ // the underlying `<Element>` to be `<Link>`-ed and manipulated of `[active]` & `[aria-current]` props, based on the current page url
                // clone navButton element with (almost) blank props:
                <navButton.type
                    // identifiers:
                    key={navButton.key}
                    
                    
                    
                    //#region restore conflicting props
                    {...{
                        ...(('caseSensitive'    in navButtonProps) ? { caseSensitive    : navButtonProps.caseSensitive    } : undefined),
                        ...(('end'              in navButtonProps) ? { end              : navButtonProps.end              } : undefined),
                        ...(('elementComponent' in navButtonProps) ? { elementComponent : navButtonProps.elementComponent } : undefined),
                    }}
                    //#endregion restore conflicting props
                />
            }
        />
    );
};
export {
    NavButton,
    NavButton as default,
}

export type { ButtonType, ButtonStyle, ButtonVariant }
