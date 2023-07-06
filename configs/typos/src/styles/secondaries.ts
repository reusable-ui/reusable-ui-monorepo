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
    secondaries,
}                           from '../configs/secondaries.js'



// styles:
export default () => [
    globalScope({
        ...rule(['small', '.txt-sec'], {
            // customize:
            ...usesCssProps(secondaries),
        }),
    }),
];
