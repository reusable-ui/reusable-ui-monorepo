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
    marks,
}                           from '../configs/marks.js'



// styles:
export default () => [
    globalScope({
        ...rule(['mark', '.mark'], {
            // layouts:
            display : 'inline',
            
            
            
            // customize:
            ...usesCssProps(marks),
        }),
    }),
];
