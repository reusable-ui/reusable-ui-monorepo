// cssfn:
import {
    // writes css in javascript:
    rule,
    ifFirstChild,
    ifLastChild,
    children,
    globalScope,
    
    
    
    // strongly typed of css variables:
    switchOf,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui variants:
import {
    // hooks:
    usesThemeable,
}                           from '@reusable-ui/themeable'       // color options of UI

// internals:
import {
    // configs:
    blockquotes,
}                           from '../configs/blockquotes.js'



// styles:
export default () => {
    // dependencies:
    const {themeableVars} = usesThemeable();
    
    
    
    return [
        globalScope({
            ...rule(['blockquote', '.blockquote'], {
                // positions:
                position    : 'relative', // supports for `::before`
                
                
                
                // layouts:
                display     : 'block',
                
                
                
                // borders:
                borderColor : switchOf(
                    themeableVars.foregOutlined, // first  priority
                    'currentColor',              // second priority
                ),
                
                
                
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
                    foreg            : switchOf(
                        themeableVars.foregOutlined, // first  priority
                        'currentColor',              // second priority
                    ),
                    
                    
                    
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
