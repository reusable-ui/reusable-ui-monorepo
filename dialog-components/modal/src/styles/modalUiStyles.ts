// cssfn:
import {
    // writes css in javascript:
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // removes browser's default stylesheet:
    stripoutFocusableElement,
    
    
    
    // animation stuff of UI:
    usesAnimation,
    
    
    
    // a capability of UI to highlight itself to attract user's attention:
    usesExcitable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// internals:
import {
    // configs:
    modals,
    cssModalConfig,
}                           from './config.js'



// styles:
export const onModalUiStylesChange = watchChanges(cssModalConfig.onChange);

export const usesModalUiLayout = () => {
    // dependencies:
    
    // features:
    const {animationRule, animationVars} = usesAnimation();
    
    
    
    return style({
        // resets:
        ...stripoutFocusableElement(), // clear browser's default styles
        
        
        
        // layouts:
        ...style({
            // customize:
            ...usesCssProps(usesPrefixedProps(modals, 'modalUi')), // apply config's cssProps starting with modalUi***
            
            
            
            // animations:
            anim : animationVars.anim,
        }),
        
        
        
        // features:
        ...animationRule(), // must be placed at the last
    });
};

export const usesModalUiStates = () => {
    // dependencies:
    
    // states:
    const {excitableRule} = usesExcitable(
        usesPrefixedProps(modals, 'modalUi') as any, // fetch config's cssProps starting with modalUi***
    );
    
    
    
    return style({
        // states:
        ...excitableRule(),
    });
};

export default () => style({
    // layouts:
    ...usesModalUiLayout(),
    
    // states:
    ...usesModalUiStates(),
});
