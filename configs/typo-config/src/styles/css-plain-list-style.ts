// Cssfn:
import {
    // Writes css in javascript:
    globalScope,
}                           from '@cssfn/core'          // Writes css in javascript.

// Utilities:
import {
    plainListRule,
}                           from '../style-internal-rules.js'
import {
    getPlainListFilter,
    
    
    
    getTextBlockFilter,
}                           from '../style-internal-filters.js'

// Configs:
import {
    plainListConfigVars,
}                           from '../configs/css-plain-list-config.js'



// Styles:

export default [
    globalScope({
        ...plainListRule({
            elementFilter    : getPlainListFilter(),
            spacingFilters   : getTextBlockFilter(),
            configVars       : plainListConfigVars,
        }),
    }),
];
