// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'               // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useMergeEvents,
    useMergeClasses,
    
    
    
    // a capability of UI to be clicked:
    useClickable,
}                           from '@reusable-ui/core'                // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    ActionControlProps,
}                           from '@reusable-ui/action-control'      // a base component
import {
    // react components:
    EditableControlProps,
    EditableControl,
}                           from '@reusable-ui/editable-control'    // a base component



// styles:
export const useEditableActionControlStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'viprxwh99g' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface EditableActionControlProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        EditableControlProps<TElement>,
        Omit<ActionControlProps<TElement>, 'onChange'>
{
}
const EditableActionControl = <TElement extends Element = HTMLElement>(props: EditableActionControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet     = useEditableActionControlStyleSheet();
    
    
    
    // states:
    const clickableState = useClickable<TElement>(props);
    
    
    
    // rest props:
    const {
        // states:
        pressed      : _pressed,      // remove
        
        
        
        // behaviors:
        actionMouses  : _actionMouses,  // remove
        actionTouches : _actionTouches, // remove
        actionKeys    : _actionKeys,    // remove
        releaseDelay  : _releaseDelay,  // remove
    ...restEditableControlProps} = props;
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // states:
        clickableState.class,
    );
    
    
    
    // handlers:
    const handleMouseDown      = useMergeEvents(
        // preserves the original `onMouseDown`:
        props.onMouseDown,
        
        
        
        // states:
        clickableState.handleMouseDown,
    );
    const handleTouchStart     = useMergeEvents(
        // preserves the original `onTouchStart`:
        props.onTouchStart,
        
        
        
        // states:
        clickableState.handleTouchStart,
    );
    const handleKeyDown        = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // states:
        clickableState.handleKeyDown,
    );
    // const handleClick          = clickableState.handleClick; // not a <button>, no need to handle `onClick` for [space] & [enter] key
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart`:
        props.onAnimationStart,
        
        
        
        // states:
        clickableState.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        clickableState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    return (
        <EditableControl<TElement>
            // other props:
            {...restEditableControlProps}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            stateClasses={stateClasses}
            
            
            
            // handlers:
            onMouseDown      = {handleMouseDown     }
            onTouchStart     = {handleTouchStart    }
            onKeyDown        = {handleKeyDown       }
            // onClick          = {handleClick         } // not a <button>, no need to handle `onClick` for [space] & [enter] key
            onAnimationStart = {handleAnimationStart}
            onAnimationEnd   = {handleAnimationEnd  }
        />
    );
};
export {
    EditableActionControl,
    EditableActionControl as default,
}
