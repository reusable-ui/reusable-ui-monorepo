// Cssfn:
import {
    // Writes css in javascript:
    globalScope,
}                           from '@cssfn/core'          // Writes css in javascript.

// Utilities:
import {
    horzSeparatorRule,
}                           from '../style-internal-rules.js'
import {
    getHorzSeparatorFilter,
    
    
    
    getTextBlockFilter,
}                           from '../style-internal-filters.js'

// Configs:
import {
    horzSeparatorConfigVars,
}                           from '../configs/css-horz-separator-config.js'



// Styles:

export default [
    globalScope({
        ...horzSeparatorRule({
            elementFilter    : getHorzSeparatorFilter(),
            spacingFilters   : getTextBlockFilter(),
            configVars       : horzSeparatorConfigVars,
        }),
    }),
];
