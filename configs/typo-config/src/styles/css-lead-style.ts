// Cssfn:
import {
    // Writes css in javascript:
    globalScope,
}                           from '@cssfn/core'          // Writes css in javascript.

// Utilities:
import {
    paragraphRule,
}                           from '../style-internal-rules.js'
import {
    getLeadFilter,
    
    
    
    getTextBlockFilter,
}                           from '../style-internal-filters.js'

// Configs:
import {
    leadConfigVars,
}                           from '../configs/css-lead-config.js'



// Styles:

export default [
    globalScope({
        ...paragraphRule({
            elementFilter    : getLeadFilter(),
            spacingFilters   : getTextBlockFilter(),
            configVars       : leadConfigVars,
        }),
    }),
];
