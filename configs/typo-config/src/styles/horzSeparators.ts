// Cssfn:
import {
    // Writes css in javascript:
    globalScope,
}                           from '@cssfn/core'          // Writes css in javascript.

// Utilities:
import {
    horzSeparatorRule,
}                           from '../style-rules.js'
import {
    getHorzSeparatorFilter,
    
    
    
    getTextBlockFilter,
}                           from '../style-filters.js'

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
