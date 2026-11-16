// Cssfn:
import {
    // Writes css in javascript:
    globalScope,
}                           from '@cssfn/core'          // Writes css in javascript.

// Utilities:
import {
    markRule,
}                           from '../style-internal-rules.js'
import {
    getMarkFilter,
    
    
    
    getTextInlineFilter,
}                           from '../style-internal-filters.js'

// Configs:
import {
    markVars,
}                           from '../configs/css-mark-config.js'



// Styles:

export default [
    globalScope({
        ...markRule({
            elementFilter    : getMarkFilter(),
            spacingFilters   : getTextInlineFilter(),
            configVars       : markVars,
        }),
    }),
];
