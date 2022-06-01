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
import { 
// configs:
paragraphs as pargs, } from './paragraphs.js';
//#region configs
const [leads, leadValues, cssLeadConfig] = createCssConfig(() => {
    return {
        // foregrounds:
        foreg: pargs.foreg,
        // spacings:
        marginInlineStart: pargs.marginInlineStart,
        marginInlineEnd: pargs.marginInlineEnd,
        marginBlockStart: pargs.marginBlockStart,
        marginBlockEnd: pargs.marginBlockEnd,
        // typos:
        fontSize: typos.fontSizeMd,
        fontFamily: pargs.fontFamily,
        fontWeight: typos.fontWeightLight,
        fontStyle: pargs.fontStyle,
        textDecoration: pargs.textDecoration,
        lineHeight: pargs.lineHeight,
    };
}, { prefix: 'lead' });
export { leads, leads as cssProps, leads as default, };
export { leadValues, leadValues as cssVals, };
export { cssLeadConfig, cssLeadConfig as cssConfig, };
//#endregion configs
//#region style sheets
styleSheets([
    globalScope({
        ...rule('.lead', {
            // layouts:
            display: 'block',
            // spacings:
            ...ifFirstChild({
                marginBlockStart: 0, // kill the top_margin at the first lead
            }),
            ...ifLastChild({
                marginBlockEnd: 0, // kill the bottom_margin at the last lead
            }),
            // customize:
            ...usesCssProps(leads),
        }),
    }),
]);
//#endregion style sheets
