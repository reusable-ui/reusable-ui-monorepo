// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useMergeEvents,
    useMergeClasses,
    
    
    
    // an accessibility management system:
    usePropAccessibility,
    AccessibilityProps,
    AccessibilityProvider,
    
    
    
    // a capability of UI to be disabled:
    DisableableProps,
    useDisableable,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ActivatableProps,
    useActivatable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component



// styles:
export const useIndicatorStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: '9i8stbnt0e' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface IndicatorProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        BasicProps<TElement>,
        
        // states:
        DisableableProps,
        ActivatableProps,
        
        // accessibilities:
        AccessibilityProps
{
}
const Indicator = <TElement extends Element = HTMLElement>(props: IndicatorProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet       = useIndicatorStyleSheet();
    
    
    
    // states:
    const disableableState = useDisableable<TElement>(props);
    const activatableState = useActivatable<TElement>(props);
    
    
    
    // fn props:
    const propAccess       = usePropAccessibility(props);
    
    
    
    // rest props:
    const {
        // states:
        enabled         : _enabled,         // remove
        inheritEnabled  : _inheritEnabled,  // remove
        
        active          : _active,          // remove
        inheritActive   : _inheritActive,   // remove
        
        readOnly        : _readOnly,        // remove
        inheritReadOnly : _inheritReadOnly, // remove
        
        
        
        // children:
        children,
    ...restBasicProps} = props;
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // states:
        disableableState.class,
        activatableState.class,
    );
    
    
    
    // handlers:
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart`:
        props.onAnimationStart,
        
        
        
        // states:
        disableableState.handleAnimationStart,
        activatableState.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        disableableState.handleAnimationEnd,
        activatableState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...restBasicProps}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            
            
            
            // :disabled | [aria-disabled]
            {...disableableState.props}
            
            // :checked | [aria-checked] | [aria-pressed] | [aria-selected]
            {...activatableState.props}
            
            
            
            // handlers:
            onAnimationStart = {handleAnimationStart}
            onAnimationEnd   = {handleAnimationEnd  }
        >
            { children && <AccessibilityProvider {...propAccess}>
                { children }
            </AccessibilityProvider> }
        </Basic>
    );
};
export {
    Indicator,
    Indicator as default,
}
