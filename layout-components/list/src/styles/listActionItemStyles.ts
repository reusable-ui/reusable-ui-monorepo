// cssfn:
import {
    // writes css in javascript:
    states,
    style,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ifActive,
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
const _defaultMarkActiveOptions : MarkActiveOptions = { outlined: null, mild: null };



// styles:
export const usesListActionItemLayout = () => {
    // dependencies:
    
    // features:
    const {borderVars} = usesBorder();
    
    
    
    return style({
        // layouts:
        ...usesActionControlLayout(),
        ...inheritBorderFromParent(),
        
        
        
        // borders:
        /*
            A fix of separator (border) color of <AccordionHeader> & <AccordionBody> when `outlined={true}`.
            When <AccordionHeader active={true}>, the borderColor overriden to <AccordionHeader>'s theme color.
            It should be <List>'s theme color, regradless of <AccordionHeader>'s theme color.
            
            When <List listStyle='button'>, the borderColor will be re-overriden by variant `.button` because
            the variant has a higher specificity.
        */
        ...style({
            [borderVars.borderColor]: 'inherit',
        }),
    });
};

export const usesListActionItemVariants = usesActionControlVariants;

export const usesListActionItemStates = () => {
    const markActiveRule = markActive(_defaultMarkActiveOptions);
    
    
    
    return style({
        // states:
        ...usesActionControlStates(),
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
