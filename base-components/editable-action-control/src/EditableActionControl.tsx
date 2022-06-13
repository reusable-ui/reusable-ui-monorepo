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
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'               // writes css in react hook

// reusable-ui:
import {
    // hooks:
    useMergeEvents,
    useMergeClasses,
}                           from '@reusable-ui/hooks'               // react helper hooks
import {
    // hooks:
    usePropEnabled,
}                           from '@reusable-ui/accessibilities'     // an accessibility management system
import {
    // hooks:
    usePressReleaseState,
    
    
    
    // styles:
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
    
    
    
    // handlers:
    handleClickDisabled,
    
    
    
    // react components:
    ActionControlProps,
}                           from '@reusable-ui/action-control'      // a base component
import {
    // hooks:
    EditableControlElement,
    
    
    
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

export const useEditableActionControlStyleSheet = createUseStyleSheet(() => ({
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
export interface EditableActionControlProps<TElement extends EditableControlElement = EditableControlElement>
    extends
        // bases:
        EditableControlProps<TElement>,
        Omit<ActionControlProps<TElement>, 'onChange'>
{
}
const EditableActionControl = <TElement extends EditableControlElement = EditableControlElement>(props: EditableActionControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet        = useEditableActionControlStyleSheet();
    
    
    
    // states:
    const pressReleaseState = usePressReleaseState(props);
    
    
    
    // fn props:
    const propEnabled       = usePropEnabled(props);
    
    
    
    // rest props:
    const {
        // remove states props:
        
        // accessibilities:
        pressed : _pressed,
        
        
        
        // behaviors:
        actionMouses : _actionMouses,
        actionKeys   : _actionKeys,
    ...restEditableControlProps} = props;
    
    
    
    // classes:
    const stateClasses = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // accessibilities:
        pressReleaseState.class,
    );
    
    
    
    // handlers:
    const handleMouseDown    = useMergeEvents(
        // preserves the original `onMouseDown`:
        props.onMouseDown,
        
        
        
        // states:
        
        // accessibilities:
        pressReleaseState.handleMouseDown,
    );
    const handleKeyDown      = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // states:
        
        // accessibilities:
        pressReleaseState.handleKeyDown,
    );
    const handleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        
        // accessibilities:
        pressReleaseState.handleAnimationEnd,
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
            onClick        = {propEnabled ? props.onClick : handleClickDisabled}
            onMouseDown    = {handleMouseDown   }
            onKeyDown      = {handleKeyDown     }
            onAnimationEnd = {handleAnimationEnd}
        />
    );
};
export {
    EditableActionControl,
    EditableActionControl as default,
}
