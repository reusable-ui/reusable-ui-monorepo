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
    
    
    
    // Display headings:
    getTagDisplaySelectors,
    getClassDisplaySelectors,
}                           from '../style-selectors.js'
import {
    getDisplayFilter,
    
    
    
    getNonHeadingTextBlockFilter,
    getHeadingCompanionFilter,
}                           from '../style-filters.js'

// Settings:
import {
    displayVars,
}                           from '../configs/displays.js'



// Styles:

export default [
    globalScope({
        ...headingRule({
            elementFilter    : getDisplayFilter(),
            companionFilters : getHeadingCompanionFilter(),
            spacingFilters   : getNonHeadingTextBlockFilter(),
            elementVars      : displayVars,
        }),
        ...headingLevelRule({
            levels           : getDefaultLevels(),
            selectorFactory  : (level) => [
                getTagDisplaySelectors([level]),
                getClassDisplaySelectors([level]),
            ],
            elementVars      : displayVars,
        }),
    }),
];
