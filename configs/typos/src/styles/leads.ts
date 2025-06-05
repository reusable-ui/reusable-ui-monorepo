// Cssfn:
import {
    // Writes css in javascript:
    globalScope,
}                           from '@cssfn/core'          // Writes css in javascript.

// Utilities:
import {
    paragraphRule,
}                           from '../style-rules.js'
import {
    getLeadFilter,
    
    
    
    getTextBlockFilter,
}                           from '../style-filters.js'

// Settings:
import {
    leadVars,
}                           from '../configs/leads.js'



// Styles:

export default [
    globalScope({
        ...paragraphRule({
            elementFilter    : getLeadFilter(),
            spacingFilters   : getTextBlockFilter(),
            elementVars      : leadVars,
        }),
    }),
];
