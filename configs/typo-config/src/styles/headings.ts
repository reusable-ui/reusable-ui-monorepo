// Cssfn:
import {
    // Writes css in javascript:
    globalScope,
}                           from '@cssfn/core'          // Writes css in javascript.

// Utilities:
import {
    headingRule,
    headingLevelRule,
}                           from '../style-rules.js'
import {
    // Utilities:
    getDefaultLevels,
    
    
    
    // Regular headings:
    getTagHeadingSelectors,
    getClassHeadingSelectors,
}                           from '../style-selectors.js'
import {
    getHeadingFilter,
    
    
    
    getNonHeadingTextBlockFilter,
    getHeadingCompanionFilter,
}                           from '../style-filters.js'

// Configs:
import {
    headingVars,
}                           from '../configs/headings.js'



// Styles:

export default [
    globalScope({
        ...headingRule({
            elementFilter    : getHeadingFilter(),
            companionFilters : getHeadingCompanionFilter(),
            spacingFilters   : getNonHeadingTextBlockFilter(),
            elementVars      : headingVars,
        }),
        ...headingLevelRule({
            levels           : getDefaultLevels(),
            selectorFactory  : (level) => [
                getTagHeadingSelectors([level]),
                getClassHeadingSelectors([level]),
            ],
            elementVars      : headingVars,
        }),
    }),
];
