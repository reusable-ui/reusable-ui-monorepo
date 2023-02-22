// cssfn:
import {
    // writes css in javascript:
    states,
    style,
    imports,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ifActive,
    ifPassive,
    MarkActiveOptions,
    markActive,
    
    
    
    // a capability of UI to be focused:
    ifFocus,
    
    
    
    // adds an interactive feel to a UI:
    ifArrive,
    
    
    
    // a capability of UI to be clicked:
    ifPress,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    usesActionControlLayout,
    usesActionControlVariants,
    usesActionControlStates,
}                           from '@reusable-ui/action-control'  // a base component

// internals:
import {
    // styles:
    inheritBorderFromParent,
}                           from './sharedStyles.js'



// defaults:
const _defaultMarkActiveOptions        : MarkActiveOptions  = { outlined: null, mild: null };



// styles:
export const usesListActionItemLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesActionControlLayout(),
            inheritBorderFromParent(),
        ]),
    });
};
export const usesListActionItemVariants = usesActionControlVariants;
export const usesListActionItemStates = () => {
    const markActiveRule = markActive(_defaultMarkActiveOptions);
    
    
    
    return style({
        ...imports([
            // states:
            usesActionControlStates(),
        ]),
        ...states([
            ifActive(markActiveRule),
            ifFocus(markActiveRule),
            ifArrive(markActiveRule),
            ifPress(markActiveRule),
        ]),
    });
};

export default () => style({
    // layouts:
    ...usesListActionItemLayout(),
    
    // variants:
    ...usesListActionItemVariants(),
    
    // states:
    ...usesListActionItemStates(),
});
