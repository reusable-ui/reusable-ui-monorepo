// Cssfn:
import {
    // Writes css in javascript:
    globalScope,
}                           from '@cssfn/core'          // Writes css in javascript.

// Utilities:
import {
    vertSeparatorRule,
}                           from '../style-rules.js'
import {
    getVertSeparatorFilter,
}                           from '../style-filters.js'

// Configs:
import {
    vertSeparatorConfigVars,
}                           from '../configs/css-vert-separator-config.js'



// Styles:

export default [
    globalScope({
        ...vertSeparatorRule({
            elementFilter    : getVertSeparatorFilter(),
            spacingFilters   : [], // No spacing applied when follows/precedes another typography element.
            configVars       : vertSeparatorConfigVars,
        }),
    }),
];
