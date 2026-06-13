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
    getKbdFilter,
    
    
    
    getTextInlineFilter,
}                           from '../style-internal-filters.js'

// Configs:
import {
    kbdConfigVars,
}                           from '../configs/css-kbd-config.js'



// Styles:

export default [
    globalScope({
        ...markRule({
            elementFilter    : getKbdFilter(),
            spacingFilters   : getTextInlineFilter(),
            configVars       : kbdConfigVars,
        }),
    }),
];
