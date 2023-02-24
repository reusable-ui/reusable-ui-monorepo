// cssfn:
import {
    // writes css in javascript:
    rule,
    rules,
    children,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // size options of UI:
    usesResizable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onPopupStylesChange,
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
}                           from '@reusable-ui/popup'           // a base component

// internals:
import {
    // configs:
    tooltips,
    cssTooltipConfig,
}                           from './config.js'



// styles:
export const arrowElm = '.arrow' // one degree specificity to overwrite <Arrow> component

export const onTooltipStylesChange = watchChanges(onPopupStylesChange, cssTooltipConfig.onChange);

export const usesTooltipLayout = () => {
    return style({
        // layouts:
        ...usesPopupLayout(),
        ...style({
            // layouts:
            display : 'inline-block', // use inline block, so it takes the width & height as needed
            
            
            
            // sizes:
            justifySelf   : 'center',         // protect from stretching by flex/grid
            alignSelf     : 'center',         // protect from stretching by flex/grid
            flex          : [[0, 0, 'auto']], // protect from stretching by flex
            
            
            
            // children:
            ...children(arrowElm, {
                // layouts:
                content     : '""',
                display     : 'inline-block', // use inline block, so it takes the width & height as needed
                ...rule([':not(.overlay)&', '.nude&'], {
                    display : 'none', // the arrow is not supported when [not overlayed] or [nude=true]
                }),
                
                
                
                // positions:
                position    : 'absolute', // absolute position, so we can move the location easily
                
                
                
                // backgrounds:
                backg       : 'inherit', // copy the background color. for background image, it may look strange
                
                
                
                // borders:
                border      : 'inherit', // copy border style|width|color
                boxShadow   : 'inherit', // copy shadow
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(tooltips, 'arrow')), // apply config's cssProps starting with arrow***
            }),
            
            
            
            // customize:
            ...usesCssProps(tooltips), // apply config's cssProps
            ...rules([
                ...['top', 'bottom', 'left', 'right']
                .map((tooltipPos) =>
                    rule([
                        `.${tooltipPos}&`,
                        `.${tooltipPos}-start&`,
                        `.${tooltipPos}-end&`,
                    ], {
                        // overwrites propName = propName{tooltipPos}:
                        ...overwriteProps(tooltips, usesSuffixedProps(tooltips, tooltipPos)),
                    }),
                ),
            ]),
        }),
    });
};

export const usesTooltipVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(tooltips);
    
    
    
    return style({
        // variants:
        ...usesPopupVariants(),
        ...resizableRule(),
    });
};

export const usesTooltipStates = usesPopupStates;

export default () => style({
    // layouts:
    ...usesTooltipLayout(),
    
    // variants:
    ...usesTooltipVariants(),
    
    // states:
    ...usesTooltipStates(),
});
