// cssfn:
import {
    // writes css in javascript:
    rule,
    variants,
    children,
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
import {
    // styles:
    usesResponsiveContainerGridLayout,
}                           from '@reusable-ui/container'       // a base container UI of Reusable-UI components

// internals:
import {
    // features:
    usesModalCard,
}                           from '../features/modalCard.js'
import {
    // configs:
    modalCards,
    cssModalCardConfig,
}                           from './config.js'



// styles:
export const onBackdropCardStylesChange = watchChanges(onBackdropStylesChange, cssModalCardConfig.onChange);

export const usesBackdropCardLayout = () => {
    // dependencies:
    
    // features:
    const {modalCardRule, modalCardVars} = usesModalCard(modalCards);
    
    
    
    return style({
        // features:
        ...modalCardRule(),
        
        
        
        // layouts:
        ...usesBackdropLayout(),
        ...usesResponsiveContainerGridLayout(), // applies responsive container functionality using css grid
        ...style({
            // layouts:
         // display         : 'grid', // already defined in `usesResponsiveContainerGridLayout()`. We use a grid for the layout, so we can align the <Card> both horizontally & vertically
            
            
            
            // positions:
            justifyItems    : modalCardVars.horzAlign,
            alignItems      : modalCardVars.vertAlign,
            
            
            
            // children:
            ...children('*', { // <CardDialog>
                // layouts:
                gridArea    : 'content',
            }),
            
            
            
            // customize:
            ...usesCssProps(modalCards), // apply config's cssProps
        }),
    });
};

export const usesBackdropCardVariants = () => {
    return style({
        // variants:
        ...usesBackdropVariants(),
        ...variants([
            rule(':not(.scrollable)', {
                // scrolls:
                // scroller at <ModalCard>'s layer
                overflow : 'auto', // enable horz & vert scrolling on <ModalBackdrop>
            }),
        ]),
    });
};

export const usesBackdropCardStates = usesBackdropStates;

export default () => style({
    // layouts:
    ...usesBackdropCardLayout(),
    
    // variants:
    ...usesBackdropCardVariants(),
    
    // states:
    ...usesBackdropCardStates(),
});
