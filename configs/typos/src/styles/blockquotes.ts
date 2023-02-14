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
    blockquotes,
}                           from '../configs/blockquotes.js'



// styles:
export default [
    globalScope({
        ...rule(['blockquote', '.blockquote'], {
            // layouts:
            display : 'block',
            
            
            
            // spacings:
            ...ifFirstChild({
                marginBlockStart : 0, // kill the top_margin at the first blockquote
            }),
            ...ifLastChild({
                marginBlockEnd   : 0, // kill the bottom_margin at the last blockquote
            }),
            
            
            
            // customize:
            ...usesCssProps(blockquotes),
        }),
    }),
];
