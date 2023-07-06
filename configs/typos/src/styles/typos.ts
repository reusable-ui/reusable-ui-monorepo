// cssfn:
import {
    // writes css in javascript:
    atRoot,
    globalScope,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
}                           from '@cssfn/core'          // writes css in javascript

// internals:
import {
    // configs:
    typos,
}                           from '../configs/typos.js'



// styles:
export default () => [
    globalScope({
        ...atRoot({
            // customize:
            ...usesCssProps(typos),
        }),
    }),
];
