// cssfn:
import {
    // writes css in javascript:
    rule,
    ifFirstChild,
    ifLastChild,
    children,
    globalScope,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/core'          // writes css in javascript

// internals:
import {
    // configs:
    plainLists,
}                           from '../configs/plainLists.js'



// styles:
export default () => [
    globalScope({
        ...rule(['.plainList'], {
            // layouts:
            display : 'block',
            
            
            
            // appearances:
            ...rule(['ol', '.ol'], {
                // customize:
                ...usesCssProps(usesPrefixedProps(plainLists, 'ol')), // apply config's cssProps starting with ol***
            }),
            ...rule(['ul', '.ul'], {
                // customize:
                ...usesCssProps(usesPrefixedProps(plainLists, 'ul')), // apply config's cssProps starting with ul***
            }),
            
            
            
            // spacings:
            ...ifFirstChild({
                marginBlockStart : 0, // kill the top_margin at the first plainList
            }),
            ...ifLastChild({
                marginBlockEnd   : 0, // kill the bottom_margin at the last plainList
            }),
            
            
            
            // children:
            ...children(':nth-child(n)', {
                // layouts:
                display : 'list-item',
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(plainLists, 'li')), // apply config's cssProps starting with li***
            }),
            
            
            
            // customize:
            ...usesCssProps(plainLists),
        }),
    }),
];
