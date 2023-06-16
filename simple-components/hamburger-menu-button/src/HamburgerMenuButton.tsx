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

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useMergeClasses,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ActiveChangeEvent,
    useUncontrollableActivatable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

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

// internals:
import {
    // states:
    useHamburgerable,
}                           from './states/hamburgerable.js'



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
    
    
    
    // states:
    const [isActive, , toggleActive] = useUncontrollableActivatable<ActiveChangeEvent>(props);
    const hamburgerableState = useHamburgerable<HTMLButtonElement>(isActive);
    
    
    
    // rest props:
    const {
        // components:
        toggleButtonComponent = (<ToggleButton /> as React.ReactComponentElement<any, ToggleButtonProps>),
    ...restToggleButtonProps} = props;
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses` from `toggleButtonComponent`:
        toggleButtonComponent.props.stateClasses,
        
        
        
        // preserves the original `stateClasses` from `props`:
        props.stateClasses,
        
        
        
        // states:
        hamburgerableState.class,
    );
    
    
    
    // handlers:
    const handleClickInternal  = useEvent<React.MouseEventHandler<HTMLButtonElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        toggleActive();         // handle click as toggle [active]
        event.preventDefault(); // handled
    });
    const handleClick          = useMergeEvents(
        // preserves the original `onClick` from `toggleButtonComponent`:
        toggleButtonComponent.props.onClick,
        
        
        
        // preserves the original `onClick` from `props`:
        props.onClick,
        
        
        
        // actions:
        handleClickInternal,
    );
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart` from `toggleButtonComponent`:
        toggleButtonComponent.props.onAnimationStart,
        
        
        
        // preserves the original `onAnimationStart` from `props`:
        props.onAnimationStart,
        
        
        
        // states:
        hamburgerableState.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd` from `toggleButtonComponent`:
        toggleButtonComponent.props.onAnimationEnd,
        
        
        
        // preserves the original `onAnimationEnd` from `props`:
        props.onAnimationEnd,
        
        
        
        // states:
        hamburgerableState.handleAnimationEnd,
    );
    
    
    
    // fn props:
    const activeFn = (toggleButtonComponent.props.active ?? isActive);
    
    
    
    // jsx:
    /* <ToggleButton> */
    return React.cloneElement<ToggleButtonProps>(toggleButtonComponent,
        // props:
        {
            // other props:
            ...restToggleButtonProps,
            ...toggleButtonComponent.props, // overwrites restToggleButtonProps (if any conflics)
            
            
            
            // accessibilities:
            label            : toggleButtonComponent.props.label     ?? props.label     ?? 'Toggle navigation',
            
            
            
            // classes:
            mainClass        : toggleButtonComponent.props.mainClass ?? props.mainClass ?? styleSheet.main,
            stateClasses,
            
            
            
            // states:
            active           : activeFn,
            
            
            
            // handlers:
            onClick          : handleClick,
            onAnimationStart : handleAnimationStart,
            onAnimationEnd   : handleAnimationEnd,
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
