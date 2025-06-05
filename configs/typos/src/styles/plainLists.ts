// Cssfn:
import {
    // Writes css in javascript:
    globalScope,
}                           from '@cssfn/core'          // Writes css in javascript.

// Utilities:
import {
    plainListRule,
}                           from '../style-rules.js'
import {
    getPlainListFilter,
    
    
    
    getTextBlockFilter,
}                           from '../style-filters.js'

// Settings:
import {
    plainListVars,
}                           from '../configs/plainLists.js'



// Styles:

export default [
    globalScope({
        ...plainListRule({
            elementFilter    : getPlainListFilter(),
            spacingFilters   : getTextBlockFilter(),
            elementVars      : plainListVars,
        }),
    }),
];
