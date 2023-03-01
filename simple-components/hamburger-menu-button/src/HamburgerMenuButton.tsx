// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // checks if a certain css feature is supported by the running browser:
    supportsHasPseudoClass,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui components:
import {
    // semantics:
    ButtonType,
    
    
    
    // variants:
    ButtonStyle,
    ButtonVariant,
    
    
    
    // react components:
    ToggleButtonProps,
    ToggleButton,
    
    ToggleButtonComponentProps,
}                           from '@reusable-ui/toggle-button'   // a base component



// styles:
export const useHamburgerMenuButtonStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, {
    id      : '5sj70x1zsf',             // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
    lazyCsr : supportsHasPseudoClass(), // dealing with browsers that don't support the :has() selector
});



// react components:
export interface HamburgerMenuButtonProps
    extends
        // bases:
        Omit<ToggleButtonProps,
            // links:
            |'href' // link href is not supported
            
            
            
            // variants:
            |'orientation' // orientation is not supported
            
            
            
            // children:
            |'children' // children is not supported
        >,
        
        // components:
        ToggleButtonComponentProps
{
}
const HamburgerMenuButton = (props: HamburgerMenuButtonProps): JSX.Element|null => {
    // styles:
    const styleSheet = useHamburgerMenuButtonStyleSheet();
    
    
    
    // rest props:
    const {
        // components:
        toggleButtonComponent = (<ToggleButton /> as React.ReactComponentElement<any, ToggleButtonProps>),
    ...restToggleButtonProps} = props;
    
    
    
    // jsx:
    /* <ToggleButton> */
    return React.cloneElement<ToggleButtonProps>(toggleButtonComponent,
        // props:
        {
            // other props:
            ...restToggleButtonProps,
            ...toggleButtonComponent.props, // overwrites restToggleButtonProps (if any conflics)
            
            
            
            // accessibilities:
            label     : toggleButtonComponent.props.label     ?? props.label     ?? 'Toggle navigation',
            
            
            
            // classes:
            mainClass : toggleButtonComponent.props.mainClass ?? props.mainClass ?? styleSheet.main,
        },
        
        
        
        // children:
        toggleButtonComponent.props.children ?? (
            <svg viewBox='0 0 24 24'>
                <polyline points='3,4 21,4' />
                <polyline points='3,12 21,12' />
                <polyline points='3,20 21,20' />
            </svg>
        ),
    );
};
export {
    HamburgerMenuButton,
    HamburgerMenuButton as default,
}

export type { ButtonType, ButtonStyle, ButtonVariant }
