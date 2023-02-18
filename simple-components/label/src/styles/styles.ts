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
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // size options of UI:
    usesResizable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    usesBasicLayout,
    usesBasicVariants,
}                           from '@reusable-ui/basic'           // a base component
import {
    // styles:
    usesContentBasicLayout,
    usesContentBasicVariants,
}                           from '@reusable-ui/content'         // a neighbor component

// internals:
import {
    // configs:
    labels,
    cssLabelConfig,
}                           from './config.js'



// styles:
export const onLabelStylesChange = watchChanges(cssLabelConfig.onChange);

export const usesLabelLayout = memoizeStyle(() => {
    return style({
        // layouts:
        ...usesBasicLayout(),
        ...style({
            // layouts:
            display        : 'inline-flex',  // use inline flexbox, so it takes the width & height as we set
            flexDirection  : 'row',          // items are stacked horizontally
            justifyContent : 'center',       // center items (text, icon, etc) horizontally
            alignItems     : 'center',       // center items (text, icon, etc) vertically
            flexWrap       : 'wrap',         // allows the items (text, icon, etc) to wrap to the next row if no sufficient width available
            
            
            
            // positions:
            verticalAlign  : 'baseline',     // <Label>'s text should be aligned with sibling text, so the <Label> behave like <span> wrapper
            
            
            
            // typos:
            textAlign      : 'start',        // flow to the document's writing flow
            
            
            
            // customize:
            ...usesCssProps(labels),         // apply config's cssProps
        }),
    });
}, onLabelStylesChange);

export const usesLabelVariants = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(labels);
    
    
    
    return style({
        // variants:
        /* write specific labelStyle first, so it can be overriden by `.nude`, `.mild`, `.outlined`, etc */
        ...variants([
            rule('.content', { // content
                // layouts:
                ...usesContentBasicLayout(),
                
                // variants:
                ...usesContentBasicVariants(),
            }),
        ]),
        ...usesBasicVariants(),
        ...resizableRule(),
    });
}, onLabelStylesChange);

export default memoizeStyle(() => style({
    // layouts:
    ...usesLabelLayout(),
    
    // variants:
    ...usesLabelVariants(),
}), onLabelStylesChange);
