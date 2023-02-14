// cssfn:
import {
    // writes css in javascript:
    rule,
    globalScope,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
}                           from '@cssfn/core'          // writes css in javascript

// internals:
import {
    // configs:
    kbds,
}                           from '../configs/kbds.js'



// styles:
export default [
    globalScope({
        ...rule(['kbd', '.kbd'], {
            // layouts:
            display : 'inline',
            
            
            
            // customize:
            ...usesCssProps(kbds),
        }),
    }),
];
