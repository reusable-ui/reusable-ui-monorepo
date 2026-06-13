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
    getCodeFilter,
    
    
    
    getTextInlineFilter,
}                           from '../style-internal-filters.js'

// Configs:
import {
    codeConfigVars,
}                           from '../configs/css-code-config.js'



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
