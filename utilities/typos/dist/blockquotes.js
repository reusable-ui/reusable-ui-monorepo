import { 
// rules:
rule, ifFirstChild, ifLastChild, 
// scopes:
globalScope, 
// style sheets:
styleSheets, } from '@cssfn/cssfn'; // writes css in javascript
import { createCssConfig, 
// utilities:
usesCssProps, } from '@cssfn/css-config'; // reads/writes css variables configuration
// internals:
import { 
// configs:
typos, } from './typos.js';
//#region configs
const [blockquotes, blockquoteValues, cssBlockquoteConfig] = createCssConfig(() => {
    return {
        // foregrounds:
        foreg: 'inherit',
        // spacings:
        marginInlineStart: '0em',
        marginInlineEnd: '0em',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        // typos:
        fontSize: typos.fontSizeMd,
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontStyle: 'inherit',
        textDecoration: 'inherit',
        lineHeight: 'inherit',
    };
}, { prefix: 'bq' });
export { blockquotes, blockquotes as cssProps, blockquotes as default, };
export { blockquoteValues, blockquoteValues as cssVals, };
export { cssBlockquoteConfig, cssBlockquoteConfig as cssConfig, };
//#endregion configs
//#region style sheets
styleSheets([
    globalScope({
        ...rule(['blockquote', '.blockquote'], {
            // layouts:
            display: 'block',
            // spacings:
            ...ifFirstChild({
                marginBlockStart: 0, // kill the top_margin at the first blockquote
            }),
            ...ifLastChild({
                marginBlockEnd: 0, // kill the bottom_margin at the last blockquote
            }),
            // customize:
            ...usesCssProps(blockquotes),
        }),
    }),
]);
//#endregion style sheets
