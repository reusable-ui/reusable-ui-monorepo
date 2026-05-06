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
    getKbdFilter,
    
    
    
    getTextInlineFilter,
}                           from '../style-filters.js'

// Configs:
import {
    kbdVars,
}                           from '../configs/kbds.js'



// Styles:

export default [
    globalScope({
        ...markRule({
            elementFilter    : getKbdFilter(),
            spacingFilters   : getTextInlineFilter(),
            elementVars      : kbdVars,
        }),
    }),
];
