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
    useMergeEvents,
    useMergeClasses,
    
    
    
    // an accessibility management system:
    usePropEnabled,
    
    
    
    // a capability of UI to be focused:
    FocusableProps,
    useFocusable,
    
    
    
    // adds an interactive feel to a UI:
    InteractableProps,
    useInteractable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    IndicatorProps,
    Indicator,
}                           from '@reusable-ui/indicator'       // a base component



// styles:
export const useControlStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, {
    id      : 'k8egfpu96l',             // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
    lazyCsr : supportsHasPseudoClass(), // dealing with browsers that don't support the :has() selector
});



// react components:
export interface ControlProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        IndicatorProps<TElement>,
        
        // states:
        FocusableProps,
        InteractableProps
{
}
const Control = <TElement extends Element = HTMLElement>(props: ControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet        = useControlStyleSheet();
    
    
    
    // states:
    const focusableState    = useFocusable<TElement>(props);
    const interactableState = useInteractable<TElement>(props, focusableState);
    
    
    
    // fn props:
    const propEnabled       = usePropEnabled(props);
    
    
    
    // rest props:
    const {
        // accessibilities:
        tabIndex = (propEnabled ? 0 : -1), // makes any element type focusable
        
        
        
        // states:
        focused            : _focused,            // remove
        assertiveFocusable : _assertiveFocusable, // remove
        arrived            : _arrived,            // remove
    ...restIndicatorProps} = props;
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // states:
        focusableState.class,
        interactableState.class,
    );
    
    
    
    // handlers:
    const handleFocus          = useMergeEvents(
        // preserves the original `onFocus`:
        props.onFocus,
        
        
        
        // states:
        focusableState.handleFocus,
    );
    const handleBlur           = useMergeEvents(
        // preserves the original `onBlur`:
        props.onBlur,
        
        
        
        // states:
        focusableState.handleBlur,
    );
    const handleMouseEnter     = useMergeEvents(
        // preserves the original `onMouseEnter`:
        props.onMouseEnter,
        
        
        
        // states:
        interactableState.handleMouseEnter,
    );
    const handleMouseLeave     = useMergeEvents(
        // preserves the original `onMouseLeave`:
        props.onMouseLeave,
        
        
        
        // states:
        interactableState.handleMouseLeave,
    );
    const handleKeyDown        = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // states:
        focusableState.handleKeyDown,
    );
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart`:
        props.onAnimationStart,
        
        
        
        // states:
        focusableState.handleAnimationStart,
        interactableState.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        focusableState.handleAnimationEnd,
        interactableState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restIndicatorProps}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            
            
            
            // Control props:
            {...{
                // accessibilities:
                tabIndex,
            }}
            
            
            
            // focusable props:
            {...focusableState.attributes}
            
            
            
            // handlers:
            onFocus          = {handleFocus         }
            onBlur           = {handleBlur          }
            onMouseEnter     = {handleMouseEnter    }
            onMouseLeave     = {handleMouseLeave    }
            onKeyDown        = {handleKeyDown       }
            onAnimationStart = {handleAnimationStart}
            onAnimationEnd   = {handleAnimationEnd  }
        />
    );
};
export {
    Control,
    Control as default,
}



export interface ControlComponentProps<TElement extends Element = HTMLElement>
{
    // components:
    controlComponent ?: React.ReactComponentElement<any, ControlProps<TElement>>
}
