import { 
// rules:
rule, 
// scopes:
globalScope, 
// style sheets:
styleSheets, } from '@cssfn/cssfn'; // writes css in javascript
import { createCssConfig, 
// utilities:
usesCssProps, } from '@cssfn/css-config'; // reads/writes css variables configuration
// reusable-ui:
import { 
// configs:
colors, } from '@reusable-ui/colors'; // a color management system
// internals:
import { 
// configs:
marks, } from './marks.js';
import { 
// configs:
codes, } from './codes.js';
//#region configs
const [kbds, kbdValues, cssKbdConfig] = createCssConfig(() => {
    return {
        // backgrounds:
        backg: colors.grayDark,
        // foregrounds:
        foreg: colors.white,
        // borders:
        border: marks.border,
        borderRadius: marks.borderRadius,
        // spacings:
        paddingInline: '0.4em',
        paddingBlock: '0.2em',
        // typos:
        fontSize: codes.fontSize,
        fontFamily: codes.fontFamily,
        fontWeight: codes.fontWeight,
        fontStyle: codes.fontStyle,
        textDecoration: codes.textDecoration,
        lineHeight: codes.lineHeight,
        overflowWrap: codes.overflowWrap,
    };
}, { prefix: 'kbd' });
export { kbds, kbds as cssProps, kbds as default, };
export { kbdValues, kbdValues as cssVals, };
export { cssKbdConfig, cssKbdConfig as cssConfig, };
//#endregion configs
//#region style sheets
styleSheets([
    globalScope({
        ...rule(['kbd', '.kbd'], {
            // layouts:
            display: 'inline',
            // customize:
            ...usesCssProps(kbds),
        }),
    }),
]);
//#endregion style sheets
