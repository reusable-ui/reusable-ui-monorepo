// cssfn:
import {
    // writes css in javascript:
    rule,
    ifFirstChild,
    ifLastChild,
    globalScope,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
}                           from '@cssfn/core'          // writes css in javascript

// internals:
import {
    // configs:
    leads,
}                           from '../configs/leads.js'



// styles:
export default () => [
    globalScope({
        ...rule('.lead', {
            // layouts:
            display : 'block',
            
            
            
            // spacings:
            ...ifFirstChild({
                marginBlockStart : 0, // kill the top_margin at the first lead
            }),
            ...ifLastChild({
                marginBlockEnd   : 0, // kill the bottom_margin at the last lead
            }),
            
            
            
            // customize:
            ...usesCssProps(leads),
        }),
    }),
];
