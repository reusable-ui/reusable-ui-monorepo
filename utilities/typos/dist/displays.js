import { 
// scopes:
globalScope, 
// style sheets:
styleSheets, } from '@cssfn/cssfn'; // writes css in javascript
import { createCssConfig, } from '@cssfn/css-config'; // reads/writes css variables configuration
// internals:
import { 
// configs:
typos, } from './typos.js';
import { 
// configs:
headings as heads, 
// styles:
usesHeadingRule, } from './headings.js';
//#region configs
const [displays, displayValues, cssDisplayConfig] = createCssConfig(() => {
    return {
        // appearances:
        subOpacity: heads.subOpacity,
        // foregrounds:
        foreg: heads.foreg,
        // spacings:
        marginInlineStart: heads.marginInlineStart,
        marginInlineEnd: heads.marginInlineEnd,
        marginBlockStart: heads.marginBlockStart,
        marginBlockEnd: heads.marginBlockEnd,
        // typos:
        fontSize: 'unset',
        fontSize1: [['calc(', 5.0, '*', typos.fontSize, ')']],
        fontSize2: [['calc(', 4.5, '*', typos.fontSize, ')']],
        fontSize3: [['calc(', 4.0, '*', typos.fontSize, ')']],
        fontSize4: [['calc(', 3.5, '*', typos.fontSize, ')']],
        fontSize5: [['calc(', 3.0, '*', typos.fontSize, ')']],
        fontSize6: [['calc(', 2.5, '*', typos.fontSize, ')']],
        fontFamily: heads.fontFamily,
        fontWeight: 300,
        fontStyle: heads.fontStyle,
        textDecoration: heads.textDecoration,
        lineHeight: heads.lineHeight,
    };
}, { prefix: 'd' });
export { displays, displays as cssProps, displays as default, };
export { displayValues, displayValues as cssVals, };
export { cssDisplayConfig, cssDisplayConfig as cssConfig, };
//#endregion configs
//#region style sheets
styleSheets([
    globalScope({
        ...usesHeadingRule(displays, ['.display-']),
    }),
]);
//#endregion style sheets
