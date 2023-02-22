// cssfn:
import {
    // writes css in javascript:
    style,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // border (stroke) stuff of UI:
    usesBorder,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// styles:
export const inheritBorderFromParent = () => {
    // dependencies:
    
    // features:
    const {borderVars} = usesBorder();
    
    
    
    // makes <ListItem>'s border & borderRadius inherit from <List>:
    return style({
        // borders:
        // undef border stroke:
        [borderVars.borderStyle           ] : null, // always same as <List>
        [borderVars.borderWidth           ] : null, // always same as <List>
        /*
        [borderVars.borderColorFn] // independent for each <ListItem>
        [borderVars.borderColor  ] // independent for each <ListItem>
        [borderVars.border       ] // independent for each <ListItem>
        */
        
        // undef border radius:
        [borderVars.borderStartStartRadius] : null, // always same as <List>
        [borderVars.borderStartEndRadius  ] : null, // always same as <List>
        [borderVars.borderEndStartRadius  ] : null, // always same as <List>
        [borderVars.borderEndEndRadius    ] : null, // always same as <List>
        /*
        [borderVars.borderRadius ] // independent for each <ListItem>
        */
    });
};
