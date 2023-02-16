// cssfn:
import {
    // writes css in javascript:
    style,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
    memoizeStyle,
}                           from '@cssfn/core'                      // writes css in javascript

// reusable-ui components:
import {
    // styles:
    onActionControlStylesChange,
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
}                           from '@reusable-ui/action-control'      // a base component
import {
    // styles:
    onEditableControlStylesChange,
    usesEditableControlLayout,
    usesEditableControlVariants,
    usesEditableControlStates,
}                           from '@reusable-ui/editable-control'    // a base component



// styles:
export const onEditableActionControlStylesChange = watchChanges(onEditableControlStylesChange, onActionControlStylesChange);

export const usesEditableActionControlLayout = memoizeStyle(() => {
    return style({
        // layouts:
        ...usesEditableControlLayout(),
        ...usesActionControlLayout(),
    });
}, onEditableActionControlStylesChange);

export const usesEditableActionControlVariants = memoizeStyle(() => {
    return style({
        // variants:
        ...usesEditableControlVariants(),
        ...usesActionControlVariants(),
    });
}, onEditableActionControlStylesChange);

export const usesEditableActionControlStates = memoizeStyle(() => {
    return style({
        // states:
        ...usesEditableControlStates(),
        ...usesActionControlStates(),
    });
}, onEditableActionControlStylesChange);

export default memoizeStyle(() => style({
    // layouts:
    ...usesEditableActionControlLayout(),
    
    // variants:
    ...usesEditableActionControlVariants(),
    
    // states:
    ...usesEditableActionControlStates(),
}), onEditableActionControlStylesChange);
