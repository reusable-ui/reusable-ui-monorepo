// Cssfn:
import {
    // Writes css in javascript:
    globalScope,
}                           from '@cssfn/core'          // Writes css in javascript.

// Utilities:
import {
    headingRule,
    headingLevelRule,
}                           from '../style-internal-rules.js'
import {
    // Utilities:
    getDefaultLevels,
    
    
    
    // Regular headings:
    getTagHeadingSelectors,
    getClassHeadingSelectors,
}                           from '../style-internal-selectors.js'
import {
    getHeadingFilter,
    
    
    
    getNonHeadingTextBlockFilter,
    getHeadingCompanionFilter,
}                           from '../style-internal-filters.js'

// Configs:
import {
    headingConfigVars,
}                           from '../configs/css-heading-config.js'



// Styles:

export default [
    globalScope({
        ...headingRule({
            elementFilter    : getHeadingFilter(),
            companionFilters : getHeadingCompanionFilter(),
            spacingFilters   : getNonHeadingTextBlockFilter(),
            configVars       : headingConfigVars,
        }),
        ...headingLevelRule({
            levels           : getDefaultLevels(),
            selectorFactory  : (level) => [
                getTagHeadingSelectors([level]),
                getClassHeadingSelectors([level]),
            ],
            configVars       : headingConfigVars,
        }),
    }),
];
