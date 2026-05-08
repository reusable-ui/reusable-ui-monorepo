// Cssfn:
import {
    // Writes css in javascript:
    globalScope,
}                           from '@cssfn/core'          // Writes css in javascript.

// Utilities:
import {
    blockquoteRule,
}                           from '../style-rules.js'
import {
    getBlockquoteFilter,
    
    
    
    getTextBlockFilter,
}                           from '../style-filters.js'

// Configs:
import {
    blockquoteConfigVars,
}                           from '../configs/blockquotes.js'



// Styles:

export default [
    globalScope({
        ...blockquoteRule({
            elementFilter    : getBlockquoteFilter(),
            spacingFilters   : getTextBlockFilter(),
            configVars       : blockquoteConfigVars,
        }),
    }),
];
