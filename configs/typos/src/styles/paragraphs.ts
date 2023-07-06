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
    paragraphs,
}                           from '../configs/paragraphs.js'



// styles:
export default () => [
    globalScope({
        ...rule(['p', '.p'], {
            ...rule(`:not(:where(${[1,2,3,4,5,6].map((level) => `.display-${level}`).join(', ')}, .lead))`, {
                // layouts:
                display : 'block',
                
                
                
                // spacings:
                ...ifFirstChild({
                    marginBlockStart : 0, // kill the top_margin at the first paragraph
                }),
                ...ifLastChild({
                    marginBlockEnd   : 0, // kill the bottom_margin at the last paragraph
                }),
                
                
                
                // customize:
                ...usesCssProps(paragraphs),
            }, { specificityWeight: 0 }),
        }),
    }),
];
