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
    
    
    
    // Display headings:
    getTagDisplaySelectors,
    getClassDisplaySelectors,
}                           from '../style-internal-selectors.js'
import {
    getDisplayFilter,
    
    
    
    getNonHeadingTextBlockFilter,
    getHeadingCompanionFilter,
}                           from '../style-internal-filters.js'

// Configs:
import {
    displayConfigVars,
}                           from '../configs/css-display-config.js'



// Styles:

export default [
    globalScope({
        ...headingRule({
            elementFilter    : getDisplayFilter(),
            companionFilters : getHeadingCompanionFilter(),
            spacingFilters   : getNonHeadingTextBlockFilter(),
            configVars       : displayConfigVars,
        }),
        ...headingLevelRule({
            levels           : getDefaultLevels(),
            selectorFactory  : (level) => [
                getTagDisplaySelectors([level]),
                getClassDisplaySelectors([level]),
            ],
            configVars       : displayConfigVars,
        }),
    }),
];
