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
    typoConfigVars,
}                           from '../configs/css-config.js'



// Styles:

export default [
    globalScope({
        ...atRoot({
            // Configs:
            ...usesCssProps(typoConfigVars),
        }),
    }),
];
