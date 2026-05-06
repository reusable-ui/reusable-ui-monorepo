// Cssfn:
import {
    // Writes css in javascript:
    rule,
    globalScope,
    
    
    
    // Reads/writes css variables configuration:
    usesCssProps,
}                           from '@cssfn/core'          // Writes css in javascript.

// Configs:
import {
    secondaryVars,
}                           from '../configs/secondaries.js'



// Styles:

export default [
    globalScope({
        ...rule(['small', '.secondary', '.txt-sec'], {
            // Configs:
            ...usesCssProps(secondaryVars),
        }),
    }),
];
