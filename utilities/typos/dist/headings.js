import { 
// rules:
rule, rules, ifFirstChild, ifLastChild, ifNotLastChild, 
// combinators:
nextSiblings, 
// scopes:
globalScope, 
// style sheets:
styleSheets, } from '@cssfn/cssfn'; // writes css in javascript
import { flat, } from '@cssfn/cssfn/dist/utilities.js';
import { createCssConfig, 
// utilities:
usesCssProps, usesSuffixedProps, overwriteProps, } from '@cssfn/css-config'; // reads/writes css variables configuration
// internals:
import { 
// configs:
typos, } from './typos.js';
//#region configs
const [headings, headingValues, cssHeadingConfig] = createCssConfig(() => {
    return {
        // appearances:
        subOpacity: 0.8,
        // foregrounds:
        foreg: 'inherit',
        // spacings:
        marginInlineStart: '0em',
        marginInlineEnd: '0em',
        marginBlockStart: '0em',
        marginBlockEnd: '0.75em',
        // typos:
        fontSize: 'unset',
        fontSize1: [['calc(', 2.25, '*', typos.fontSize, ')']],
        fontSize2: [['calc(', 2.00, '*', typos.fontSize, ')']],
        fontSize3: [['calc(', 1.75, '*', typos.fontSize, ')']],
        fontSize4: [['calc(', 1.50, '*', typos.fontSize, ')']],
        fontSize5: [['calc(', 1.25, '*', typos.fontSize, ')']],
        fontSize6: [['calc(', 1.00, '*', typos.fontSize, ')']],
        fontFamily: 'inherit',
        fontWeight: 500,
        fontStyle: 'inherit',
        textDecoration: 'inherit',
        lineHeight: 1.25,
    };
}, { prefix: 'h' });
export { headings, headings as cssProps, headings as default, };
export { headingValues, headingValues as cssVals, };
export { cssHeadingConfig, cssHeadingConfig as cssConfig, };
//#endregion configs
//#region style sheets
export const usesHeadingRule = (cssProps, selector, levels = [1, 2, 3, 4, 5, 6]) => {
    const selectors = (flat(selector)
        .filter((selector) => (!!selector || (selector === '')) && (selector !== true)));
    const selectorsWithLevels = (levels
        .flatMap((level) => selectors
        .map((selector) => `${selector}${level}`)));
    return rules([
        // shared rule for h1-h6:
        rule(selectorsWithLevels, {
            // layouts:
            display: 'block',
            // spacings:
            ...ifFirstChild({
                marginBlockStart: 0, // kill the top_margin at the first heading
            }),
            ...ifLastChild({
                marginBlockEnd: 0, // kill the bottom_margin at the last heading
            }),
            ...nextSiblings(selectorsWithLevels, {
                /*
                 * treats subsequent headings as subtitles
                 * make it closer to the main heading
                 * make it further to the content
                */
                // appearances:
                opacity: cssProps.subOpacity,
                // spacings:
                // make the subtitle closer to the main heading:
                marginBlockStart: `calc(0px - ${cssProps.marginBlockEnd})`,
                ...ifNotLastChild({
                    // make subtitle further to the content:
                    marginBlockEnd: cssProps.marginBlockEnd,
                }),
            }),
            // customize:
            ...usesCssProps(cssProps),
        }),
        // individual rule for each h1-h6:
        levels
            .map((level) => rule(selectors.map((selector) => `${selector}${level}`), {
            // customize with propName{level}:
            ...overwriteProps(cssProps, usesSuffixedProps(cssProps, `${level}`)),
        })),
    ]);
};
styleSheets([
    globalScope({
        ...usesHeadingRule(headings, ['h', '.h']),
    }),
]);
//#endregion style sheets
