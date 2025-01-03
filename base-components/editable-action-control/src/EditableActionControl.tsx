// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // checks if a certain css feature is supported by the running browser:
    supportsHasPseudoClass,
}                           from '@cssfn/core'                      // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'               // writes css in react hook

// reusable-ui core:
import {
    // a collection of TypeScript type utilities, assertions, and validations for ensuring type safety in reusable UI components:
    type NoForeignProps,
    
    
    
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
, {
    id      : 'viprxwh99g',             // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
    lazyCsr : supportsHasPseudoClass(), // dealing with browsers that don't support the :has() selector
});



// react components:
export interface EditableActionControlProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        EditableControlProps<TElement>,
        Omit<ActionControlProps<TElement>, 'onChange'>
{
}
const EditableActionControl = <TElement extends Element = HTMLElement>(props: EditableActionControlProps<TElement>): JSX.Element|null => {
    // props:
    const {
        // classes:
        stateClasses,
        
        
        
        // states:
        pressed,       // take to `useClickable`
        
        
        
        // behaviors:
        actionMouses,  // take to `useClickable`
        actionTouches, // take to `useClickable`
        actionKeys,    // take to `useClickable`
        releaseDelay,  // take to `useClickable`
        
        
        
        // handlers:
        onMouseDown,
        onTouchStart,
        onKeyDown,
        onAnimationStart,
        onAnimationEnd,
        
        
        
        // other props:
        ...restEditableActionControlProps
    } = props;
    
    
    
    // styles:
    const styles         = useEditableActionControlStyleSheet();
    
    
    
    // states:
    const clickableState = useClickable<TElement>({
        // states:
        pressed,
        
        
        
        // behaviors:
        actionMouses,
        actionTouches,
        actionKeys,
        releaseDelay,
    });
    
    
    
    // classes:
    const mergedStateClasses = useMergeClasses(
        // preserves the original `stateClasses` from `props`:
        stateClasses,
        
        
        
        // states:
        clickableState.class,
    );
    
    
    
    // handlers:
    const handleMouseDown      = useMergeEvents(
        // preserves the original `onMouseDown` from `props`:
        onMouseDown,
        
        
        
        // states:
        clickableState.handleMouseDown,
    );
    const handleTouchStart     = useMergeEvents(
        // preserves the original `onTouchStart` from `props`:
        onTouchStart,
        
        
        
        // states:
        clickableState.handleTouchStart,
    );
    const handleKeyDown        = useMergeEvents(
        // preserves the original `onKeyDown` from `props`:
        onKeyDown,
        
        
        
        // states:
        clickableState.handleKeyDown,
    );
    // const handleClick          = clickableState.handleClick; // not a <button>, no need to handle `onClick` for [space] & [enter] key
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart` from `props`:
        onAnimationStart,
        
        
        
        // states:
        clickableState.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd` from `props`:
        onAnimationEnd,
        
        
        
        // states:
        clickableState.handleAnimationEnd,
    );
    
    
    
    // default props:
    const {
        // classes:
        mainClass = styles.main,
        
        
        
        // other props:
        ...restEditableControlProps
    } = restEditableActionControlProps satisfies NoForeignProps<typeof restEditableActionControlProps, EditableControlProps<TElement>>;
    
    
    
    // jsx:
    return (
        <EditableControl<TElement>
            // other props:
            {...restEditableControlProps}
            
            
            
            // classes:
            mainClass={mainClass}
            stateClasses={mergedStateClasses}
            
            
            
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
    EditableActionControl,            // named export for readibility
    EditableActionControl as default, // default export to support React.lazy
}
