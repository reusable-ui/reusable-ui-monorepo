// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                     // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'               // writes css in react hook

// reusable-ui utilities:
import {
    // hooks:
    useMergeEvents,
    useMergeClasses,
}                           from '@reusable-ui/hooks'               // react helper hooks

// reusable-ui states:
import {
    // hooks:
    useClickable,
}                           from '@reusable-ui/clickable'           // a capability of UI to be clicked

// reusable-ui components:
import {
    // styles:
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
    
    
    
    // react components:
    ActionControlProps,
}                           from '@reusable-ui/action-control'      // a base component
import {
    // styles:
    usesEditableControlLayout,
    usesEditableControlVariants,
    usesEditableControlStates,
    
    
    
    // react components:
    EditableControlProps,
    EditableControl,
}                           from '@reusable-ui/editable-control'    // a base component



// styles:
export const usesEditableActionControlLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesEditableControlLayout(),
            usesActionControlLayout(),
        ]),
    });
};
export const usesEditableActionControlVariants = () => {
    return style({
        ...imports([
            // variants:
            usesEditableControlVariants(),
            usesActionControlVariants(),
        ]),
    });
};
export const usesEditableActionControlStates = () => {
    return style({
        ...imports([
            // states:
            usesEditableControlStates(),
            usesActionControlStates(),
        ]),
    });
};

export const useEditableActionControlStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesEditableActionControlLayout(),
        
        // variants:
        usesEditableActionControlVariants(),
        
        // states:
        usesEditableActionControlStates(),
    ]),
}), { id: 'viprxwh99g' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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
        actionMouses : _actionMouses, // remove
        actionKeys   : _actionKeys,   // remove
        
        
        
        // handlers:
        onClick      : _onClick,      // remove
    ...restEditableControlProps} = props;
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // states:
        clickableState.class,
    );
    
    
    
    // handlers:
    const handleMouseDown    = useMergeEvents(
        // preserves the original `onMouseDown`:
        props.onMouseDown,
        
        
        
        // states:
        clickableState.handleMouseDown,
    );
    const handleKeyDown      = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // states:
        clickableState.handleKeyDown,
    );
    const handleClick        = clickableState.handleClick;
    const handleAnimationEnd = useMergeEvents(
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
            onMouseDown    = {handleMouseDown   }
            onKeyDown      = {handleKeyDown     }
            onClick        = {handleClick       }
            onAnimationEnd = {handleAnimationEnd}
        />
    );
};
export {
    EditableActionControl,
    EditableActionControl as default,
}
