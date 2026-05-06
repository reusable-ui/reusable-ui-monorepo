// Cssfn:
import {
    // Writes css in javascript:
    atRoot,
    globalScope,
    
    
    
    // Reads/writes css variables configuration:
    usesCssProps,
}                           from '@cssfn/core'          // Writes css in javascript.

// Configs:
import {
    typoVars,
}                           from '../configs/typography.js'



// Styles:

export default [
    globalScope({
        ...atRoot({
            // Configs:
            ...usesCssProps(typoVars),
        }),
    }),
];
