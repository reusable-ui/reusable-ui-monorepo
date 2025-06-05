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
    getParagraphFilter,
    
    
    
    getTextBlockFilter,
}                           from '../style-filters.js'

// Settings:
import {
    paragraphVars,
}                           from '../configs/paragraphs.js'



// Styles:

export default [
    globalScope({
        ...paragraphRule({
            elementFilter    : getParagraphFilter(),
            spacingFilters   : getTextBlockFilter(),
            elementVars      : paragraphVars,
        }),
    }),
];
