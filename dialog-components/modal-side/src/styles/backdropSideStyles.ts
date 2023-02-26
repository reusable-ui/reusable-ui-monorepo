// cssfn:
import {
    // writes css in javascript:
    rule,
    variants,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui components:
import {
    // styles:
    onBackdropStylesChange,
    usesBackdropLayout,
    usesBackdropVariants,
    usesBackdropStates,
}                           from '@reusable-ui/modal'           // a base component

// internals:
import {
    // configs:
    modalSides,
    cssModalSideConfig,
}                           from './config.js'



// styles:
export const onBackdropSideStylesChange = watchChanges(onBackdropStylesChange, cssModalSideConfig.onChange);

export const usesBackdropSideLayout = () => {
    return style({
        // layouts:
        ...usesBackdropLayout(),
        ...style({
            // layouts:
            display         : 'grid', // use a grid for the layout, so we can align the <Card> both horizontally & vertically
            
            
            
            // positions:
         // justifyItems    : 'start',   // align left horizontally // already defined in variant `.(inline|block)(Start|End)`
         // alignItems      : 'stretch', // stretch    vertically   // already defined in variant `.(inline|block)(Start|End)`
            
            
            
            // customize:
            ...usesCssProps(modalSides), // apply config's cssProps
        }),
    });
};

export const usesBackdropSideVariants = () => {
    return style({
        // variants:
        ...usesBackdropVariants(),
        ...variants([
            rule('.blockStart', {
                // layouts:
                
                // child default sizes:
                justifyItems : 'stretch', // stretch   horizontally
                alignItems   : 'start',   // align top vertically
            }),
            rule('.blockEnd', {
                // layouts:
                
                // child default sizes:
                justifyItems : 'stretch', // stretch   horizontally
                alignItems   : 'end',     // align top vertically
            }),
            rule('.inlineStart', {
                // layouts:
                
                // child default sizes:
                justifyItems : 'start',   // align left horizontally
                alignItems   : 'stretch', // stretch    vertically
            }),
            rule('.inlineEnd', {
                // layouts:
                
                // child default sizes:
                justifyItems : 'end',     // align left horizontally
                alignItems   : 'stretch', // stretch    vertically
            }),
        ]),
    });
};

export const usesBackdropSideStates = usesBackdropStates;

export default () => style({
    // layouts:
    ...usesBackdropSideLayout(),
    
    // variants:
    ...usesBackdropSideVariants(),
    
    // states:
    ...usesBackdropSideStates(),
});
