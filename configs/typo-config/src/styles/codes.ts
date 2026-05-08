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
    getCodeFilter,
    
    
    
    getTextInlineFilter,
}                           from '../style-filters.js'

// Configs:
import {
    codeConfigVars,
}                           from '../configs/codes.js'



// Styles:

export default [
    globalScope({
        ...markRule({
            elementFilter    : getCodeFilter(),
            spacingFilters   : getTextInlineFilter(),
            configVars       : codeConfigVars,
        }),
    }),
];
