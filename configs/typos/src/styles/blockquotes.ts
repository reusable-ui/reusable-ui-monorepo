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
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui variants:
import {
    // hooks:
    usesBackground,
}                           from '@reusable-ui/background'      // background stuff of UI

// internals:
import {
    // configs:
    blockquotes,
}                           from '../configs/blockquotes.js'



// styles:
export default () => {
    // dependencies:
    
    // features:
    const {backgroundVars} = usesBackground();
    
    
    
    return [
        globalScope({
            ...rule(['blockquote', '.blockquote'], {
                // layouts:
                // positions:
                position    : 'relative', // supports for `::before`
                
                
                
                // layouts:
                display     : 'block',
                
                
                
                // borders:
                borderColor : backgroundVars.altBackgColor,
                
                
                
                // spacings:
                ...ifFirstChild({
                    marginBlockStart : 0, // kill the top_margin at the first blockquote
                }),
                ...ifLastChild({
                    marginBlockEnd   : 0, // kill the bottom_margin at the last blockquote
                }),
                
                
                
                // children:
                ...children('::before', {
                    // positions:
                    position         : 'absolute',
                    
                    
                    
                    // layouts:
                    display          : 'inline',
                    
                    
                    
                    // foregrounds:
                    foreg            : backgroundVars.altBackgColor,
                    
                    
                    
                    // spacings:
                    paddingInline    : 'calc(1em / 3)',
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(blockquotes, 'quote')), // apply config's cssProps starting with quote***
                }),
                
                
                
                // customize:
                ...usesCssProps(blockquotes),
            }),
        }),
    ];
};
