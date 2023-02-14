// cssfn:
import {
    // writes css in javascript:
    rule,
    globalScope,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
}                           from '@cssfn/core'          // writes css in javascript

// reusable-ui configs:
import {
    // configs:
    borders,
}                           from '@reusable-ui/borders' // a border (stroke) management system

// internals:
import {
    // configs:
    horzRules,
}                           from '../configs/horzRules.js'



// styles:
export default [
    globalScope({
        ...rule('hr', {
            // layouts:
            display               : 'block',
            
            
            
            // borders:
            border                : '0em',
            borderBlockStart      : borders.default,
            borderBlockStartColor : 'currentcolor',
            
            
            
            // customize:
            ...usesCssProps(horzRules),
        }),
    }),
];
