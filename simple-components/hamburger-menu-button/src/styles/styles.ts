// cssfn:
import {
    // writes css in javascript:
    states,
    ifNthChild,
    children,
    style,
    
    
    
    // strongly typed of css variables:
    switchOf,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a typography management system:
    typos,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
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
    // configs:
    basics,
}                           from '@reusable-ui/basic'           // a base component
import {
    // styles:
    onButtonStylesChange,
    usesButtonLayout,
    usesButtonVariants,
    usesButtonStates,
}                           from '@reusable-ui/button'          // a base component

// internals:
import {
    // states:
    usesHamburgerable,
}                           from '../states/hamburgerable.js'
import {
    // configs:
    hamburgerMenuButtons,
    cssHamburgerMenuButtonConfig,
}                           from './config.js'



// defaults:
const _defaultMarkActiveOptions : MarkActiveOptions = { mild: null };



// styles:
export const svgElm = ':where(svg)' // zero degree specificity to be easily overwritten

export const onHamburgerMenuButtonStylesChange = watchChanges(onButtonStylesChange, cssHamburgerMenuButtonConfig.onChange);

export const usesHamburgerLayout = () => {
    // dependencies:
    
    // states:
    const {hamburgerableVars} = usesHamburgerable();
    
    
    
    return style({
        // appearances:
        overflow   : 'visible', // allows the <polyline> to overflow the <svg>
        
        
        
        // sizes:
        // fills the entire parent text's height:
        inlineSize : 'auto', // calculates the width by [blockSize * aspect_ratio]
        blockSize  : `calc(1em * ${switchOf(basics.lineHeight, typos.lineHeight)})`,
        
        
        
        // children:
        ...children('polyline', {
            // appearances:
            stroke        : 'currentColor', // set menu color as parent's font color
            strokeWidth   : '4',            // set menu thickness, 4 of 24 might enough
            strokeLinecap : 'square',       // set menu edges square
            
            
            
            // animations:
            transformOrigin : '50% 50%',
            ...ifNthChild(0, 1, {
                transform : hamburgerableVars.topTransform,
                anim      : hamburgerableVars.topAnim,
            }),
            ...ifNthChild(0, 2, {
                transform : hamburgerableVars.midTransform,
                anim      : hamburgerableVars.midAnim,
            }),
            ...ifNthChild(0, 3, {
                transform : hamburgerableVars.btmTransform,
                anim      : hamburgerableVars.btmAnim,
            }),
        }),
    });
};

export const usesHamburgerMenuButtonLayout = () => {
    return style({
        // layouts:
        ...usesButtonLayout(),
        ...style({
            // children:
            ...children(svgElm, {
                // layouts:
                ...usesHamburgerLayout(),
            }),
            
            
            
            // customize:
            ...usesCssProps(hamburgerMenuButtons), // apply config's cssProps
        }),
    });
};

export const usesHamburgerMenuButtonVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(hamburgerMenuButtons);
    
    
    
    return style({
        // variants:
        ...usesButtonVariants(),
        ...resizableRule(),
    });
};

export const usesHamburgerMenuButtonStates = () => {
    // dependencies:
    
    // states:
    const {hamburgerableRule} = usesHamburgerable(hamburgerMenuButtons);
    
    
    
    const markActiveRule = markActive(_defaultMarkActiveOptions);
    
    
    
    return style({
        // states:
        ...usesButtonStates(),
        ...hamburgerableRule(),
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
    ...usesHamburgerMenuButtonLayout(),
    
    // variants:
    ...usesHamburgerMenuButtonVariants(),
    
    // states:
    ...usesHamburgerMenuButtonStates(),
});
