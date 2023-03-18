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
                
                
                
                // sizes:
                /*
                    A (partial) fix on some mobile:
                    The dialog may overflow the <Backdrop>'s padding.
                    To fix this, limits the maxInlineSize & maxBlockSize
                */
                maxInlineSize : '100%', // works!
                maxBlockSize  : '100%', // doesn't work, TODO: to be fixed soon
            }),
            
            
            
            // customize:
            ...usesCssProps(modalCards), // apply config's cssProps
        }),
        
        
        
        // features:
        ...modalCardRule(), // must be placed at the last
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
