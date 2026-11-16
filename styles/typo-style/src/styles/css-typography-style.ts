// Cssfn:
import {
    // Writes css in javascript:
    atRoot,
    globalScope,
    
    
    
    // Reads/writes css variables configuration:
    usesCssProps,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui configs:
import {
    typoConfigVars,
}                           from '@reusable-ui/typo-config'         // Configures the typography system (font sizes, font families, font weights, line heights, and text wrapping rules) across all UI components.



// Styles:

export default [
    globalScope({
        ...atRoot({
            // Configs:
            ...usesCssProps(typoConfigVars),
        }),
    }),
];
