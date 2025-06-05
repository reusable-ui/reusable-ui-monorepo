// Cssfn:
import {
    // Writes css in javascript:
    globalScope,
}                           from '@cssfn/core'          // Writes css in javascript.

// Utilities:
import {
    markRule,
}                           from '../style-rules.js'
import {
    getMarkFilter,
    
    
    
    getTextInlineFilter,
}                           from '../style-filters.js'

// Settings:
import {
    markVars,
}                           from '../configs/marks.js'



// Styles:

export default [
    globalScope({
        ...markRule({
            elementFilter    : getMarkFilter(),
            spacingFilters   : getTextInlineFilter(),
            elementVars      : markVars,
        }),
    }),
];
