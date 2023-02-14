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
    codes,
}                           from '../configs/codes.js'



// styles:
export default [
    globalScope({
        ...rule(['code', '.code', 'var', '.var', 'samp', '.samp'], {
            // layouts:
            display : 'inline',
            
            
            
            // customize:
            ...usesCssProps(codes),
        }),
    }),
];
