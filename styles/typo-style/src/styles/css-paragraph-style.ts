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
    getParagraphFilter,
    
    
    
    getTextBlockFilter,
}                           from '../style-internal-filters.js'

// Configs:
import {
    paragraphVars,
}                           from '../configs/css-paragraph-config.js'



// Styles:

export default [
    globalScope({
        ...paragraphRule({
            elementFilter    : getParagraphFilter(),
            spacingFilters   : getTextBlockFilter(),
            configVars       : paragraphVars,
        }),
    }),
];
